<template>
<h1>Lista Mascotas:</h1>
  <h2>Encontradas</h2>
  <section>
<div id="encontradas" v-for="mascota in mascotasEncontradas" :key= "mascota.id">
  <CardMascota :mascota="mascota"></CardMascota>
</div>
</section>
  <h2>Perdidas</h2>
<section>

<div id="perdidas" v-for="mascota in mascotasPerdidas" :key= "mascota.id">
  <CardMascota :mascota="mascota"></CardMascota>
</div>
</section>
</template>
<script>
import CardMascota from '../components/CardMascota.vue'
export default {
  name: 'MascotasView',
  components: {
    CardMascota
  },
  data () {
    return {
      mascotas: [],
      mascotasEncontradas: [],
      mascotasPerdidas: []
    }
  },
  mounted () {
    fetch(`${process.env.VUE_APP_IP}mascota/mascotas`, {
      method: 'GET',
      headers: {
        Key: this.$store.getters.getTokenSesion,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(respuesta => respuesta.json())
      .then(res => {
        this.mascotas = res
        this.mascotasPerdidas = res.filter(mascota => mascota.TipoEstado === 'Perdido')
        this.mascotasEncontradas = res.filter(mascota => mascota.TipoEstado === 'Encontrado')
      })
  }
}
</script>
<style scoped>
section{
  display: flex;
  overflow-x: auto;
  flex-wrap: wrap;
  align-items: center;
}
#encontradas{
  background-color: #c34444;
}
#perdidas{
  background-color: #2485a0;
}
</style>
