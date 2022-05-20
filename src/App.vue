<template>
  <NavHeadder/>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;1,800&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
* {
  font-family: 'Open Sans', sans-serif;
  font-weight: 500;
}
body{
  margin: 0;
  overflow-x: hidden;
}
</style>
<script>

import NavHeadder from './components/NavHeadder.vue'
export default {
  name: 'App',
  components: {
    NavHeadder
  }
}
</script>
