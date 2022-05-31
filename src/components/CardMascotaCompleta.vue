<template>
    <div id="cardMascota">
      <img id="foto" :src="imagen" alt="">
      <p> Nombre: {{mascota.Nombre}}</p>
      <p v-if="mascota.Raza">Raza: {{mascota.Raza}}</p>
      <p v-if="mascota.Tipo">Raza: {{mascota.Tipo}}</p>
      <p v-if="mascota.Peso">Peso: {{mascota.Peso}}</p>
      <p v-if="mascota.Edad">Edad: {{mascota.Edad}}</p>
      <p v-if="mascota.Descripcion">Descripción: {{mascota.Descripcion}}</p>
      <p v-if="mascota.Ubicacion">Ubicación: {{mascota.Ubicacion}}</p>
      <p v-if="contacto">Contacto: {{contacto}}</p>
    </div>
</template>
<style scoped>
#foto{
  width: 100%;
  height: auto;
  max-height: 500px;
  cursor: pointer;
}

#cardMascota{

    white-space: normal;
    overflow: hidden;
  margin: 10px;
  border-radius: 10px;
   background-color: var(--color__secondary);
  color: var(--color__text2);
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.219);
}

</style>
<script>
export default {
  name: 'CardMascotaCompleta',
  props: {
    mascota: Object,
    contacto: String
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
