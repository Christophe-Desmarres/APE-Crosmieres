<template>
  <section class="back-office--container__all">
    <section class="back-office--container__nav">
      <h1 class="back-office--container__title">
        Espace Administration de <span>{{ userName }}</span>
      </h1>
      <!-- //MENU NAV -->
      <div class="back-office--menu__nav">
        <div class="home" v-on:click="showMenu">
          <router-link v-bind:to="{ name: 'home' }" class="header--nav__home">
            Accueil
          </router-link>
        </div>
        <div class="listUser" v-on:click="showMenu">Liste des utilisateurs</div>
        <div class="updateEvent" v-on:click="showMenu">
          Modifier un évènement
        </div>
        <div class="createEvent" v-on:click="showMenu">Créer un évènement</div>
        <div class="updateSale" v-on:click="showMenu">Modifier une vente</div>
        <div class="createSale" v-on:click="showMenu">Créer une vente</div>
      </div>

      <div v-if="this.menu == 3" class="back-office--components">
        <h1 class="back-office--components__title--event">
          Modifier un évènement
        </h1>
        <EventListLayout
          v-on:reloadEvent="reload"
          v-bind:backOffice="this.backOffice"
          v-bind:image="
            event.featured_media !== 0
              ? event._embedded['wp:featuredmedia'][0].source_url
              : defaultPictureEvent
          "
          v-bind:id="event.id"
          v-bind:title="event.title.rendered"
          v-bind:content="event.content.rendered"
          v-for="event in eventsList"
          v-bind:key="event.id"
        />
      </div>

      <div v-if="this.menu == 1" class="back-office--components">
        <h1 class="back-office--components__title--sale">Modifier une vente</h1>
        <SaleListLayout
          v-on:reloadSal="reload"
          v-bind:backOffice="this.backOffice"
          v-bind:image="
            sale.featured_media !== 0
              ? sale._embedded['wp:featuredmedia'][0].source_url
              : defaultPictureSale
          "
          v-bind:id="sale.id"
          v-bind:title="sale.title.rendered"
          v-bind:content="sale.content.rendered"
          v-for="sale in salesList"
          v-bind:key="sale.id"
        />
      </div>

      <SaleCreateLayout v-if="this.menu == 2" class="back-office--components" />
      <EventCreateLayout
        v-if="this.menu == 4"
        class="back-office--components"
      />

      <UsersListLayout v-if="this.menu == 5" class="back-office--components" />

      <img
        v-if="menu == null"
        class="picture"
        alt="bonhomme costaud"
        v-bind:src="picture"
      />
    </section>
  </section>
</template>

<script>
//LAYOUT
import EventCreateLayout from "../events/EventCreateLayout.vue";
import SaleCreateLayout from "../sales/SaleCreateLayout.vue";
import EventListLayout from "../events/EventListLayout.vue";
import SaleListLayout from "../sales/SaleListLayout.vue";
import UsersListLayout from "../user/UsersListLayout.vue";
//SERVICES
import EventService from "@/services/events/EventService";
import SaleService from "@/services/sales/SaleService";
//PICTURE
import jelly from "@/assets/images/jelly-security-guard-wearing-sunglasses.png";
import defaultPictureSale from "@/assets/images/sales/colorful.jpg";
import defaultPictureEvent from "@/assets/images/events/flags.jpg";

