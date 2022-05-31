<template>
  <h2>Perdidas</h2>
<section id="perdidas">

<div   v-for="mascota in randomPerdidas" :key= "mascota.id">
  <CardMascota  :mascota="mascota"/>
</div>
</section>
 <router-link to="/mascotas/perdidas" >
 <button>Ver todas</button>
 </router-link>
 <h2>Encontradas</h2>
  <section id="encontradas">
<div     v-for="mascota in randomEncontradas" :key= "mascota.id">
  <CardMascota :mascota="mascota"/>
</div>

</section>
 <router-link to="/mascotas/encontradas" >
 <button>Ver todas</button>
 </router-link>

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
      .then(respuesta => {
        if (respuesta.status !== 200) {
          throw new Error('Error al obtener mascotas')
        }
        return respuesta.json()
      })
      .then(res => {
        this.mascotasPerdidas = res.filter(mascota => mascota.TipoEstado === 'Perdido')
        this.mascotasEncontradas = res.filter(mascota => mascota.TipoEstado === 'Encontrado')
      })
      .then(() => {
        let cantidad
        if (screen.width > 800) {
          cantidad = 8
        } else {
          cantidad = 4
        }
        // Obtener 4 mascotas aleatorias del array de mascotas encontradas
        this.randomEncontradas = this.mascotasEncontradas.sort(() => Math.random() - 0.5).slice(0, cantidad)
        this.randomPerdidas = this.mascotasPerdidas.sort(() => Math.random() - 0.5).slice(0, cantidad)
      })
      .catch(error => {
        console.log(error)
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
