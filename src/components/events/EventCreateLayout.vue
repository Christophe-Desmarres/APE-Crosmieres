<template>
  <section class="wrapper">
    <div class="container">
      <div class="field">
        <div class="field__title">
          <img class="logo--img" src="../../assets/images/jelly-message-sent-by-character.png" alt="" />
          <h1 class="title">Ajout d'un évènement</h1>
        </div>

        <label class="field__label">Catégorie</label>
        <select id="field__select" v-model="selected">
          <option disabled value="">Choisissez la catégorie</option>
          <option value="actuality">Actualité</option>
          <option value="statement">Réunion</option>
        </select>

        <label class="field__label">Titre de la publication </label>
        <input class="field__input" type="text" placeholder="" v-model="title" />

        <label class="field__label">Description </label>
        <textarea class="textarea field__input" type="text" placeholder="" rows="3" v-model="content"></textarea>

        <label class="field__label">Date de l'évènement </label>
        <input class="field__input" type="date" placeholder="" v-model="eventDate" />

        <label class="field__label">Lieu de l'évènement </label>
        <input class="field__input" type="text" placeholder="" v-model="location" />

        <label class="field__label"> Image </label>
        <input class="field__input" type="file" accept="image/*" ref="file" @change="selectImage" />
        <p class="error" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </p>
        <p class="alert" v-if="alerts">
          {{ alerts }}
        </p>
        <button class="btn btn-success btn-sm float-right" @click="imageValidate">
          Soumettre
        </button>
      </div>

      <div v-if="previewImage">
        <div>
          <img class="preview" :src="previewImage" alt="" />
        </div>
      </div>

      <div class="image--modal__mask" v-if="showModal">
        <div class="image--modal__wrapper">
          <div class="image--modal__container">
            <p>Il n'y a pas d'image sélectionnée</p>
            <button class="confirm" @click="submitForm">Continuer</button>
            <button class="abort" @click="showModal = false">Annuler</button>
          </div>
        </div>
      </div>
    </div>
    
  </section>
</template>


<script>
import EventService from "@/services/events/EventService";

