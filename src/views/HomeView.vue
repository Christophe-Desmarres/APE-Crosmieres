<template>
  <HeaderLayout />
  <main class="home--container">
    <SalesHomeSliders />
    <EventsHomeLayout />
    <SalesHomeLayout />
  </main>
  <FooterLayout />
</template>

<script>
// @ is an alias to /src
import HeaderLayout from "@/components/templates/HeaderLayout.vue";
import EventsHomeLayout from "@/components/events/EventsHomeLayout.vue";
import SalesHomeLayout from "@/components/sales/SalesHomeLayout.vue";
import FooterLayout from "@/components/templates/FooterLayout.vue";
import SalesHomeSliders from "@/components/sales/SalesHomeSliders.vue";

export default {
  name: "HomeView",

  data() {
    return {};
  },

  components: {
    HeaderLayout,
    EventsHomeLayout,
    SalesHomeLayout,
    FooterLayout,
    SalesHomeSliders,
  },
  mounted() {
    //for change title view page
    document.title = "Accueil";
  },
};
</script>


<style scoped lang="scss">
.home--container {
  height: 100%;
  display: flex;
  list-style-type: none;
  justify-content: space-between;
}

//<----------Media queries-------->

@media (max-width: 425px) {
  .home--container {
    flex-direction: column;
    position: relative;
    z-index: 3;
    overflow: hidden;
  }
}
</style>

