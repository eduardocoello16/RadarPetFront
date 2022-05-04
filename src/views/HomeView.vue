<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  mounted () {
    document.title = 'RadarPet'
    // El inicio va a redirigir a lista de mascotas de momento
    this.$router.push('/mascotas')
  }
}
</script>
