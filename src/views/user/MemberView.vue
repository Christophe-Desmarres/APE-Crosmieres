<template>
  <HeaderLayout />
  <member-layout />
  <FooterLayout />
</template>

<script>
// @ is an alias to /src
import HeaderLayout from "@/components/templates/HeaderLayout.vue";
import FooterLayout from "@/components/templates/FooterLayout.vue";
import MemberLayout from "../../components/user/MemberLayout.vue";

export default {
  name: "MemberView",
  components: {
    HeaderLayout,
    FooterLayout,
    MemberLayout,
  },
  mounted() {
    //for change title view page
    document.title = "Membres";
  },
};
</script>

<style>
</style>