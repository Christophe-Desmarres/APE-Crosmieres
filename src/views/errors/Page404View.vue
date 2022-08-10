<template>
  <headerLayout />
  <Page404Layout />
  <FooterLayout />
</template>

<script>
import HeaderLayout from "../../components/templates/HeaderLayout.vue";
import FooterLayout from "../../components/templates/FooterLayout.vue";
import Page404Layout from "../../components/errors/Page404Layout.vue";

export default {
  name: "Page404View",
  components: {
    HeaderLayout,
    FooterLayout,
    Page404Layout,
  },
  mounted() {
    //for change title view page
    document.title = "404";
  },
};
</script>

<style>
</style>