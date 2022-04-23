<template>
<p>Tus mascotas:</p>
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
  }
}
</script>
