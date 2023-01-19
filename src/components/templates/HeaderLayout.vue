<template>
  <div>
    <header>
      <div class="header--title">
        <router-link v-bind:to="{ name: 'root' }" class="header--title__logo">
          <img v-bind:src="logoApe" alt="logo APE">
        </router-link>
        <h1><span>A</span>ssociation des <span>P</span>arents d'<span>E</span>lèves <div class="header--town">de
            Crosmières</div>
        </h1>
        <h1 class="header--title__mobile">APE<div class="header--town">Crosmières</div>
        </h1>

        <div class="header--profil__picture">
          <router-link v-if="!this.$store.getters.getToken" v-bind:to="{ name: 'registration' }"
            class="header--nav__inscription">Inscription /
          </router-link>
          <router-link v-if="this.$store.getters.getToken" v-bind:to="{ name: 'userprofil' }"
            class="header--nav__inscription">Mon compte /
          </router-link>
          <router-link v-if="!this.$store.getters.getToken" v-bind:to="{ name: 'login' }" class="header--login">
            Connexion
          </router-link>
          <a class="header--disconnect" href="" v-if="this.$store.getters.getToken" v-on:click="disconnect">Déconnexion
          </a>
        </div>


        <div class="header--burger__container">
          <div id="menu_button">
            <input type="checkbox" id="menu_checkbox" v-on:click="showMenu" :checked="menuBurger">
            <label for="menu_checkbox" id="menu_label">
              <div id="menu_text_bar"></div>

            </label>
          </div>
        </div>


      </div>

      <nav v-bind:class="{ backoffice: backOff }">

        <div class="header--nav__home">
          <router-link v-bind:to="{ name: 'home' }" class="header--nav__home">
            Accueil
          </router-link>
        </div>
        <div class="header--nav__sale">
          <router-link v-bind:to="{ name: 'salesList' }" class="header--nav__sale">
            Ventes
          </router-link>
        </div>
        <div class="header--nav__event">
          <router-link v-bind:to="{ name: 'eventsList' }" class="header--nav__event">
            Evènements
          </router-link>
        </div>

        <div class="header--nav__presentation">
          <router-link v-bind:to="{ name: 'memberList' }" class="header--nav__presentation">
            Présentation
          </router-link>
        </div>

        <div v-if="this.$store.getters.getRole === 'administrator' || this.$store.getters.getRole === 'apemember'"
          class=" header--nav__backoffice">
          <router-link v-bind:to="{ name: 'back-office' }" class="header--nav__backoffice">Administration</router-link>
        </div>

      </nav>
    </header>

    <div class="header--burger__menu" v-if="menuBurger">
      <ul>
        <li class="header--nav__home burger--ul" @click="hiddenMenu">
          <router-link v-bind:to="{ name: 'home' }" class="header--nav__home ">
            Accueil
          </router-link>
        </li>
        <li class="header--nav__sale" @click="hiddenMenu">
          <router-link v-bind:to="{ name: 'salesList' }" class="header--nav__sale burger--ul">
            Ventes
          </router-link>
        </li>
        <li class="header--nav__event" @click="hiddenMenu">
          <router-link v-bind:to="{ name: 'eventsList' }" class="header--nav__event burger--ul">
            Evènements
          </router-link>
        </li>
        <li class="header--nav__presentation" @click="hiddenMenu">
          <router-link v-bind:to="{ name: 'memberList' }" class="header--nav__presentation burger--ul">
            Présentation
          </router-link>
        </li>

        <li class="header--nav__inscription" @click="hiddenMenu">
          <router-link v-if="!this.$store.getters.getUserID" v-bind:to="{ name: 'registration' }"
            class="header--nav__inscription burger--ul">Inscription
          </router-link>
          <router-link v-if="this.$store.getters.getUserID" v-bind:to="{ name: 'userprofil' }"
            class="header--nav__inscription burger--ul">Mon profil
          </router-link>
        </li>

        <li class="header--nav__connexion" @click="hiddenMenu">
          <router-link v-if="!this.$store.getters.getToken" v-bind:to="{ name: 'login' }"
            class="header--login burger--ul">
            Connexion
          </router-link>
          <a class="header--disconnect burger--ul" href="" v-if="this.$store.getters.getToken"
            v-on:click="disconnect">Déconnexion
          </a>
        </li>

        <li class="header--nav__backoffice" @click="hiddenMenu">
          <router-link
            v-if="this.$store.getters.getRole === 'administrator' || this.$store.getters.getRole === 'apemember'"
            v-bind:to="{ name: 'back-office' }" class="header--nav__backoffice burger--ul">Administration
          </router-link>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import profil from '@/assets/images/profil.svg'
import logoAPE from '@/assets/images/logo-tampon-APE-140.png'

