<template>
    <div id="cardMascota">
      <img id="foto" :src="imagen" alt="">
      <p> {{mascota.Nombre}}</p>
      <p v-if="mascota.Raza">Raza: {{mascota.Raza}}</p>
      <p v-if="mascota.Tipo">Raza: {{mascota.Tipo}}</p>
      <p v-if="mascota.Peso">Peso: {{mascota.Peso}}</p>
      <p v-if="mascota.Edad">Edad: {{mascota.Edad}}</p>
      <p v-if="mascota.Descripcion">Descripción: {{mascota.Descripcion}}</p>
      <p v-if="mascota.Ubicacion">Ubicación: {{mascota.Ubicacion}}</p>
      <p v-if="mascota.Telefono">Teléfono: {{mascota.Telefono}}</p>
      <p v-if="mascota.Email">E-mail: {{mascota.Email}}</p>
    </div>
</template>
<style scoped>
#foto{
  width: 100%;
  height: 320px;
  cursor: pointer;
}

#cardMascota{
  width: 400px;
    white-space: normal;
    overflow: hidden;
  margin: 10px;
  border-radius: 10px;
  display: none;
  flex-direction: column;
  align-items: center;
   background-color: var(--color__secondary);
  color: var(--color__text2);
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.219);
}
@media (min-width: 900px) {
 #cardMascota{
   display: flex;
 }
}
</style>
<script>
export default {
  name: 'CardMascotaCompleta',
  props: {
    mascota: Object,
    completa: Boolean
  },
  data () {
    return {
      imagen: ''
    }
  },
  mounted () {
    fetch(`${process.env.VUE_APP_IP}mascota/fotoMascota/${this.mascota._id}`, {
    })
      .then(response => response.blob())
      .then(res => {
        const imageObjectURL = URL.createObjectURL(res)
        this.imagen = imageObjectURL
      })
  }
}
</script>
