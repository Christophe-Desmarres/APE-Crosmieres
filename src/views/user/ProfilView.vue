<template>
  <HeaderLayout />
  <main>
    <ProfilLayout />
  </main>
  <FooterLayout />
</template>

<script>
// @ is an alias to /src
import HeaderLayout from "@/components/templates/HeaderLayout.vue";
import FooterLayout from "@/components/templates/FooterLayout.vue";
import ProfilLayout from "@/components/user/ProfilLayout.vue";

export default {
  name: "ProfilView",
  components: {
    HeaderLayout,
    FooterLayout,
    ProfilLayout,
  },
    mounted() {
    //for change title view page
    document.title = "Mon profil";
  },
};
</script>

<style scoped lang="scss">
main {
  height: 100%;
  display: flex;
  list-style-type: none;
  justify-content: space-around;
}
</style>