export default {
  name: 'HeaderLayout',
  //IF TRUE WE ARE IN BACK OFFICE -> Hidden NAV
  props: {
    backOff: Boolean,
  },
  data() {
    return {
      profilPic: profil,
      logoApe: logoAPE,
      menuBurger: false
    }
  },

  methods: {
    hiddenMenu() {
      let body = document.querySelector("body");
      this.menuBurger = false
      body.classList.remove("overflow--hidden");
    },
    showMenu() {
      let body = document.querySelector("body");
      if (this.menuBurger == true) {
        this.menuBurger = false
        body.classList.remove("overflow--hidden");
      }
      else {
        this.menuBurger = true
        body.classList.add("overflow--hidden");
      }
    },

    disconnect() {
      // On supprime dans le store les infos liéés à l'utilisateur 
      this.$store.commit('deleteToken');
      this.$store.commit('deleteUsername');
      this.$store.commit('deleteUserID');
      this.$store.commit('deleteRole');
      // On redirige l'utilisateur
      this.$router.push({ name: 'login' });
    }
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Merienda:wght@400;700&display=swap');
@import "../../assets/animations/burgerAnim.scss";

//see method showMenu
//use for give priorioty for burger's menu (height 1000vh)
.overflow--hidden {
  overflow: hidden;
}

header {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 1%;
  font-weight: bold;

  //<--------------BANNER------------>
  .header--title {
    background-color: $blue-bg-header;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    text-shadow: 1px 1px 1px $black;

    .header--title__mobile {
      display: none;
      width: 100%;
      font-size: 2.6rem;
      color: $white;
      font-family: 'Merienda', cursive;
    }

    .header--title__logo {
      width: 20%;

      img {
        width: 100px;
      }
    }

    .header--profil__picture {

      display: flex;
      padding: 1%;
      align-items: flex-end;
      width: 20%;
      flex-wrap: wrap;
    }

    .header--profil__picture div:hover {
      color: #0087ca;
    }

    h1 {
      width: 100%;
      font-size: 2.6rem;
      color: $white;
      font-family: 'Merienda', cursive;

      span {
        color: $orange;
      }

      .header--town {
        font-size: 1.8rem;
        padding-top: 0.2rem;
      }
    }

    .header--login {
      color: $white;
    }

    .header--disconnect {
      color: $orange;
      margin-top: 0.5rem;
    }

    .header--nav__inscription {
      margin-right: 0.3rem;
      color: $white;
    }

    a {
      color: $white;
    }
  }

  //<-----------NAV----------->
  //IF PROPS backOff=true 
  .backoffice {
    display: none;
  }

  nav {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 2rem;
    margin-top: 0.5rem;
    font-weight: bold;
    align-items: center;

    .header--nav__home {
      background-color: $green;
      margin-right: 0.3rem;

      a {
        color: $white;
        display: block;
      }
    }

    .header--nav__sale {
      background-color: $orange;
      margin-right: 0.3rem;

      a {
        color: $white;
        display: block;
      }
    }

    .header--nav__event {
      background-color: $red;
      margin-right: 0.3rem;

      a {
        color: $white;
        display: block;
      }
    }

    .header--nav__presentation {
      background-color: $pink;
      margin-right: 0.3rem;

      a {
        color: $white;
        display: block;
      }
    }

    .header--nav__backoffice {
      background-color: $purple;

      a {
        color: $white;
        display: block;
      }
    }

    div {
      width: 25%;
      display: inline-block;
      position: relative;
      font-size: large;
      border-radius: 7px;
      text-shadow: 1px 1px 1px $black;
      padding: 3px;

    }

    //WE USE THE underlineAnim.scss for animate nav  
    @import "../../assets/animations/underlineAnim.scss";
  }

}

//<----------------------MENU BURGER ---------------->
.header--burger__menu {
  height: 1000vh;

  ul {
    padding-top: 2%;
    display: flex;
    flex-direction: column;
    list-style-type: none;
    color: $white;

    .header--nav__home {
      background-color: $green;
      color: $white;
    }

    .header--nav__sale {
      background-color: $orange;
      color: $white;
    }

    .header--nav__event {
      background-color: $red;
      color: $white;
    }

    .header--nav__presentation {
      background-color: $pink;
      color: $white;
    }

    .header--nav__inscription {
      background-color: $blue-dark;
      color: $white;
    }

    .header--nav__backoffice {
      background-color: $purple;
      color: $white;
    }

    .header--nav__connexion {
      background-color: $blue;

      .header--login {
        color: $white;
      }

      .header--disconnect {
        color: $white;
      }
    }

    li {
      font-size: x-large;
      height: 100%;
      padding: 6%;
      font-weight: bold;
      margin-top: 0.5rem;
      color: $white;
      border-radius: 22px;
      box-shadow: 1px 1px 1px;
    }
  }

  .burger--menu__picture {
    height: 100vh;
  }

  img {
    margin: 11%;
    height: 80px;
    width: 80px;
    border: 1px solid $black;
    border-radius: 50%;
    padding: 4%;
    box-shadow: -0.5em 0.5em $black;
  }
}


//<----------Media queries-------->

@media (max-width: 576px) {
  header {
    .header--title__mobile {
      font-size: 0.7rem;

      .header--town {
        font-size: 0.5rem;
      }
    }
  }
}

@media (max-width: 768px) {

  header {

    .header--title {
      justify-content: space-between;
      padding: 0.5rem;

      h1 {
        display: none;
      }

      .header--title__mobile {
        color: $orange;
        letter-spacing: 5px;
        display: inline;
        width: 100%;
        font-size: 2.6rem;
        font-family: 'Merienda', cursive;

        .header--town {
          color: $white;
          font-size: 1rem;
        }
      }

      .header--profil__picture {
        display: none;
      }

      .header--burger__container {
        display: unset;
        height: 100%;
        display: contents;
      }
    }

    nav {
      height: 0;

      div {
        display: none;
      }
    }

  }
}

.active {
  display: contents;
  text-shadow: 1px 1px 1px black;

  .header--profil__picture {
    width: 20px;
    height: 20px;
  }
}
</style>