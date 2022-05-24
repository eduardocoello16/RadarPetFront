<template>
  <h2>Perdidas</h2>
<section id="perdidas">
<div   v-for="mascota in mascotasPerdidas" :key= "mascota.id">
  <CardMascota  :mascota="mascota"/>
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
        this.mascotasPerdidas = res.filter(mascota => mascota.TipoEstado === 'Perdido')
      })
  }
}
</script>
<style scoped>

section{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 2em;
}

@media (min-width: 900px) {
  section{
 justify-content: space-around;
}

}
</style>
