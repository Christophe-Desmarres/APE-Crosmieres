<template>
  <HeaderLayout />
  <EventsListLayout />
  <FooterLayout />
</template>


<script>
import HeaderLayout from "@/components/templates/HeaderLayout.vue";
import EventsListLayout from "@/components/events/EventsListLayout.vue";
import FooterLayout from "@/components/templates/FooterLayout.vue";

export default {
  name: "EventsListView",
  components: {
    HeaderLayout,
    EventsListLayout,
    FooterLayout,
  },
  mounted() {
    //for change title view page
    document.title = "Evénements";
  },
};
</script>


<style>
</style>

