<template>
    <h1>Prueba2: {{mascota}}</h1>
    <CardMascotaCompleta :mascota="mascota"/>
</template>
<script>
import CardMascotaCompleta from '../components/CardMascotaCompleta.vue'
export default {
  name: 'InfoMascota',
  components: {
    CardMascotaCompleta
  },
  data () {
    return {
      mascota: Object,
      id: this.$route.params.id
    }
  },
  mounted () {
    console.log(this.id)
    fetch(`${process.env.VUE_APP_IP}mascota/mascota/${this.id}`, {
    })
      .then(response => response.json())
      .then(res => {
        this.mascota = res
      })
  }

}
</script>
