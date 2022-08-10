<template>
  <section class="wrapper">
    <h1 class="wrapper--title">Vos informations</h1>
    <div class="container">
      <div class="card">
        <div class="avatar">
          <img src="@/assets/images/icons8-profile-60.png" alt="avatar de l'utilisateur" />
        </div>
        <hr />
        <div class="stats">
          <h2>{{ user.first_name }} {{ user.last_name }}</h2>
          <div>
            <p>{{ user.first_name }}</p>
            <p>{{ user.last_name }}</p>
            <p>{{ user.email }}</p>
            <p>{{ phone }}</p>
          </div>
          <hr />
          <h2>Mes enfants</h2>
          <div>
            <p v-for="child in childs" v-bind:key="child.id">
              {{
                  child.child_firstname +
                  " " +
                  child.child_lastname +
                  " / " +
                  child.child_class
              }}
            </p>
          </div>
          <hr />
        </div>
      </div>

      <div class="button--link">
        <p class="push--error" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </p>

        <a v-on:click="showChildRegistrationLayout" class="addChild">Ajouter mes enfants</a>
        <ChildRegistrationLayout @reloadChilds="reloadChilds" class="ChildRegistrationLayout--display active" />

        <a v-on:click="showUserUpdateInformationLayout" class="update">Mise à jour de vos données</a>
        <div class="UserUpdateInformationLayout--display active">
          <div class="user--update">
            <label class="field__label">Prénom</label>
            <input v-model="user.first_name" type="text" class="inputbox" placeholder="Votre prénom" name="firstname" />

            <label class="field__label">Nom</label>
            <input v-model="user.last_name" type="text" class="inputbox" placeholder="Votre nom" name="lastname" />

            <label class="field__label">E-mail</label>
            <input v-model="user.email" type="email" class="inputbox" placeholder="Votre e-mail" name="mail" />

            <label class="field__label">Numéro de téléphone</label>
            <input v-model="phone" type="text" class="inputbox" placeholder="Votre numéro de contact" name="phone" />

            <p class="succesUpdate" v-for="succesMsg in succesUpdate" v-bind:key="succesMsg">
              {{ succesMsg }}
            </p>

            <a v-on:click="updateUser" class="updateConfirm">Enregistrer vos modifications</a>
          </div>
        </div>
        <a v-on:click="deleteConfirm" class="deleteUser">Supprimer votre compte ?</a>
        <div class="deleteConfirm display--none">
          <a class="deleteConfirm--return" v-on:click="hiddenDeleteConfirm">Conserver son compte ?</a>
          <a class="deleteConfirm--button" v-on:click="removeUser">Confirmer la suppression ? </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ChildRegistrationLayout from "@/components/registration/ChildRegistrationLayout.vue";
import UserLoginService from "@/services/login/UserLoginService";
import UserService from "@/services/user/UserService";
import ChildRegistrationService from "@/services/registration/ChildRegistrationService";

