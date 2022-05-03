<template>
<p>Lista Mascotas:</p>
<div v-for="mascota in mascotas" :key= "mascota.id">
  <CardMascota :mascota="mascota"></CardMascota>

</div>

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
      mascotas: ''
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
        console.log(res)
      })
  }
}
</script>
