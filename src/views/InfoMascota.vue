<template>
<h1>{{mascota.Nombre}}</h1>
<section>
    <CardMascotaCompleta  :mascota="mascota"/>
    </section>
</template>
<style scoped>
section{
  margin: 2em;
}
@media (min-width: 900px) {
  section{
    width: 50%;
  }
}
</style>
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
  created () {
    this.mascota._id = this.$route.params.id
    fetch(`${process.env.VUE_APP_IP}mascota/mascota/${this.id}`, {
    })
      .then(response => response.json())
      .then(res => {
        this.mascota = res
      })
  }

}
</script>