export default {
  name: "UserProfil",
  emits: ["reloadChilds"],
  components: {
    ChildRegistrationLayout,
  },

  data() {
    return {
      user: [],
      errors: [],
      succesUpdate: [],
      childs: [],
      phone: null,
    };
  },

  async mounted() {
    // The user ID for the axios request
    let user_ID = this.$store.getters.getUserID;
    if (user_ID) {
      //retrieve logged-in user data information
      this.user = await UserLoginService.find(user_ID);
      //retrieve logged-in user child
      this.childs = await ChildRegistrationService.findChild(user_ID);
      //retrieve logged in user meta data
      let arrayMeta = await UserLoginService.getMeta(user_ID);
      for (let index = 0; index < arrayMeta.length; index++) {
        const metaElmt = arrayMeta[index];
        //For take meta_key enter key in the exemple its "phone"
        if (metaElmt.meta_key == "phone") {
          return (this.phone = metaElmt.meta_value);
        }
      }
    }
  },

  methods: {
    //When user click on button add children display the component
    showChildRegistrationLayout() {
      let ChildRegistrationLayout = document.querySelector(
        ".ChildRegistrationLayout--display"
      );
      ChildRegistrationLayout.classList.toggle("active");
    },

    //When user click on button add form for modification information
    showUserUpdateInformationLayout() {
      let UserUpdateInformationLayout = document.querySelector(
        ".UserUpdateInformationLayout--display"
      );
      UserUpdateInformationLayout.classList.toggle("active");
    },

    deleteConfirm() {
      let deleteUser = document.querySelector(".deleteUser");
      deleteUser.classList.toggle("active")
      let deleteConfirm = document.querySelector(".deleteConfirm");
      deleteConfirm.classList.toggle("display--none");
    },

    hiddenDeleteConfirm() {
      let hiddenDeleteConfirm = document.querySelector(".deleteConfirm");
      hiddenDeleteConfirm.classList.add("display--none");
      let deleteUser = document.querySelector(".deleteUser");
      deleteUser.classList.toggle("active")
    },

    //Delete ours personnal account
    async removeUser() {
      if (this.$store.getters.getUserID) {
        const response = await UserService.delete();

        if (response.remove_user) {
          this.$store.commit("deleteToken");
          this.$store.commit("deleteUsername");
          this.$store.commit("deleteUserID");
          this.$store.commit("deleteRole");
          this.succesUpdate.push("L'utilisateur " + response.name);
          setTimeout(() => {
            this.$router.push({ name: "home" });
          }, 3000);
        } else {
          this.errors.push("Echec suppression");
        }
      }
    },

    // Update ours personnal account
    async updateUser() {
      if (this.checkPhoneNumber(this.phone) === false) {
        this.errors.push("Format numéro de téléphone non pris en charge !");
        setTimeout(() => {
          this.errors = [];
        }, 1000);
      }

      if (this.$store.getters.getUserID) {
        //update the user information
        const response = await UserService.update(
          this.$store.getters.getUserID,
          {
            email: this.user.email,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
          }
        );
        //update the meta data user phone
        const newphone = await UserService.updatePhone(this.$store.getters.getUserID, {
          phone: this.phone,
        })

        if (newphone === true || response.id) {
          this.succesUpdate.push("Mise à jour réussie");
          setTimeout(() => {
            this.succesUpdate = [];
          }, 10000);

        }
      } else {
        this.errors.push("Echec de la mise à jour, veuillez recommencer");
      }
    },

    //When the components Child registration is execute reload the childs array
    async reloadChilds() {
      this.childs = await ChildRegistrationService.findChild(
        this.$store.getters.getUserID
      );
    },

    checkPhoneNumber(param) {
      const regexPhoneNumber = /^((\+)33|0)[1-9](\d{2}){4}$/;
      if (param.match(regexPhoneNumber)) {
        return true;
      } else {
        return false;
      }
    }
  },
};
</script>

 <style scoped lang="scss">
 .wrapper {
   color: $grey;
   font-family: "Muli", sans-serif;
   font-size: 1rem;
   place-items: center;
   border-radius: 1em;
   width: 55vh;
 
   .wrapper--title {
     color: $blue-dark;
     font-size: 1.5rem;
     font-weight: bold;
     text-shadow: 0px 0px 0px $grey;
     font-family: 'Merienda', cursive;
     margin-top: 0.5rem;
     margin-bottom: 1rem;
   }
 
   .container {
     max-width: 400px;
     overflow: hidden;
     padding: 0;
     background-color: $white;
     margin-top: 1rem;
     margin-bottom: 1rem;
     border-radius: 1em;
     display: -ms-grid;
     display: grid;
     place-items: center;
     justify-content: center;
     box-shadow: 0px 17px 34px -20px $blue-bg-header;
 
     h2 {
       font-size: 1.5rem;
       margin: 1rem;
       text-align: center;
     }
 
     a {
       padding: 1rem;
       color: $grey;
       font-size: 1em;
       margin: 0.5rem;
       width: 90%;
       text-align: center;
       text-decoration: none;
       font-weight: 600;
       letter-spacing: 1px;
     }
   }
 
   p {
     margin: 0 0 10px;
     font-size: 1rem;
     letter-spacing: 1px;
     opacity: 0.8;
   }
 
   .button--link {
     display: flex;
     flex-direction: column;
     align-items: center;
     padding-bottom: 2rem;
 
     .addChild {
       border: 1px solid $green;
       background-color: $green;
       border-radius: 10px;
       cursor: pointer;
     }
 
     .update {
       border: 1px solid $orange;
       background-color: $orange;
       border-radius: 10px;
       cursor: pointer;
     }
 
     .deleteUser {
       border: 1px solid $red;
       background-color: $red;
       color: $white;
       border-radius: 10px;
       opacity: 0.5;
       cursor: pointer;
     }
 
     .deleteUser:hover {
       opacity: 1;
       color: $white;
     }
 
     .deleteConfirm {
       display: flex;
       justify-content: center;
       flex-direction: column;
       align-items: center;
     }
 
     .deleteConfirm--button {
       border: 1px solid red;
       background-color: red;
       border-radius: 10px;
       cursor: pointer;
       color: aliceblue
     }
 
     .deleteConfirm--return {
       border: 1px solid rgb(20, 153, 20);
       background-color: rgb(20, 153, 20);
       color: $white;
       border-radius: 10px;
       cursor: pointer;
     }
 
     .display--none {
       display: none;
     }
 
     .updateConfirm {
       color: $white;
       font-size: 1.3rem;
       font-weight: 700;
       background-color: $green;
       display: inline-block;
       border: none;
       border-radius: 10px;
       width: 60%;
       padding: 0.5rem;
       margin: 1rem;
       cursor: pointer;
     }
 
     .succesUpdate {
       color: $green;
       text-transform: uppercase;
       font-size: 1rem;
       margin-bottom: 1rem;
     }
 
     .push--error {
       color: $red;
       text-transform: uppercase;
       font-size: 1rem;
       margin-bottom: 1rem;
     }
   }
 
   .inputbox {
     padding: 0.5em 0 0.5em 1.5em;
     font-size: 1rem;
     line-height: 3;
     width: 80%;
     border: 1px solid $blue;
     border-radius: 0.5em;
     margin: 0 0 1rem 0;
     padding: 0;
     text-align: center;
   }
 }
 
 .active {
   display: none;
 }
 
 .user--update {
   display: flex;
   flex-direction: column;
   align-items: center;
 }
 
 //<---------------------MEDIA QUERIES ------------------------>
 @media (max-width: 576px) {
   .wrapper {
     .button--link {
       width: 80%;
     }
   }
 }
 
 @media (max-width: 800px) {
   .wrapper {
     width: 44vh;
 
     .button--link .deleteUser {
       opacity: 1;
     }
   }
 }
 </style>
