<template>
  <HeaderLayout />
  <EventCreateLayout />
  <FooterLayout />
</template>

<script>
// @ is an alias to /src
import HeaderLayout from "@/components/templates/HeaderLayout.vue";
import FooterLayout from "@/components/templates/FooterLayout.vue";
import EventCreateLayout from "@/components/events/EventCreateLayout.vue";

export default {
  name: "EventCreateView",
  components: {
    HeaderLayout,
    FooterLayout,
    EventCreateLayout,
  },
};
</script>


<style lang="scss">
</style>