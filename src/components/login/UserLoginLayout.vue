<template>
  <section class="wrapper">
    <div class="container">
      <div class="img--container">
        <img alt="" class="img" v-bind:src="picture" />
      </div>
      <div v-on:keyup.enter="login" class="content">
        <h1 class="title">Connexion</h1>
        <div class="push--message">
          <p class="succesregistration" v-for="succesMsg in succesLogin" v-bind:key="succesMsg">
            {{ succesMsg }}
          </p>
          <p class="push--error" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </p>
        </div>
        <div class="field">
          <label class="field__label">Nom utilisateur</label>
          <input v-model="userName" class="inputbox" type="text" placeholder="Votre pseudo ou e-mail" />
        </div>
        <div class="field field--error">
          <label class="field__label">Mot de passe</label>
          <input v-model="password" class="inputbox" type="password" placeholder="Votre mot de passe" />
        </div>
        <button v-on:click="login" class="subscribe">Connexion</button>
      </div>
    </div>
  </section>
</template>

<script>
import illustrationPicture from "@/assets/images/jelly-character-got-a-new-idea.png";
import UserLoginService from "@/services/login/UserLoginService";

export default {
  // Nom de notre composant
  name: "UserLoginLayout",

  data() {
    return {
      //Picture for the form
      picture: illustrationPicture,
      //Information of the form
      userName: null,
      password: null,

      errors: [],
      succesLogin: [],
      meta: null,
      userId: sessionStorage.getItem("userID"),
    };
  },

  methods: {

    async login() {
      // Reset error table
      this.errors = [];
      // Form Content Validation
      if (!this.userName) {
        this.errors.push("Oups il faut ton pseudo");
      }
      if (!this.password) {
        this.errors.push("Oups il faut ton mot de passe");
      }


      // Send connection request
      if (this.errors.length === 0) {
        const response = await UserLoginService.login({
          username: this.userName,
          password: this.password,
        });

        this.$store.commit("setUserID", response.data.id);

        if (response.success === true) {
          // We store your token in session in the store
          this.$store.commit("setToken", response.data.token);
          this.$store.commit("setUsername", response.data.nicename);

          // Recovering the role after having the token with another request
          const roles = await UserLoginService.getRoles(response.data.id);
          this.$store.commit("setRole", roles.roles[0]);
          // A success message is displayed
          this.succesLogin.push("Connexion réussie");
          // redirect after showing success message
          setTimeout(() => this.$router.push({ name: "home" }), 1000);
        } else {
          this.errors.push("Mauvais nom ou mot de passe");
        }
      }
    },
  },

};
</script>

<style lang="scss" scoped>
.wrapper {
  color: $grey;
  font-family: "Muli", sans-serif;
  font-size: 1rem;
  display: -ms-grid;
  display: grid;
  place-items: center;
  border-radius: 1em;

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
    box-shadow: 0px 17px 34px -20px $blue-bg-header;

    .title {
      font-size: 1.6rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: $grey;
    }

    .img {
      width: 58%;
      height: auto;
      border-radius: 1em 1em 0 0;
      -o-object-fit: cover;
      object-fit: cover;
      transform: translateY(-2%);
    }

    .img--container {
      height: 200px;
      overflow: hidden;
      margin-bottom: 1.5em;
    }

    .title {
      margin-bottom: 0.9em;
    }

    .content {
      display: -ms-grid;
      display: grid;
      place-items: center;
      padding: 0 2em;
    }

    .inputbox {
      padding: 0.5em 0 0.5em 1.5em;
      line-height: 3;
      width: 100%;
      border: 1px solid $blue;
      border-radius: 0.5em;
      margin: 1rem 0 1rem 0;
      padding: 0;
      text-align: center;
    }

    ::placeholder {
      color: $red;
    }

    .subscribe {
      color: $white;
      font-size: 1.3rem;
      font-weight: 700;
      background-color: $red;
      padding: 0.9em 0;
      display: inline-block;
      border: none;
      border-radius: 0.5em;
      width: 100%;
      margin-bottom: 1.3em;
      cursor: pointer;
    }

    .push--error {
      color: $red;
      text-transform: uppercase;
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    .succesregistration {
      color: green;
      text-transform: uppercase;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 425px) {
    .container {
      background-color: transparent;
      box-shadow: none;
      border-radius: none;

      .img--container {
        border-radius: none;
      }
    }
  }
}
</style>