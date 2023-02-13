<template>
  <section class="event--card">
    <div class="event--card__picture--container">
      <img class="picture" src="https://scontent-cdt1-1.xx.fbcdn.net/v/t39.30808-6/329622898_1227983374502496_5962946662491510584_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=340051&_nc_ohc=IlZxTejR5ygAX_6cQDT&tn=WdCInXKrn2q4DCyh&_nc_ht=scontent-cdt1-1.xx&oh=00_AfCB43uyhKL3JO-JewPgZFn7G47pJ9XiJO6cPvOVzAW7nQ&oe=63F0683F" />
    </div>

    <div class="event--card__date--location">Le 4 mars à partir de 19h30</div>

    <event-register-form 
    v-bind:openFormRegister="true"
    v-bind:options={participate:false,help:false,order:true} />
  </section>
</template>


<script>
import EventRegisterForm from "../../components/events/EventRegisterForm.vue";

export default {
  components: { EventRegisterForm },
  name: "EventDetailLayout",
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

  .picture {
    max-width: 70%;
    border-radius: 1rem;
    box-shadow: 0px 17px 34px -20px $blue-bg-header;
  }

  .event--card__date--location{
    padding: 1rem;
  }

}

// Media query
@media (min-width: 480px) {
  .event--card {
    width: 80%;
  }
}

@media (min-width: 768px) {
  .event--card {
    width: 70%;
  }
}

@media (min-width: 1024px) {
  .event--card {
    width: 70%;
   }
}
</style>
