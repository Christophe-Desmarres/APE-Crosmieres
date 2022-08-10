<template>

  <HeaderLayout v-bind:backOff="this.backOff" />
  <main>
    <SaleUpdateLayout />
  </main>
  <FooterLayout />

</template>

<script>
// @ is an alias to /src
import HeaderLayout from '@/components/templates/HeaderLayout.vue'
import FooterLayout from '@/components/templates/FooterLayout.vue'
import SaleUpdateLayout from '@/components/sales/SaleUpdateLayout.vue'


export default {
  name: 'SaleUpdateView',
  data(){
    return{
      backOff: true,
    }
  },
  components: {
    HeaderLayout,
    FooterLayout,
    SaleUpdateLayout
}
}
</script>

<style scoped lang="scss">

main {
    height: 100%;
    display: flex;
    list-style-type: none;
    justify-content: space-between;
}
</style>

