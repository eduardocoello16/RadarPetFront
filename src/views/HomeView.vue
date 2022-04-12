<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  mounted () {
    if (this.$store.getters.getNombreUsuario) {
      document.title = 'Bienvenido: ' + this.$store.getters.getNombreUsuario.email
    }
  }
}
</script>
