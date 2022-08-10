<template>
  <HeaderLayout />
  <SalesListLayout />
  <FooterLayout />
</template>


<script>
import HeaderLayout from "@/components/templates/HeaderLayout.vue";
import SalesListLayout from "@/components/sales/SalesListLayout.vue";
import FooterLayout from "@/components/templates/FooterLayout.vue";

export default {
  name: "SalesListView",
  components: {
    HeaderLayout,
    SalesListLayout,
    FooterLayout,
  },
  mounted() {
    //for change title view page
    document.title = "Ventes";
  },
};
</script>


<style scoped lang="scss">
</style>

