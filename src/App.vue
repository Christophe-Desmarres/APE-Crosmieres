<template>

  <router-view />

</template>

<style lang="scss">
@import "./assets/style/css/reset.css";
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,700;1,400&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  background-color: $blue-light-bg;
  color: $white;
  min-width: fit-content;

}

.overflow--hidden {
  overflow: hidden;
}
</style>

