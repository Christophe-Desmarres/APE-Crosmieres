<template>
  <section class="event--card">
    <div class="event--card__picture--container">
      <img class="picture" v-bind:src="picture" />
    </div>

    <h2 class="event--card__title" v-html="title"></h2>

    <div class="event--card__date--location">Le {{ date }} à {{ location }}</div>

    <img class="event--card__media--image" v-bind:src="image" />

    <div class="event--card__content" v-html="content"></div>
    <event-register-form v-if="this.term === 'actuality'" />
  </section>
</template>


<script>
import EventService from "@/services/events/EventService";
import jelly from "@/assets/images/sand-tower.png";
import defaultPicture from "@/assets/images/events/flags.jpg";
import EventRegisterForm from "./EventRegisterForm.vue";

export default {
  components: { EventRegisterForm },
  name: "EventDetailLayout",

  data() {
    return {
      picture: jelly,
      title: null,
      date: null,
      location: null,
      content: null,
      image: null,
      map: null,
      term: null,
      defaultPicture,
    };
  },

  async mounted() {
    let id = this.$route.params.id;
    if (id) {
      let arrayMeta = await EventService.getMeta(id);
      const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
      let dateISO = new Date(arrayMeta.date);
      this.date  =  dateISO.getDate() + " " + months[(dateISO.getMonth())] + " " + dateISO.getFullYear();
      this.location = arrayMeta.lieu;
      //Allow to retrieve the id dynamic parameter by using the $route object
      const response = await EventService.find(id);
      this.term = response._embedded["wp:term"][0][0].name;
      if (response.code) {
        // If error
        console.log("error");
        //this.$router.push({ name: '404' });
      } else {
        this.title = response.title.rendered;
        this.content = response.content.rendered;
        this.image = response._embedded["wp:featuredmedia"]
          ? response._embedded["wp:featuredmedia"][0].source_url
          : this.defaultPicture;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.event--card {
  width: 90%;
  margin: 1rem auto;
  height: auto;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  color: $grey;
  background-color: $white;
  box-shadow: 0px 17px 34px -20px $blue-bg-header;

  .event--card__picture--container {
    display: flex;
    justify-content: center;
    max-width: 100%;
    margin-bottom: 1rem;
    margin: auto;

    .picture {
      max-width: 70%;
      margin-top: -2rem;
    }
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
    padding-bottom: 1rem;
  }

  .event--card__date--location,
  .event--card__img,
  .event--card__content,
  .event--card__map {
    padding: 1rem;
  }

  .event--card__map {
    width: 70%;
    margin: auto;
  }

  .event--card__content {
    width: 100%;
    margin: auto;
  }

  .event--card__media--image {
    width: 100%;
    min-height: 18rem;
    background-position: center;
    background-size: cover;
    border-radius: 1rem;
    margin: 1rem auto;
  }
}

// Media query

@media (min-width: 480px) {
  .event--card {
    width: 80%;

    .event--card__picture--container {
      max-width: 70%;
    }

    h2 {
      font-size: 1.6rem;
    }
  }
}

@media (min-width: 768px) {
  .event--card {
    width: 70%;
  }

  .event--card__picture--container {
    max-width: 50%;
  }

  h2 {
    font-size: 1.6rem;
  }

  .event--card__media--image {
    width: 90%;
    min-height: 25rem;
  }

  .event--card__content {
    width: 90%;
  }

  .event--card__map {
    width: 40%;
  }
}

@media (min-width: 1024px) {
  .event--card {
    width: 70%;

    .event--card__media--image {
      width: 80%;
      min-height: 35rem;
    }

    .event--card__picture--container {
      max-width: 30%;
    }

    h2 {
      font-size: 1.8rem;
    }

    .event--card__content {
      width: 80%;
    }
  }
}
</style>