export default {
  name: "BackOfficeLayout",
  data() {
    return {
      userName: sessionStorage.getItem("username"),
      menu: null,
      eventsList: null,
      salesList: null,
      backOffice: true,
      picture: jelly,
      defaultPictureSale,
      defaultPictureEvent,
    };
  },
  methods: {
    showMenu(e) {
      if (e.currentTarget.classList == "updateSale") {
        if (this.menu != 1) {
          this.menu = 1;
        } else {
          this.menu = null;
        }
      }
      if (e.currentTarget.classList == "createSale") {
        if (this.menu != 2) {
          this.menu = 2;
        } else {
          this.menu = null;
        }
      }
      if (e.currentTarget.classList == "updateEvent") {
        if (this.menu != 3) {
          this.menu = 3;
        } else {
          this.menu = null;
        }
      }
      if (e.currentTarget.classList == "createEvent") {
        if (this.menu != 4) {
          this.menu = 4;
        } else {
          this.menu = null;
        }
      }
      if (e.currentTarget.classList == "listUser") {
        if (this.menu != 5) {
          this.menu = 5;
        } else {
          this.menu = null;
        }
      }
    },
    async reload() {
      this.eventsList = await EventService.findAll();
      this.salesList = await SaleService.findAll();
    },
  },
  components: {
    EventCreateLayout,
    SaleCreateLayout,
    EventListLayout,
    SaleListLayout,
    UsersListLayout,
  },
  async mounted() {
    this.eventsList = await EventService.findAll();
    this.salesList = await SaleService.findAll();
  },
};
</script>

<style lang="scss" scoped>
.back-office--container__all {
  width: 100%;

  .back-office--container__nav {
    width: 94%;
    display: flex;
    flex-direction: column;
    padding: 2%;
    align-items: center;
    padding: 0% 3% 0% 3%;

    .back-office--components {
      display: flex;
      justify-content: center;
      margin: auto;
      align-items: center;
      margin-top: 2rem;
      flex-direction: column;
      margin-bottom: 1rem;
      width: 97%;

      .back-office--components__title--sale {
        color: $orange;
        font-size: 1.5rem;
        font-weight: bold;
        font-family: "Merienda", cursive;
        margin-top: 0.5rem;
        text-shadow: 0px 0px 0px $grey;
      }

      .back-office--components__title--event {
        color: $red;
        font-size: 1.5rem;
        font-weight: bold;
        font-family: "Merienda", cursive;
        margin-top: 0.5rem;
        text-shadow: 0px 0px 0px $grey;
      }

      .event--card {
        min-width: 44vh;

        .event--card__media--image {
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
    }

    .back-office--container__title {
      color: $purple;
      font-size: 1.5rem;
      font-weight: bold;
      font-family: "Merienda", cursive;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
      text-shadow: 0px 0px 0px $grey;

      span {
        text-transform: uppercase;
      }
    }

    .back-office--menu__nav {
      width: 100%;
      display: flex;
      justify-content: center;
      font-weight: bold;

      a {
        display: block;
      }

      div:hover {
        filter: contrast(1.5);
      }

      div {
        width: 22%;
        padding: 0.5rem;
        text-shadow: 1px 1px 1px $black;
        border-radius: 10px;
        cursor: pointer;
        margin-right: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .home {
        background-color: $purple;
        color: $white;

        a {
          display: block;
          color: $white;
        }
      }

      .updateEvent {
        background-color: $red;
        color: $white;
      }

      .createEvent {
        background-color: $red;
        color: $white;
      }

      .updateSale {
        background-color: $orange;
        color: $white;
      }

      .createSale {
        background-color: $orange;
        color: $white;
        margin-right: 0;
      }

      .listUser {
        background-color: $purple;
        color: $white;
      }
    }
  }

  .picture {
    margin: 5rem auto;
    width: 25rem;
    max-width: 50%;
    height: auto;
  }
}

//<---------------------MEDIA QUERIES ------------------------>
@media (max-width: 555px) {
  .back-office--container__all {
    .back-office--container__nav {
      .back-office--menu__nav {
        flex-wrap: wrap;

        div {
          margin: 1%;
          width: 26%;
          height: 37px;
        }
        .createEvent {
          order: 1;
        }
        .createSale {
          order: 1;
        }
        .home {
          order: -1;
        }
        .listUser {
          order: 1;
        }
        .updateEvent {
          order: -1;
        }
        .updateSale {
          order: -1;
        }
      }

      .back-office--components {
        width: 100%;
        .event--card {
          width: 95%;
        }

        .sale--card {
          width: 95%;
        }
      }
    }
  }

  .picture {
    width: 100%;
  }
}
</style>