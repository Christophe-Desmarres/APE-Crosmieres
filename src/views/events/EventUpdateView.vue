<template>
  <HeaderLayout v-bind:backOff="this.backOff" />
  <main>
    <EventUpdateLayout />
  </main>
  <FooterLayout />
</template>

<script>
// @ is an alias to /src
import HeaderLayout from "@/components/templates/HeaderLayout.vue";
import FooterLayout from "@/components/templates/FooterLayout.vue";
import EventUpdateLayout from "@/components/events/EventUpdateLayout.vue";

export default {
  name: "EventUpdateView",
  data() {
    return {
      backOff: true,
    };
  },
  components: {
    HeaderLayout,
    FooterLayout,
    EventUpdateLayout,
  },

};
</script>

<style scoped lang="scss">
main {
  height: 100%;
  display: flex;
  list-style-type: none;
  justify-content: space-between;
}
</style>

