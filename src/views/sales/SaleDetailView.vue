<template>
  <HeaderLayout />
  <SaleDetailLayout />
  <FooterLayout />
</template>


<script>
// @ is an alias to /src
import HeaderLayout from "@/components/templates/HeaderLayout.vue";
import SaleDetailLayout from "@/components/sales/SaleDetailLayout.vue";
import FooterLayout from "@/components/templates/FooterLayout.vue";

export default {
  name: "SaleDetailView",
  components: {
    HeaderLayout,
    SaleDetailLayout,
    FooterLayout,
  },
  mounted() {
    //for change title view page
    document.title = "Détail vente";
  },
};
</script>


<style lang="scss">
</style>