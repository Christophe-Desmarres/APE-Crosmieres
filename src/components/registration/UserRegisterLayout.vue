<template>
  <section class="wrapper">
    <div class="container">
      <div class="img__container">
        <img alt="" class="img" v-bind:src="picture" />
      </div>
      <div class="content">
        <h1 class="title">Pour participer</h1>
        <h2 class="subtitle">Inscrivez vous !</h2>

        <label class="field__label">Prénom</label>
        <input v-model="firstname" type="text" class="inputbox" placeholder="Votre prénom" name="firstname" />

        <label class="field__label">Nom</label>
        <input v-model="lastname" type="text" class="inputbox" placeholder="Votre Nom" name="lastname" />

        <label class="field__label">Votre e-mail</label>
        <input v-model="email" type="email" class="inputbox" placeholder="Votre e-mail" name="mail" />

        <label class="field__label">Votre numéro de téléphone</label>
        <input v-model="phone" type="text" class="inputbox" placeholder="Votre numéro de contact" name="phone" />

        <label class="field__label">Votre identifiant de connexion</label>
        <input v-model="username" type="text" class="inputbox" placeholder="Votre pseudo" name="username" />

        <div class="password">
          <input type="image" @click="switchVisibility" alt="" class="visibility" v-bind:src="visibility" />
          <label class="field__label">Mot de passe</label>
      </div>
        <input v-model="password" class="inputbox" :type="passwordFieldType" placeholder="Mot de passe" />
        
        <div class="password">
          <input type="image" @click="switchVisibilityConfirm" alt="" class="visibility" v-bind:src="visibilityConfirm" />
        <label class="field__label">Confirmer le mot de passe</label>
      </div>
        <input v-model="passwordconfirm" class="inputbox" :type="passwordFieldTypeConfirm" placeholder="Mot de passe" required />

        <p class="succesregistration" v-for="succesMsg in succesRegistration" v-bind:key="succesMsg">
          {{ succesMsg }}
        </p>
        <p class="push--error" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </p>

        <button v-on:click="sendForm" class="subscribe">
          Créez votre compte
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import UserRegistrationService from "@/services/registration/UserRegistrationService";
import illustrationPicture from "@/assets/images/jelly-character-got-a-new-idea.png";
import closePicture from "@/assets/images/spot-closed.png";
import openPicture from "@/assets/images/spot-open.png";

export default {
  name: "UserRegistrationLayout",

  data() {
    return {
      picture: illustrationPicture,
      visibility:closePicture,
      visibilityConfirm:closePicture,
      //Array for the push messages
      errors: [],
      succesRegistration: [],
      // Data of the form
      firstname: null,
      lastname: null,
      email: null,
      phone: null,
      username: null,
      passwordFieldType:"password",
      passwordFieldTypeConfirm:"password",
      password: null,
      passwordconfirm: null,
    };
  },

  methods: {
    switchVisibility(){
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
      this.visibility = this.visibility === closePicture ? openPicture : closePicture;
    },
    switchVisibilityConfirm(){
      this.passwordFieldTypeConfirm = this.passwordFieldTypeConfirm === "password" ? "text" : "password";
      this.visibilityConfirm = this.visibilityConfirm === closePicture ? openPicture : closePicture;
    },

    async sendForm() {
      this.errors = [];
      // Validation of the form data
      if (!this.firstname) {
        this.errors.push("Il manque votre prénom");
      }
      if (!this.lastname) {
        this.errors.push("Il manque votre nom de famille");
      }
      if (!this.email) {
        this.errors.push("Il manque votre e-mail");
      }
      if (!this.username) {
        this.errors.push("Il manque votre identifiant de connexion");
      }
      if (!this.password) {
        this.errors.push("Il manque votre mot de passe");
      } else {
        if (this.password !== this.passwordconfirm) {
          this.errors.push("Confirmer votre mot de passe !");
        }
      }
      if (this.checkPhoneNumber(this.phone) === false || this.phone == null) {
        this.errors.push("numéro de téléphone absent ou format non pris en charge !");
      }

      // Check if error array is empty and if it's ok transmission of the data
      if (this.errors.length === 0) {
        const response = await UserRegistrationService.register({
          pseudo: this.username,
          email: this.email,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          phone: this.phone,
        });
        if (response.code === 200) {
          // Reset the input in the form
          (this.username = null),
            (this.email = null),
            (this.password = null),
            (this.phone = null),
            (this.firstname = null),
            (this.lastname = null),
            (this.passwordconfirm = null);

          // Push alert registration succes
          this.succesRegistration.push("Inscription réussie");

          // redirect after showing success message
          setTimeout(() => this.$router.push({ name: "login" }), 1000);
        } else if (response.code === 406) {
          this.errors.push("Cet e-mail ou pseudo est déjà inscrit");
        } else {
          this.errors.push("Oups une erreur, veuillez recommencer");
        }
      }
    },

    checkPhoneNumber(param) {
      const regexPhoneNumber = /^((\+)33|0)[1-9](\d{2}){4}$/;

      if (param.match(regexPhoneNumber)) {
        return true;
      } else {
        return false;
      }
    },
  },
  computed: {
    checkPwd() { 
        if (this.password.length < 6) { 
          return("too_short"); 
        } else if (this.password.length > 50) { 
          return("too_long"); 
        }
        //  else if (this.password.search(/\d/) == -1) { 
        //   return("no_num"); 
        // } else if (this.password.search(/[a-zA-Z]/) == -1) { 
        //   return("no_letter"); 
        // } else if (this.password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&*()_\+]/) != -1) { 
        //   return("bad_char"); } 
          return("ok"); 
        } 
  }
};
</script>

<style scoped lang="scss">
.form {
  margin-top: 4rem;
}

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
  }

  .title {
    font-size: 1.6rem;
    font-weight: 700;
  }

  .img {
    width: 58%;
    height: auto;
    border-radius: 1em 1em 0 0;
    -o-object-fit: cover;
    object-fit: cover;
    transform: translateY(-2%);
  }
  .password{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

      .visibility{
        margin-right: 1rem;
        height: 25px;
      }
   
  }

  .img__container {
    height: 200px;
    overflow: hidden;
    margin-bottom: 1.5em;
  }

  .title {
    margin-bottom: 0.9em;
  }

  .subtitle {
    font-size: 0.9rem;
    text-transform: uppercase;
    margin-bottom: 0.5em;
    font-weight: 700;
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
    color: #fff;
    font-size: 1.3rem;
    font-weight: 700;
    background-color: #f55951;
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
