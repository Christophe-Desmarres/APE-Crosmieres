<template>
  <section>
    <h1>Liste des utilisateurs</h1>

    <div class="user--section__search">
      <img class="sale--card__img" />
      <!-- Load icon library from font awesome -->
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <button class="search-icon"><i class="fa fa-search"></i></button>
      <input
        type="text"
        v-bind:placeholder="
          this.$store.getters.getRole === 'administrator'
            ? 'Rechercher par nom, prénom ou rôle'
            : 'Rechercher par nom, prénom'
        "
        v-model="searchString"
      />
    </div>

    <div
      class="container"
      v-if="
        this.$store.getters.getRole === 'administrator' ||
        this.$store.getters.getRole === 'apemember'
      "
    >
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-1">Nom</div>
          <div
            class="col col-2"
            v-if="this.$store.getters.getRole === 'administrator'"
          >
            Rôle
          </div>
          <div class="col col-3">Téléphone</div>
          <div class="col col-4">Email</div>
          <div
            class="col col-5"
            v-if="this.$store.getters.getRole === 'administrator'"
          ></div>
        </li>

        <li class="table-row" v-for="user in usersNewList" v-bind:key="user.id">
          <div
            class="col col-1"
            data-label="Nom"
            v-if="this.$store.getters.getRole === 'administrator'"
          >
            {{ user.first_name }} {{ user.last_name }}
          </div>
          <div
            class="col col-1"
            data-label="Nom"
            v-if="this.$store.getters.getRole === 'apemember'"
          >
            {{ user.display_name }}
          </div>
          <div
            class="col col-2"
            data-label="Rôle"
            v-if="this.$store.getters.getRole === 'administrator'"
          >
            <p class="role" v-if="user.roles[0] === 'administrator'">
              Administrateur
            </p>
            <p class="role" v-if="user.roles[0] === 'apeuser'">
              Utilisateur APE
            </p>
            <p class="role" v-if="user.roles[0] === 'apemember'">Membre APE</p>
          </div>
          <div class="col col-3" data-label="Téléphone">{{ user.phone }}</div>
          <div
            class="col col-4"
            data-label="Email"
            v-if="this.$store.getters.getRole === 'administrator'"
          >
            {{ user.email }}
          </div>
          <div
            class="col col-4"
            data-label="Email"
            v-if="this.$store.getters.getRole === 'apemember'"
          >
            {{ user.user_email }}
          </div>
          <!-- Only the admin can modify the users list -->
          <div v-if="this.$store.getters.getRole === 'apemember'"></div>
          <div v-if="this.$store.getters.getRole === 'administrator'">
            <!-- Calls the chooseARole methods et make appears the selected form -->
            <img
              v-on:click="chooseARole(user)"
              v-bind:src="edit"
              class="picture col-5"
              title="Modifier le rôle de ce compte"
            />

            <!-- Calls a popup to confirm the user's delete -->
            <img
              v-on:click="deleteUserConfirm(user)"
              class="picture col-5"
              title="Supprimer ce compte"
              alt="trash"
              v-bind:src="trash"
            />
          </div>
        </li>
      </ul>
    </div>

    <!-- The selected form appears on the click of the button by the chooseARole method -->
    <div class="select" v-if="showSelected">
      <div class="select--wrapper">
        <div class="select--container">
          <label for="role-select"
            >Le rôle de {{ userToChange.username }} est
            <span class="role" v-if="userToChange.roles[0] === 'administrator'"
              >Administrateur</span
            >
            <span class="role" v-if="userToChange.roles[0] === 'apeuser'"
              >Utilisateur APE</span
            >
            <span class="role" v-if="userToChange.roles[0] === 'apemember'"
              >Membre APE</span
            >.
            <p>Voulez vous le modifier ?</p></label
          >
          <select name="role" id="role-select" v-model="selectedRole">
            <option value="apeuser">Utilisateur APE</option>
            <option value="apemember">Membre APE</option>
            <option value="administrator">Administrateur</option>
          </select>
          <div>
            <input
              class="selectButton selectButtonConfirm"
              type="submit"
              v-on:click="updateRole()"
              value="Modifier le rôle"
            />
            <input
              class="selectButton selectButtonAbort"
              type="submit"
              v-on:click="showSelected = false"
              value="Annuler"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="select" v-if="showDeleted">
      <div class="select--wrapper">
        <div class="select--container">
          <label for="role-select"
            >Etes vous sûr de vouloir supprimer le compte de
            {{ userToDelete.username }} ?</label
          >
          <input
            class="selectButton selectButtonConfirm"
            v-on:click="deleteById(userToDelete)"
            value="Supprimer le compte"
          />
          <input
            class="selectButton selectButtonAbort"
            v-on:click="showDeleted = false"
            value="Annuler"
          />
        </div>
      </div>
    </div>

    <!-- display a succes message if the role is correctly modified -->

    <p
      class="successUpdate"
      v-for="succesMsg in succesUpdate"
      v-bind:key="succesMsg"
    >
      {{ succesMsg }}
    </p>
  </section>
