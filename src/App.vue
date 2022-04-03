<template>
  <NavHeadder/>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0;
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
