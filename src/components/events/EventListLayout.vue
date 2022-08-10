<template>
  <div class="event--card">
    <router-link v-if="backOffice == false" v-bind:to="{ name: 'event', params: { id: id } }">

      <div class="event--card__media--image" v-bind:style="'background-image:url(' + image + ')'"></div>
      <h2 class="event--card__title">
        <div v-html="title"></div>
      </h2>
      <div class="event--card__content">
        <div v-html="content"></div>
      </div>
      <div v-if="term[0][0]" class="event--card__term">
        <div>
          {{ term[0][0].name == "actuality" ? "Actualité" : "Réunion" }}
        </div>
      </div>
    </router-link>

    <!-- VERSION BACK-OFFICE -->
    <div v-if="backOffice == true">
      <div class="event--card__media--image" v-bind:style="'background-image:url(' + image + ')'">
        <div class="event--backoffice__img">
          <img v-on:click="
            opacity = 1;
          zindex = 20;
          selectEvent = id;
          " v-bind:src="trashPic" v-if="backOffice == true" />
          <router-link class="event--card__editPic" v-if="backOffice == true"
            v-bind:to="{ name: 'eventUpdate', params: { id: id } }">
            <img v-bind:src="editPic" />
          </router-link>
        </div>
      </div>
      <h2 class="event--card__title">
        <div v-html="title"></div>
      </h2>
      <div class="event--card__content">
        <div v-html="content"></div>
      </div>

      <PopUpLayout v-bind:id="id" v-bind:opacity="this.opacity" v-bind:zindex="this.zindex" v-on:yes="del"
        v-on:no="(this.opacity = 0), (this.zindex = -20)" />
    </div>
  </div>
</template>

<script>
import EventService from "@/services/events/EventService";
import PopUpLayout from "../back-office/PopUpLayout.vue";
import trash from "@/assets/images/icons8-trash-can-100.png";
import edit from "@/assets/images/icons8-edit-100.png";

export default {
  name: "EventListLayout",
  emits: ["reloadEvent"],
  props: {
    image: String,
    title: String,
    content: String,
    id: Number,
    backOffice: Boolean,
    term: Object,
  },
  data() {
    return {
      trashPic: trash,
      editPic: edit,
      zindex: -20,
      opacity: 0,
      selectEvent: null,
    };
  },
  methods: {
    async del() {
      this.opacity = 0;
      this.zindex = -20;
      await EventService.delete({
        id: this.selectEvent,
      });

      this.$emit("reloadEvent");
    },
  },
  components: { PopUpLayout },
};
</script>

<style scoped lang="scss">
.event--card {
  position: relative;
  border: 1px solid $white;
  border-radius: 2rem 2rem;
  background-color: $white;
  margin: 1%;
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  box-sizing: border-box;
  padding-bottom: 1rem;
  width: 65%;

  .event--card__title {
    color: $grey;
    font-weight: bold;
    padding-right: 2rem;
    padding-left: 2rem;
    font-size: 1.2rem;
    padding-top: 1rem;
    text-align: center;
  }

  .event--card__media--image {
    min-height: 30vh;
    background-position: center;
    background-size: cover;
    border-radius: 2rem 2rem 0 0;

    .event--backoffice__img {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      align-content: center;
      cursor: pointer;

      img,
      a {
        height: 4rem;

        cursor: pointer;
      }

      img:hover {
        filter: brightness(1.1);
        transform: scale(1.2);
      }
    }
  }

  .event--card__content {
    color: $grey;
    margin: 1rem 3rem 1rem 3rem;
    text-align: left;
  }

  .event--card__term {
    display: inline-block;
    color: $grey;
    font-size: 0.8rem;
    font-weight: bold;
    border: 1px solid $blue;
    background-color: rgba(255, 255, 255, 0.747);
    padding: 0.5rem;
    margin-right: 1rem;
    border-radius: 5px;
    position: absolute;
    top: 1rem;
    right: 0.7rem;
  }
}

//<---------------------MEDIA QUERIES ------------------------>
@media (max-width: 425px) {
  .event--card {
    width: 90%;
  }
}
</style>