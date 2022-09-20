<template>
  <section class="event--section">
    <h1>Liste de vos évènements</h1>
    <div class="event--section__search">
      <img class="event--img" v-bind:src="eventPicture" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <button class="search-icon"><i class="fa fa-search"></i></button>
      <input
        type="text"
        class="search--input"
        placeholder="Rechercher..."
        v-model="searchString"
      />

      <div class="button--radio__group">
        <div class="button--title"></div>
        <div class="button--radio__element">
          <input
            type="radio"
            class="button--radio"
            id="all"
            v-model="picked"
            value="all"
          />
          <label class="button--radio__title" for="all">Tout</label>
        </div>
        <div class="button--radio__element">
          <!-- value 3 = id of taxonomie statement "réunion in backoffice wp" -->
          <input
            type="radio"
            class="button--radio"
            id="statement"
            value="statement"
            v-model="picked"
          />
          <label class="button--radio__title" for="statement">Réunions</label>
        </div>
        <div class="button--radio__element">
          <!-- value 4 = id of taxonomie actuality "actualité in backoffice wp" -->
          <input
            type="radio"
            class="button--radio"
            id="actuality"
            value="actuality"
            v-model="picked"
          />
          <label class="button--radio__title" for="actuality">Actualités</label>
        </div>
      </div>
    </div>

    <EventListLayout
      v-bind:image="
        event.featured_media !== 0
          ? event._embedded['wp:featuredmedia'][0].source_url
          : defaultPicture
      "
      v-bind:id="event.id"
      v-bind:title="event.title.rendered"
      v-bind:content="event.content.rendered"
      v-bind:term="event._embedded['wp:term']"
      v-for="event in eventsNewList"
      v-bind:key="event.id"
    />
  </section>
</template>


<script>
import EventListLayout from "@/components/events/EventListLayout.vue";
import EventService from "@/services/events/EventService";
import picture from "@/assets/images/surr-holidays.png";
import defaultPicture from "@/assets/images/events/flags.jpg";

export default {
  name: "EventsListLayout",

  components: {
    EventListLayout,
  },

  async mounted() {
    //list of events from our API
    this.eventsList = await EventService.findAll();
  },

  computed: {
    eventsNewList() {
      //Return an array that contains the rows where the callback returned true
      return this.eventsList.filter((event) => {
        let eventTerm = "";
        if (event._embedded["wp:term"]) {
          eventTerm = event._embedded["wp:term"][0][0].name;
        }
        // We take the title of the current event and we check if the searched term is contained in this title.
        // If yes, return true
        // search possible in lowercase and without accent
        if (this.picked == "all") {
          if (
            event.title.rendered
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
        } else {
          if (
            event.title.rendered
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                this.searchString
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
              ) &&
            this.picked == eventTerm
          ) {
            return true;
          } else {
            return false;
          }
        }
      });
    },
  },

  data() {
    return {
      eventsList: [],
      eventPicture: picture,
      searchString: "",
      //default value for radio buttons
      picked: "all",
      defaultPicture,
    };
  },
};
</script>

<style scoped lang="scss">

.event--section {
  display: flex;
  flex-direction: column;
  align-items: center; 

  h1 {
    color: $red;
    font-size: 1.5rem;
    font-weight: bold;
    text-shadow: 0px 1px 1px $grey;
    font-family: 'Merienda', cursive;
    margin-top: 0.5rem;
  }

  .event--section__search {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search--input {
    padding: 11px;
    font-size: 15px;
    border-style: none;
    width: 25%;
    background: $white;
    border: 1px solid $blue-bg-header;
    border-radius: 0.5em;
  }

  .search-icon {
    border-style: none;
    background-color: $red;
    color: $white;
    height: 40px;
    width: 40px;
    border-radius: 25%;
    margin-right: 5px;
    margin-left: 1rem;
  }

  .event--img {
    width: 6rem;
  }

  .button--radio__group {
    width: 8rem;
    margin-left: 10%;

    .button--radio__element {
      display: block;
      margin: 10px 0;
      position: relative;

      .button--radio__title {
        padding: 5px 25px;
        width: 80%;
        display: block;
        text-align: left;
        color: $grey;
        cursor: pointer;
        position: relative;
        z-index: 2;
        border-radius: 2rem;

        overflow: hidden;

        &:before {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          content: "";
          background-color: $red;

          position: absolute;
          left: 50%;
          top: 50%;

          opacity: 0;
          z-index: -1;
        }

        &:after {
          width: 15px;
          height: 15px;
          content: "";
          border: 1.9px solid $blue;
          background-color: $white;
          background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
          background-repeat: no-repeat;
          background-position: -2px -5px;
          border-radius: 50%;
          z-index: 2;
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          transition: all 200ms ease-in;
        }
      }

      .button--radio:checked ~ label {
        color: $white;

        &:before {
          transform: translate(-50%, -50%) scale3d(56, 56, 1);
          opacity: 1;
        }

        &:after {
          background-color: $blue;
          border-color: $blue;
        }
      }

      .button--radio {
        width: 32px;
        height: 32px;
        order: 1;
        z-index: 2;
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        visibility: hidden;
      }
    }
  }
}

//<---------------------MEDIA QUERIES ------------------------>
@media (max-width: 576px) {
  .event--section {
    .search-icon {
      margin-left: inherit;
    }

    .event--img {
      display: none;
    }

    .button--radio__group {
      margin-left: 1%;
    }
  }
}
</style>