export default {
  name: "EventCreateView",
  data() {
    return {
      title: null,
      content: null,
      eventDate: null,
      location: null,
      currentImage: undefined,
      previewImage: undefined,
      imageInfos: [],
      errors: [],
      alerts: null,
      showModal: false,
      selected: null,
    };
  },

  methods: {
    imageValidate() {
      if (this.currentImage) {
        this.submitForm();
      } else {
        this.showModal = true;
      }
    },

    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
    },
    // upload and send to wordpress
    upload(postId) {
      EventService.upload(this.currentImage, this.title, postId)
        .then((images) => {
          this.imageInfos = images.data;
          // pour executer la fct createpost avec l'id du média
          EventService.addMediaToEvent(postId, this.imageInfos.id).then(
            (response) => {
              if (response.status === 200) {
                this.selected = null;
                this.title = null;
                this.content = null;
                this.eventDate = null;
                this.location = null;
                this.currentImage = undefined;
                this.previewImage = undefined;
                this.alerts = "Evénement créé";
                //redirection vers la home
                setTimeout(() => this.$router.push({ name: "home" }), 1500);
              } else {
                this.errors.push(
                  "Erreur d'enregistrement, veuillez verifier la présence de l'image dans l'événement"
                );
              }
            }
          );
        })
        .catch(() => {
          this.progress = 0;
          this.errors.push("Erreur sur le chargement de l'image !");
          this.errors.push("L'événement a été crée sans l'image");
          this.errors.push(
            "Veuillez modifier dans la page de modification d'événement svp."
          );

          this.currentImage = undefined;
        });
    },

    // to submit fields and send datas to custom post 'event'
    async submitForm() {
      this.showModal = false;
      // Reset error table
      this.errors = [];
      this.alerts = null;
      // Form Content Validation
      if (!this.selected) {
        this.errors.push("Veuillez sélectionner une catégorie svp");
      }
      if (!this.title) {
        this.errors.push("Veuillez remplir un titre svp");
      }
      if (!this.content) {
        this.errors.push("Veuillez remplir une description svp");
      }
      if (!this.eventDate) {
        this.errors.push("Veuillez remplir une date svp");
      }
      if (!this.location) {
        this.errors.push("Veuillez remplir un lieu svp");
      }
      setTimeout(() => {
        this.errors = [];
      }, 5000);
      // Send form request if no error
      if (this.errors.length === 0) {
        let params = {
          title: this.title,
          content: this.content,
          date: this.eventDate,
          lieu: this.location,
          terms: this.selected,
        };

        //custom resquest for post new event with meta
        const response = await EventService.addEvent(params);

        // //native request from wordpress for the types taxonomy
        // const updateTaxonomy = await EventService.update({
        //   id: response.data.id,
        //   types: this.selected,
        // });

        // if event create status is ok and if there was an image to uplaod
        if (response && this.currentImage) {
          // //for take the post publish
          // const majPost = await EventService.update({
          //   status: "publish",
          //   id: response.data.id,
          // });

          //response.data.id is the post id
          this.upload(response.data.id);
        } else if (response) {
          // if there was not image to upload but event was create
          this.selected = null;
          this.title = null;
          this.content = null;
          this.eventDate = null;
          this.location = null;
          this.currentImage = undefined;
          this.previewImage = undefined;
          this.alerts = "Evénement créé sans image";
          // home redirect
          setTimeout(() => this.$router.push({ name: "home" }), 1500);
        } else {
          this.errors.push(
            "Erreur d'enregistrement de l'événement ! Veuillez verifier la présence de l'événement"
          );
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
    width: 80%;
    overflow: hidden;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 1em;
    display: -ms-grid;
    display: grid;
    place-items: center;
    box-shadow: 2px 29px 72px -20px #46bfc7;

    .preview {
      width: 50%;
      border-radius: 5px;
      border: thick double gray;
      box-shadow: 0px 17px 34px -20px $blue-bg-header;
      margin-bottom: 1rem;
    }

    .field {
      padding: 1rem;
      margin: 1rem;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      width: 100%;

      .field__title {
        width: 100%;
        margin-left: auto;
        margin-right: auto;

        .logo--img {
          display: none;
        }

        .title {
          text-align: center;
          padding: 1rem;
          color: $red;
          font-size: 1.5rem;
          font-weight: bold;
          font-family: "Merienda", cursive;
          margin-top: 0.5rem;
          margin-bottom: 1rem;
          text-shadow: 0px 0px 0px #313846;
        }
      }

      .field__label {
        width: 45%;
        float: left;
        margin: 0.5rem;
      }

      select {
        border: 1px solid $blue;
      }

      .field__input,
      #field__select {
        line-height: 3;
        border: 1px solid $blue;
        border-radius: 0.5em;
        margin: 1rem 0 1rem 0;
        padding: 0.5em 0 0.5em 1.5em;
        text-align: left;
        width: 45%;
        float: right;
      }

      ::placeholder {
        color: $red;
      }

      .error {
        background-color: lightcoral;
        font-weight: bold;
        width: 80%;
        padding: 0.2rem;
        margin: 0.5rem;
        margin-left: auto;
        margin-right: auto;
        border-radius: 5px;
        color: white;
      }

      .alert {
        background-color: lightblue;
        font-weight: bold;
        width: 90%;
        padding: 0.2rem;
        margin: 0.5rem;
        margin-left: auto;
        margin-right: auto;
        border-radius: 5px;
        color: Black;
      }
    }

    button {
      display: inline-block;
      width: 50%;
      font-size: 1.2rem;
      padding: 0.5em;
      margin: 0.2rem;
      margin-left: auto;
      margin-right: auto;
      border-radius: 5px;
      border: 1px solid #ffc107;
      box-shadow: 0 5px 5px #0000001a;
      cursor: pointer;
    }

    button:hover {
      color: white;
      background-color: #ffc107;
      box-shadow: 0 2px 2px #0000001a;
    }

    .image--modal__mask {
      position: fixed;
      background-color: white;
      box-shadow: 0 0 5px #0000001a;
      border-radius: 5px;
      font-size: 1.5rem;
      padding: 1rem;
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: table;
      transition: opacity 0.3s ease;

      .image--modal__wrapper {
        display: table-cell;
        vertical-align: middle;

        .image--modal__container {
          width: 300px;
          margin: 0px auto;
          padding: 20px 30px;
          background-color: #fff;
          border-radius: 2px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
          transition: all 0.3s ease;

          .confirm {
            margin: 1rem;
            border: 3px solid $green;
          }

          .confirm:hover {
            background-color: $green;
          }

          .abort {
            border: 3px solid $red;
          }

          .abort:hover {
            background-color: $red;
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    .container {
      background-color: transparent;
      box-shadow: none;
      border-radius: none;

      .field {
        padding: 1rem;
        margin: 1rem;
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .field__title {
          .logo--img {
            display: inline;
            width: 60%;
            margin-left: auto;
            margin-right: auto;
          }
        }

        .field__label,
        .field__input,
        #field__select {
          width: 100%;
        }

      }
    }
  }
}
</style>