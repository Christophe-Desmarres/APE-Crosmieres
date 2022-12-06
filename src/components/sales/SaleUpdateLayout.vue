<template>
  <section class="wrapper">
    <div class="container">
      <div class="field">
        <div class="field__title">
          <img
            class="logo--img"
            src="../../assets/images/jelly-message-sent-by-character.png"
            alt=""
          />
          <button class="btn--return" v-on:click="rtn()">Retour</button>
          <h1 class="title">Modifier la vente</h1> 
        </div>

        <label class="field__label">Titre de la vente </label>
        <input
          class="field__input"
          type="text"
          placeholder=""
          v-model="title"
        />

        <label class="field__label">Description </label>
        <textarea
          class="textarea field__input"
          type="text"
          placeholder=""
          rows="3"
          v-model="content"
        ></textarea>

        <label class="field__label">Date de la vente </label>
        <input
          class="field__input"
          type="text"
          placeholder=""
          v-model="saleDate"
        />

        <label class="field__label">Lien du site marchand </label>
        <input class="field__input" type="text" placeholder="" v-model="link" />

        <label class="field__label"> Image </label>
        <input
          class="field__input"
          type="file"
          accept="image/*"
          ref="file"
          @change="selectImage"
        />
        <p class="error" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </p>
        <p class="alert" v-if="alerts">
          {{ alerts }}
        </p>
        <button class="btn btn-success btn-sm float-right" @click="updateSale">
          Soumettre
        </button>
      </div>

      <div v-if="currentImage" class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="{ width: progress + '%' }"
        >
          {{ progress }}%
        </div>
      </div>

      <div v-if="previewImage">
        <div>
          <img class="preview" :src="previewImage" alt="" />
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import SaleService from "@/services/sales/SaleService";
export default {
  name: "SaleCreateView",
  data() {
    return {
      title: null,
      content: null,
      saleDate: null,
      link: null,
      currentImage: undefined,
      previewImage: undefined,
      progress: 0,
      imageInfos: [],
      errors: [],
      alerts: null,
      id: null,
      thumbnail_id:null,
    };
  },
  methods: {
    rtn() {
        window.history.back();
    },
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.progress = 0;
    },
    // upload and send to wordpress
    upload(postId) {
      this.progress = 0;

      SaleService.upload(this.currentImage, this.title, postId, (sale) => {
        this.progress = Math.round((100 * sale.loaded) / sale.total);
      })
        .then(() => {
          return SaleService.getFiles();
        })
        .then((images) => {
          this.imageInfos = images.data;
          // pour executer la fct createpost avec l'id du média
          SaleService.addMediaToSale(postId, this.imageInfos[0].id).then(
            (response) => {
              if (response.status === 200) {
                this.title = null;
                this.content = null;
                this.saleDate = null;
                this.currentImage = undefined;
                this.previewImage = undefined;
                this.progress = 0;
                this.alerts = "Vente modifiée";
                //redirection vers la home
                setTimeout(() => this.$router.push({ name: "sale", params: {id: this.id} }), 1500);
              } else {
                this.errors.push(
                  "Erreur d'enregistrement, veuillez vérifier la présence de l'image dans la vente"
                );
              }
            }
          );
        })
        .catch((err) => {
          this.progress = 0;
          this.errors.push("Erreur sur le chargement de l'image !");
          this.errors.push("La vente a été créée sans l'image");
          this.errors.push(
            "Veuillez modifier dans la page de modification des ventes svp."
          );
          console.log(err);
          this.currentImage = undefined;
        });
    },
    async updateSale(){
        let params = {
          title: this.title,
          content: this.content,
          date: this.saleDate,
          lien: this.link,
          id: this.id
        };
        const response = await SaleService.updateCustom(params);
        if(this.currentImage!=undefined&&this.previewImage!=undefined){
         this.upload(this.id);   
        }
        else if (response!=undefined){
            setTimeout(() => this.$router.push({ name: "sale", params: {id: this.id} }), 1500);
        }
        
    }
  },
  async mounted() {
    this.id = this.$route.params.id;
    const selectSale=await SaleService.find(this.id);
    const selectSaleMeta=await SaleService.findMeta(this.id);
    this.thumbnail_id=selectSale.featured_media
    this.title=selectSale.title.rendered
    this.content=selectSaleMeta.content
    this.saleDate=selectSaleMeta.date
    this.link=selectSaleMeta.lien
    this.thumbnail_id=selectSaleMeta._thumbnail_id

    SaleService.getFiles().then((response) => {
      this.imageInfos = response.data;
    });
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
    background-color: $white;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 1em;
    display: -ms-grid;
    display: grid;
    place-items: center;
    box-shadow: 0px 17px 34px -20px $blue-bg-header;
    

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
        .btn--return{
            width: 12%;
            position: absolute;
            left: 9%;
            min-width: 8vh;
        }
        .logo--img {
          display: none;
        }
        .title {
          font-size: 1.6rem;
          font-weight: 700;
          text-align: center;
          padding: 1rem;
          margin-bottom: 1rem;
        }
      }
      .field__label {
        width: 45%;
        float: left;
        margin: 0.5rem;
      }
      .field__input {
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
        color: $white;
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
        color: $black;
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
      border: 1px solid $yellow;
      box-shadow: 0 5px 5px #0000001a;
    }

    button:hover {
      color: $white;
      background-color: $yellow;
      box-shadow: 0 2px 2px #0000001a;
    }
  }

//<---------------------MEDIA QUERIES ------------------------>
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
        .field__label {
          width: 100%;
        }
        .field__input {
          width: 100%;
        }
      }
    }
  }
}
</style>