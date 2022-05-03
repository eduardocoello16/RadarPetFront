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
}
body{
  margin: 0;
}
</style>
<script>
import Cookies from 'js-cookie'
import NavHeadder from './components/NavHeadder.vue'
export default {
  name: 'App',
  components: {
    NavHeadder
  },
  created () {
    if (Cookies.get('token') && Cookies.get('usuario')) {
      this.$store.dispatch('getUserInfo')
    }
    if (this.$store.getters.getTokenSesion) {
      this.$store.dispatch('setAvatarImage')
    }
  }
}
</script>
