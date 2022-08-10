<template>
  <HeaderLayout />
  <SaleCreateLayout />
  <FooterLayout />
</template>


<script>
// @ is an alias to /src
import HeaderLayout from "@/components/templates/HeaderLayout.vue";
import FooterLayout from "@/components/templates/FooterLayout.vue";
import SaleCreateLayout from "../../components/sales/SaleCreateLayout.vue";

export default {
  name: "SaleCreateView",
  components: {
    HeaderLayout,
    FooterLayout,
    SaleCreateLayout,
  },

};
</script>

<style lang="scss">
</style>