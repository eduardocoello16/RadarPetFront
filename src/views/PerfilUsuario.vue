<template>
<h2>Bienvenido {{user.nombre}}</h2>
<p>Tu mail es {{user.email}}</p>

<div v-for="mascota in mascotas" :key= "mascota.id">
  <CardMascota :mascota="mascota"></CardMascota>

</div>
</template>

<script>
import CardMascota from '../components/CardMascota.vue'
export default {
  name: 'PerfilUsuario',
  components: {
    CardMascota
  },
  data () {
    return {
      user: '',
      mascotas: ''
    }
  },
  mounted () {
    fetch(`${process.env.VUE_APP_IP}usuario/getUsuario`, {
      method: 'GET',
      headers: {
        Key: this.$store.getters.getTokenSesion,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(respuesta => respuesta.json())
      .then(res => {
        this.user = res
      })
    fetch(`${process.env.VUE_APP_IP}mascota/getFromUser`, {
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
