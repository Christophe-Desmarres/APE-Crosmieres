<template>
  <div
    class="back-office--container__popUp"
    :style="'opacity: ' + this.opacity + ';z-index:' + this.zindex"
  >
    <section class="back-office--popUp">
      <div><img v-bind:src="wait" alt="" /></div>
      <div class="back-office--popUp__title">
        Supprimer definitivement cet élement ?
      </div>
      <div class="back-office--popUp__response">
        <div class="back-office--popUp__yes">
          <img v-bind:src="yes" v-on:click="hiddenPopUp" name="yes" alt="" />
        </div>
        <div class="back-office--popUp__no">
          <img v-bind:src="no" v-on:click="hiddenPopUp" name="no" alt="" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
//IMAGES
import yes from "../../assets/images/popUpYes.png";
import no from "../../assets/images/popUpNo.png";
import wait from "../../assets/images/popUpWait.png";
export default {
  name: "PopUpLayout",
  emits: ["yes", "no"],
  props: {
    opacity: Number,
    zindex: Number,
    id: Number,
  },
  data() {
    return {
      yes: yes,
      no: no,
      wait: wait,
    };
  },
  methods: {
    showpopup(e) {
      console.log(e);
    },
    hiddenPopUp(e) {
      if (e.currentTarget.name == "yes") {
        this.$emit("yes", this.id);
      }
      if (e.currentTarget.name == "no") {
        this.$emit("no");
      }
    },
    mounted() {
      let popUpContainer = document.querySelector(
        ".back-office--container__popUp"
      );
      console.log(popUpContainer);
    },
  },
};
</script>

<style lang="scss">
.back-office--container__all {
  width: 100%;
  //POP UP
  .back-office--container__popUp {
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 10%);
    position: fixed;
    top: 0;
    left: 0;
    transition: all 1s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    .back-office--popUp {
      background-color: $blue-bg-header;
      width: 30vh;
      margin: auto;
      height: 11vh;
      box-shadow: 0px 0px 12px 4px white;
      border-radius: 10px;
      display: flex;
      align-items: center;
      text-shadow: 1px 1px 1px black;
      .back-office--popUp__title {
        width: 60%;
        height: 100%;
        display: flex;
        align-items: center;
      }
      .back-office--popUp__response {
        height: 100%;
        width: 30%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        img {
          width: 50px;
          cursor: pointer;
        }
        img:hover {
          filter: brightness(1.3);
        }
        div {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
