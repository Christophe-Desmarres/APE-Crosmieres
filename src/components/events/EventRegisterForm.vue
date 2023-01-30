<template>
  <div class="wrapper">
    <div class="container">
      <button v-if="showForm == false" @click="showForm = true">
        Je m'inscris
      </button>
      <div v-if="showForm">
        <div class="download">
          <a @click="downloadimg" class="download__link">
            Formulaire d'inscription
          </a>
          <img class="download__icon" src="../../assets/images/jelly-character-gets-a-printed-document.png" alt="" />
        </div>

        <div class="field">
          <label class="field__label"> Nom Prénom</label>
          <input type="text" v-model="name" class="field__input" placeholder="Votre nom et prénom" />

          <label class="field__label"> Email </label>
          <input type="email" v-model="email" class="field__input" placeholder="Votre adresse email" />

          <label class="field__label"> Je veux </label>
          <div class="button--radio__group">
            <div class="button--radio__element">
              <input type="checkbox" class="button--radio" v-model="participate" value="participer" id="participate" />
              <label class="button--radio__title" for="participate">Participer</label>
            </div>
            <div class="button--radio__element">
              <input type="checkbox" class="button--radio" v-model="help" value="aider" id="help" />
              <label class="button--radio__title" for="help">Aider à l'organisation</label>
            </div>
            <div class="button--radio__element">
              <input type="checkbox" class="button--radio" v-model="order" value="commander" id="order" />
              <label class="button--radio__title" for="order">Commander</label>
            </div>
          </div>

          <label v-if="help" class="field__label"> Je suis disponible </label>
          <div v-if="help" class="field__time">
            <div class="field__input--start">
              <label class="field__label--time"> à partir de </label>
              <input type="time" v-model="startTime" class="field__input--time"
                placeholder="Heure début de votre disponibilité" />
            </div>
            <div class="field__input--end">
              <label class="field__label--time"> Jusqu'à </label>
              <input type="time" v-model="endTime" class="field__input--time"
                placeholder="Heure début de votre disponibilité" />
            </div>
          </div>
          <label v-if="false" class="field__label">
            Combien voulez vous
          </label>
          <input v-if="false" type="text" v-model="nbrepas" class="field__input" placeholder="nb de repas ?" />


          <!-- implementation menu-->
          <ul v-if="order" class="responsive-table">
            <li class="table-header">
              <div class="col col-0">retrait</div>
              <div class="col col-1">nombre</div>
              <div class="col col-2">taille</div>
              <div class="col col-3">menu</div>
              <div class="col col-5" data-label="ajoute une commande">
                <img v-on:click="addOrder" v-bind:src="add" class="picture--plus" title="Ajoute une commande" />
              </div>
            </li>

            <li class="table-row" v-for="index in orderList.length" v-bind:key="index" v-bind:id="index">
              <div class="col col-0" data-label="retrait">
                <select class="table--select" v-model="orderList[index - 1].retrait">
                  <option value="surplace">Sur place</option>
                  <option value="emporter">A emporter</option>
                </select>
              </div>

              <div class="col col-1" data-label="nombre">
                <input class="table--field__input" type="number" min="0" v-model="orderList[index - 1].nombre" />
              </div>


              <div class="col col-2" data-label="taille">
                <select class="table--select" v-model="orderList[index - 1].taille">
                  <option value="Adulte">Adulte</option>
                  <option value="Enfant">Enfant</option>
                </select>
              </div>

              <div class="col col-3" data-label="menu">
                <select class="table--select" v-model="orderList[index - 1].menu">
                  <option value="Tartiflette">Tartiflette</option>
                  <option value="anglaise">assiette anglaise</option>
                </select>
              </div>


              <div class="col col-5">
                <img v-on:click="removeOrder(index - 1)" class="picture" title="Supprimer cette commande"
                  alt="suppression" v-bind:src="trash" />
              </div>
            </li>
          </ul>
          <!-- fin implementation menu-->

          <label class="field__label"> Commentaires </label>
          <textarea class="field__input" v-model="message" rows="2" placeholder="Sujet"></textarea>

          <button @click="submitForm">Je m'inscris</button>
        </div>

        <p class="alert-error" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </p>
        <p class="alert-success" v-if="alerts">
          {{ alerts }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/user/UserService";
import EventService from "@/services/events/EventService";
import trash from "@/assets/images/icons8-trash-can-100.png";
import add from "@/assets/images/crayon-1042.png";

export default {
  name: "EventRegisterForm",
  data() {
    return {
      add: add,
      trash: trash,
      name: null,
      email: null,
      message: null,
      file: null,
      errors: [],
      alerts: null,
      participate: null,
      help: null,
      order: null,
      nbrepas: null,
      orderList: [{
        retrait: '',
        nombre: 1,
        taille: '',
        menu: '',
      }],
      showForm: false,
      startTime: null,
      endTime: null,
    };
  },
  methods: {

    // to add a new order
    addOrder() {
      this.orderList.push({
        retrait: '',
        nombre: 1,
        taille: '',
        menu: '',
      });
    },

    // to remove an order
    removeOrder(index) {
      this.orderList.splice(index, 1)
    },

    // to create an order number
    createOrderNumber() {
      let date = new Date();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      let orderNumber = this.name.charAt(0).toUpperCase()+ minute + second;
      console.log(orderNumber);
      // return orderNumber;

    },

    // to submit fields and send email
    async submitForm() {
      // Reset error and alert table
      this.errors = [];
      this.alerts = null;
      let orderNum = null;

      
      // Form Content Validation
      if (!this.name) {
        this.errors.push("Veuillez remplir un nom svp");
      }
      if (!this.email) {
        this.errors.push("Veuillez remplir une adresse email svp");
      }
      if (!this.message) {
        this.message = "pas de message";
      }

      if (this.help && (this.startTime === null || this.endTime === null)) {
        this.errors.push(
          "Veuillez remplir une heure de début et une heure de fin svp"
        );
      }


      // if (this.order && isNaN(this.nbrepas)) {
      //   this.errors.push(
      //     "Veuillez remplir un nombre de menu correct (0-99)"
      //   );
      // }

      if (this.order) {
        this.orderList.forEach(order => {
          if (order.nombre === 0 || isNaN(order.nombre)) {
            this.errors.push(
              "Veuillez remplir un nombre de menu correct (0-99)"
              );
            }
            if (order.retrait === '') {
              this.errors.push(
                "Veuillez remplir un retrait correct"
                );
              }
              if (order.taille === '') {
                this.errors.push(
                  "Veuillez remplir une taille correcte"
                  );
                }
                if (order.menu === '') {
                  this.errors.push(
                    "Veuillez remplir un menu correct"
                    );
                  }
                  
                });
              }
              
              
              
              
              
              
              // Send form request if no error
              if (this.participate || this.help || this.order) {
                if (this.errors.length === 0) {
                  // create order number
                  if (this.order) {
                    orderNum = this.createOrderNumber();
                  }

                  let id = this.$route.params.id;
                  const event = await EventService.find(id);
                  if (event.code) {
            this.$router.push({ name: "404" });
          }
          let params = {
            name: this.name,
            email: this.email,
            message: this.message,
            nbrepas: this.nbrepas,
            participate: this.participate,
            help: this.help,
            order: this.order,
            startTime: this.startTime,
            endTime: this.endTime,
            eventTitle: event.title.rendered,
            orderList: this.orderList,
            orderNum: orderNum,
          };
          const response = await UserService.sendEmail(params);
          // reset field if send ok
          if (response.data.status === "success") {
            this.name = null;
            this.email = null;
            this.message = null;
            this.nbrepas = null;
            this.participate = null;
            this.help = null;
            this.order = null;
            this.startTime = null;
            this.endTime = null;
            this.alerts = response.data.message;
            setTimeout(() => {
              this.alerts = null;
              this.showForm = false;
            }, 1500);

            // home redirect
            setTimeout(() => this.$router.push({ name: "home" }), 1500);
          } else {
            this.errors.push(response.data.message);
          }
        }
      } else {
        this.errors.push("Veuillez choisir la raison de votre inscription");
      }

      // reset error after 5s
      setTimeout(() => {
        this.errors = [];
      }, 5000);
    },
  },

  computed: {


  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  color: $grey;
  font-family: "Muli", sans-serif;
  font-size: 1rem;
  border-radius: 1em;

  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 90%;
    overflow: hidden;
    background-color: $white;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 1em;
    box-shadow: 0px 17px 34px -20px $blue-bg-header;

    button {
      display: inline-block;
      width: 50%;
      font-size: 1.2rem;
      padding: 0.5em;
      margin: 1rem;
      margin-left: auto;
      margin-right: auto;
      border-radius: 5px;
      border: 1px solid #ffc107;
      box-shadow: 0 5px 5px #0000001a;
    }

    button:hover {
      color: white;
      background-color: #ffc107;
      box-shadow: 0 2px 2px #0000001a;
    }

    .title {
      font-size: 1.6rem;
      font-weight: 700;
      text-align: center;
      padding-top: 1rem;
    }

    .alert-success {
      z-index: 1;
      background: #d4edda;
      font-size: 18px;
      padding: 20px 40px;
      min-width: 420px;
      position: fixed;
      right: 0;
      bottom: 10%;
      border-left: 8px solid #3ad66e;
      border-radius: 4px;
    }

    .alert-error {
      z-index: 1;
      background: #fff3cd;
      font-size: 18px;
      padding: 20px 40px;
      min-width: 420px;
      position: fixed;
      right: 0;
      bottom: 10%;
      border-left: 8px solid #ffa502;
      border-radius: 4px;
    }

    .download {
      width: 50%;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;

      .download__link {
        color: black;
        font-weight: bold;
        margin: 1rem auto;

        b:before {
          content: ">>";
        }

        b:after {
          content: "<<";
        }
      }

      .download__icon {
        width: 15vw;
        margin: -1rem auto;
      }
    }

    max-width: 100%;

    .field {
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      width: 100%;










      .responsive-table {
        width: 80%;
        margin: 0 auto;
        font-size: 1rem;

        .table-header {
          background-color: #95a5a6;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .table-row {
          background-color: #ffffff;
          box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
        }


        .table-row:nth-child(odd) {
          background-color: rgba(255, 255, 255, 0.459);
        }

        li {
          display: flex;
          justify-content: flex-start;
          text-align: left;
          align-items: center;
          background-color: $white;
          width: 80%;
          margin: 0.2rem auto;
          border-radius: 1rem;
          box-shadow: 0px 17px 34px -20px $blue-bg-header;
          padding: 0.3rem;



          .col {

            text-align: center;

            .table--select {
              border: 1px solid $blue-light-bg;
              border-radius: 0.5em;
              margin: 0.5rem auto;
              padding: 0.2rem;
              text-align: left;
              box-shadow: 0 2px 2px #0000001a;
            }

            .table--field__input {
              border: 1px solid $blue-light-bg;
              border-radius: 0.5em;
              margin: 0.5rem auto;
              padding: 0.2rem;
              text-align: left;
              box-shadow: 0 2px 2px #0000001a;
              width: 3rem;
            }
          }

          .col-0 {
            margin-left: 0.2rem;
            flex-basis: 20%;
          }

          .col-1 {
            margin-left: 0.2rem;
            flex-basis: 20%;
          }

          .col-2 {
            margin-left: 0.2rem;
            flex-basis: 20%;
          }

          .col-3 {
            margin-left: 0.2rem;
            flex-basis: 20%;
          }

          // .col-4 {
          //   margin-left: 0.2rem;
          //   flex-basis: 20%;
          // }

          .col-5 {
            flex-basis: 20%;
            margin: 0.1rem auto;
          }


          .picture {
            height: 3rem;
            cursor: pointer;
          }

          .picture--plus {
            height: 2rem;
            vertical-align: middle;
            cursor: pointer;
          }

          .picture:hover {
            filter: brightness(1.1);
            transform: scale(1.2);
          }

        }
      }


      .title {
        font-size: 1.6rem;
        font-weight: 700;
        text-align: center;
        padding: 1rem;
        margin-bottom: 1rem;
      }

      .field__label--time,
      .field__label {
        width: 60%;
        text-align: left;
        margin: 0.5rem auto;
        font-weight: bold;
      }

      .field__time,
      .field__input--time,
      .field__input {
        line-height: 3;
        border: 1px solid $blue-light-bg;
        border-radius: 0.5em;
        margin: 0.5rem auto;
        padding: 0.2rem 1rem;
        text-align: left;
        width: 60%;
        float: right;
        box-shadow: 0 2px 2px #0000001a;
      }

      .field__time {
        display: flex;
        justify-content: space-around;
      }

      .field__input--end,
      .field__input--start {
        display: flex;
        flex-direction: column;
        width: 50%;
      }

      .field__label--time {
        width: 100%;
        text-align: center;
      }

      .field__input--time {
        width: 65%;
      }

      ::placeholder {
        color: $red;
      }

      button {
        display: inline-block;
        width: 50%;
        font-size: 1.2rem;
        padding: 0.5em;
        margin: 1rem;
        margin-left: auto;
        margin-right: auto;
        border-radius: 5px;
        border: 1px solid #ffc107;
        box-shadow: 0 5px 5px #0000001a;
      }

      button:hover {
        color: white;
        background-color: #ffc107;
        box-shadow: 0 2px 2px #0000001a;
      }
    }

    .button--radio__group {
      margin-left: auto;
      margin-right: auto;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-content: flex-start;
      border: 1px solid $blue-light-bg;
      border-radius: 0.5em;
      margin: 0.5rem auto;
      padding: 0.2rem 1rem;
      text-align: left;
      width: 60%;
      float: right;
      box-shadow: 0 2px 2px #0000001a;

      .button--title {
        width: 60%;
        text-align: left;
        margin: 0.5rem auto;
        font-weight: bold;
      }

      .button--radio__element {
        display: inline-block;
        width: 80%;
        margin: auto;

        .button--radio__title {
          padding: 0.5rem 1rem;
          width: 100%;
          display: block;
          text-align: left;
          color: $grey;
          cursor: pointer;
          position: relative;
          z-index: 2;
          border-radius: 2rem;

          overflow: hidden;

          &:before {
            width: 15px;
            height: 15px;
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

        .button--radio:checked~label {
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

  @media screen and (max-width: 1040px) {

    .responsive-table {
      width: 100%;

      .table-header {
        margin: 0 auto;
        width: 90%;


        .col-0,
        .col-1,
        .col-2,
        .col-3,
        .col-4 {
          display: none;
        }

        .col-5 {
          .picture--plus {
            margin: auto;
          }
        }
      }


      .table-row {
        margin: 0 auto;
        width: 90%;

      }

      li {
        display: block;
        flex-direction: column;
      }

      .col {
        flex-basis: 100%;
        width: 100%;
      }

      .col {
        display: flex;
        padding: 5px 0;
        align-items: center;

        &:before {
          color: #6c7a89;
          padding-right: 10px;
          content: attr(data-label);
          flex-basis: 25%;

          text-align: end;
        }
      }


      .picture {
        width: auto;
        margin: auto 0;
      }
    }

  }

  @media screen and (max-width: 750px) {
    .container {
      background-color: transparent;
      box-shadow: none;
      border-radius: none;

      .download {
        width: 70%;
        flex-direction: column-reverse;

        .download__icon {
          width: 55vw;
        }
      }

      .field {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: baseline;
        width: 100%;

        .field__label {
          width: 80%;
          float: right;
          font-size: 1.2rem;
        }

        .button--radio__group,
        .field__input {
          line-height: 3;
          border: 1px solid $blue-light-bg;
          border-radius: 0.5em;
          margin: 0.5rem auto;
          padding: 0.2rem 1rem;
          text-align: left;
          width: 80%;
          float: right;
        }

        .button--radio__group {
          background-color: white;

          .button--title {
            width: 60%;
            text-align: left;
            margin: 0.5rem auto;
            padding: 0.1rem auto;
            font-weight: bold;
          }
        }
      }
    }


  }

}
</style>