</template>

<script>
import UserLoginService from "@/services/login/UserLoginService";
import UserService from "@/services/user/UserService";
import trash from "@/assets/images/icons8-trash-can-100.png";
import edit from "@/assets/images/icons8-edit-100.png";

export default {
  name: "UsersListLayout",

  data() {
    return {
      users: [],
      usersMember: [],
      trash: trash,
      edit: edit,
      selectedRole: null,
      errors: [],
      succesUpdate: [],
      showSelected: false,
      showDeleted: false,
      userToChange: null,
      userToDelete: null,
      selectUserId: null,
      searchString: "",
    };
  },
  async mounted() {
    if (this.$store.getters.getRole === "administrator") {
      // Contain the users list returns by the API
      this.users = await UserLoginService.findAll();
      // to add the phone meta, we browse all users
      this.users.forEach(async (user) => {
        let phone = "";
        // for current user, we retrieve the meta data
        let arrayMeta = await UserLoginService.getMeta(user.id);
        for (let index = 0; index < arrayMeta.length; index++) {
          const metaElmt = arrayMeta[index];
          // when the meta key match with this meta desired
          // we put value in variable 'phone' in this case
          if (metaElmt.meta_key == "phone") {
            phone = metaElmt.meta_value;
          }
        }
        // we add meta key and meta value to the current user object for use later
        user["phone"] = phone;
      });
    }

    if (this.$store.getters.getRole === "apemember") {
      // Contain the users list returns by the API
      this.users = await UserLoginService.findAllForMember();
      this.users.forEach(async (user) => {
        let phone = "";
        // for current user, we retrieve the meta data
        let arrayMeta = await UserLoginService.getMeta(user.id);
        for (let index = 0; index < arrayMeta.length; index++) {
          const metaElmt = arrayMeta[index];
          // when the meta key match with this meta desired
          // we put value in variable 'phone' in this case
          if (metaElmt.meta_key == "phone") {
            phone = metaElmt.meta_value;
          }
        }
        // we add meta key and meta value to the current user object for use later
        user["phone"] = phone;
      });
    }
  },

  methods: {
    deleteUserConfirm(user) {
      this.showDeleted = true;
      this.userToDelete = user;
    },

    async deleteById(user) {
      const response = await UserService.deleteById(user.id);
      if (response) {
        this.succesUpdate.push(
          "Le compte de " + response.previous.name + " a bien été supprimé"
        );
        setTimeout(() => {
          this.succesUpdate = [];
        }, 5000);
      } else {
        this.errors.push("Le compte n'a pas été supprimé");
        setTimeout(() => {
          this.errors = [];
        }, 5000);
      }
      this.users = await UserLoginService.findAll();
      this.userToDelete = null;
      this.showDeleted = false;
    },

    chooseARole(user) {
      this.showSelected = true;
      this.userToChange = user;
    },

    async updateRole() {
      // If the connected person is the administrator
      if (this.$store.getters.getRole === "administrator") {
        const response = await UserService.update(this.userToChange.id, {
          roles: [this.selectedRole],
        });
        if (response.id) {
          this.users = await UserLoginService.findAll();
          this.succesUpdate.push(
            "Le rôle de " + response.name + " a bien été modifié"
          );
          setTimeout(() => {
            this.succesUpdate = [];
          }, 5000);
        } else {
          this.errors.push("Le rôle n'a pas été modifié");
          setTimeout(() => {
            this.errors = [];
          }, 5000);
        }
      }
      this.userToChange = null;
      this.showSelected = false;
    },

    async getMeta(id) {
      //retrieve logged in user meta data
      let arrayMeta = await UserLoginService.getMeta(id);
      for (let index = 0; index < arrayMeta.length; index++) {
        const metaElmt = arrayMeta[index];
        //For take meta_key enter key in the exemple its "phone"
        if (metaElmt.meta_key == "phone") {
          return metaElmt.meta_value;
        } else {
          return "";
        }
      }
    },
  },

  computed: {
    // Method to find a user by firstname, lastname or role
    usersNewList() {
      //Return an array that contains the rows where the callback returned true

      return this.users.filter((user) => {
        // We take the name of the current user and we check if the searched term is contained in this name.
        // If yes, return true
        if (this.$store.getters.getRole === "administrator") {
          if (
            user.last_name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                this.searchString
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
              ) ||
            user.first_name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                this.searchString
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
              ) ||
            user.roles[0]
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                this.searchString
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
              )
          ) {
            return true;
          } else {
            return false;
          }
        } else if (this.$store.getters.getRole === "apemember") {
          // We take the name of the current user and we check if the searched term is contained in this name.
          // If yes, return true
          if (
            user.display_name
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                this.searchString
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
              )
          ) {
            return true;
          } else {
            return false;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  color: $grey;
  margin-bottom: 2rem;
  position: relative;

  h1 {
    color: $purple;
    font-size: 1.5rem;
    font-weight: bold;
    font-family: "Merienda", cursive;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    text-shadow: 0px 0px 0px $grey;
  }

  // CSS for the search box
  .user--section__search {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }

  input {
    padding: 11px;
    font-size: 15px;
    border-style: none;
    width: 50%;
    background: $white;
    border: 1px solid $blue-bg-header;
    border-radius: 0.5em;
  }

  .search-icon {
    border-style: none;
    background-color: $orange;
    color: $white;
    height: 40px;
    width: 40px;
    border-radius: 25%;
    margin-right: 5px;
    margin-left: 2rem;
  }
  .container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 10px;
    padding-right: 10px;

    .responsive-table {
      li {
        display: flex;
        justify-content: flex-start;
        text-align: left;
        align-items: center;
        margin-bottom: 25px;
        background-color: $white;
        height: auto;
        margin: 0.2rem auto;
        border-radius: 1rem;
        box-shadow: 0px 17px 34px -20px $blue-bg-header;
        padding: 1rem;
      }
      .table-header {
        background-color: #95a5a6;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .table-row {
        background-color: #ffffff;
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
      }
      .col-1 {
        flex-basis: 20%;
      }
      .col-2 {
        flex-basis: 20%;
      }
      .col-3 {
        flex-basis: 20%;
      }
      .col-4 {
        flex-basis: 20%;
      }
      .col-5 {
        flex-basis: maw-content;
      }
      .picture {
        width: 50%;
        cursor: pointer;
      }

      .picture:hover {
        filter: brightness(1.1);
        transform: scale(1.2);
      }

      @media all and (max-width: 767px) {
        .table-header {
          display: none;
        }
        .table-row {
        }
        li {
          display: block;
        }
        .col {
          flex-basis: 100%;
        }
        .col {
          display: flex;
          padding: 10px 0;
          &:before {
            color: #6c7a89;
            padding-right: 10px;
            content: attr(data-label);
            flex-basis: 50%;
            text-align: right;
          }
        }
        .picture {
          width: auto;
          margin: auto 0;
        }
      }
    }
  }

  // Select popup
  .select {
    position: fixed;
    font-size: 1.5rem;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;

    .select--wrapper {
      display: table-cell;
      vertical-align: middle;

      .select--container {
        display: flex;
        flex-direction: column;
        width: 18rem;
        margin: auto;
        padding: 20px 30px;
        background-color: $white;
        border-radius: 1rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;

        .selectButton {
          display: inline-block;
          width: 80%;
          font-size: 1.2rem;
          padding: 0.5em;
          margin: 0.5rem auto;
          text-align: center;
          border-radius: 5px;
          box-shadow: 0 5px 5px $black;
          cursor: pointer;
        }

        .selectButtonConfirm {
          color: $green;
          background-color: $white;
          border: 1px solid $green;
        }

        .selectButtonAbort {
          color: $red;
          background-color: $white;
          border: 1px solid $red;
        }

        .selectButtonConfirm:hover {
          color: $white;
          background-color: $green;
          border: 1px solid $white;
        }

        .selectButtonAbort:hover {
          color: $white;
          background-color: $red;
          border: 1px solid $white;
        }

        #role-select {
          width: 50%;
          height: 1.5rem;
          margin: 0.5rem auto;
        }
      }
    }
  }

  .successUpdate {
    z-index: 1;
    background: $blue-bg-header;
    font-size: 1.1rem;
    padding: 1rem 1rem;
    width: 18rem;
    margin: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    border-left: 8px solid $green;
    border-radius: 4px;
    transform: translateX(-50%);
  }

  @media (min-width: 768px) {
    input {
      width: 40%;
    }

    li {
      .picture {
        height: 4rem;
        cursor: pointer;
      }
    }
  }
}
@media (max-width: 600px) {
  .userlist--ul__container {
    width: 100%;
  }
}
</style>