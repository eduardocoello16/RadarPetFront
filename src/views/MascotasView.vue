<template>
<h1>Lista Mascotass:</h1>
  <h2>Perdidas</h2>
<section id="perdidas">

<div  v-for="mascota in randomPerdidas" :key= "mascota.id">
  <CardMascota  :mascota="mascota"/>
</div>
</section>
 <h2>Encontradas</h2>
  <section id="encontradas">
<div  v-for="mascota in randomEncontradas" :key= "mascota.id">
  <CardMascota :mascota="mascota"/>
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
      randomEncontradas: [],
      randomPerdidas: [],
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
      .then(() => {
        // Obtener 4 mascotas aleatorias del array de mascotas encontradas
        this.randomEncontradas = this.mascotasEncontradas.sort(() => Math.random() - 0.5).slice(0, 4)
        console.log(this.randomEncontradas)
        this.randomPerdidas = this.mascotasPerdidas.sort(() => Math.random() - 0.5).slice(0, 4)
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

</style>
