<template>
    <div id="cardMascota">
      <img :style="{ caducada: isCaducada }" id="foto" :src="imagen" alt="">
      <p> {{mascota.Nombre}}</p>
      <p v-if="completa && mascota.Raza">Raza: {{mascota.Raza}}</p>
      <p v-if="completa && mascota.Tipo">Raza: {{mascota.Tipo}}</p>
      <p v-if="completa && mascota.Peso">Peso: {{mascota.Peso}}</p>
      <p v-if="completa && mascota.Edad">Edad: {{mascota.Edad}}</p>
      <p v-if="completa && mascota.Descripcion">Descripción: {{mascota.Descripcion}}</p>
      <p v-if="completa && mascota.Ubicacion">Ubicación: {{mascota.Ubicacion}}</p>
      <p v-if="completa && mascota.Tipocontacto">Contacto: {{mascota.Tipocontacto}}</p>
      <p v-if="completa && mascota.Telefono">Teléfono: {{mascota.Telefono}}</p>
      <p v-if="completa && mascota.Email">E-mail: {{mascota.Email}}</p>
    </div>
</template>
<style scoped>

#foto{
  width: 100%;
  height: 320px;
  cursor: pointer;
}

#cardMascota{
  width: 100%;
    white-space: normal;
    overflow: hidden;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.219);
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
