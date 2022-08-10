<template>
  <HeaderLayout />
  <LegalNoticesLayout />
  <FooterLayout />
</template>

<script>
import HeaderLayout from "../../components/templates/HeaderLayout.vue";
import FooterLayout from "../../components/templates/FooterLayout.vue";
import LegalNoticesLayout from "../../components/legal-notices/LegalNoticesLayout.vue";

export default {
  name: "LegalNoticesView",
  components: {
    HeaderLayout,
    FooterLayout,
    LegalNoticesLayout,
  },
  mounted() {
    //for change title view page
    document.title = "Mentions légales";
  },
};
</script>

<style>
</style>