<template>
  <HeaderLayout />
  <UserRegisterLayout />
  <FooterLayout />
</template>

<script>
// @ is an alias to /src
import HeaderLayout from "@/components/templates/HeaderLayout.vue";
import FooterLayout from "@/components/templates/FooterLayout.vue";
import UserRegisterLayout from "@/components/registration/UserRegisterLayout.vue";

export default {
  name: "UserRegisterView",
  components: {
    HeaderLayout,
    FooterLayout,
    UserRegisterLayout,
  },
  mounted() {
    //for change title view page
    document.title = "Inscription";
  },
};
</script>

<style lang="scss">
</style>