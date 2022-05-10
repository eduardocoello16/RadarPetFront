<template>
    <h2>Tu mascota</h2>
    <p>{{this.Nombre}}</p>
    <p>{{this.Tipo}}</p>
    <p>{{this.Raza}}</p>
    <p>{{this.Edad}}</p>
    <p>{{this.Peso}}</p>
    <p>{{this.Ubicacion}}</p>
      <img  id="foto" :src="imagen" alt="">
      <button @click="borrarMascota">Borrar</button>
      <p>{{this.status}}</p>
        <form  @submit.prevent='cambiarFotoMascota' v-if="propiedad == true" >
          <label for="Nombre">Nombre</label>
          <input type="text" v-model="Nombre" id="nombre"  placeholder="Nombre">
           <label for="tipo">Tipo</label>
          <input type="text" v-model='Tipo' name="Tipo" />
          <label for="Raza">Raza</label>
          <input type="text" v-model="Raza" id="raza" placeholder="Raza">
          <label for="Edad">Edad</label>
          <input type="number" v-model="Edad" id="edad" placeholder="Edad">
          <label for="Peso">Peso</label>
          <input type="number" v-model="Peso" id="peso" placeholder="Peso">
          <label for="Ubicacion">Ubicacion</label>
          <input type="text" v-model="Ubicacion" id="ubicacion" placeholder="Ubicacion">
    <label for="fotoMascota">Foto Mascota</label>
     <input @change="onFileMascotaSelected" type="file" id="imagenMascota" ref="fotoMascota" name="fotoMascota" />
  </form>
</template>
<style scoped>
#foto{
  width: 200px;
  height: 200px;
  cursor: pointer;
}
</style>
<script>
export default {
  name: 'CardMascota',
  props: {
    propiedad: {
      type: Boolean,
      default: false
    },
    mascota: Object
  },
  data () {
    return {
      imagen: '',
      status: '',
      Nombre: this.mascota.Nombre,
      Tipo: this.mascota.Tipo,
      Raza: this.mascota.Raza,
      Edad: this.mascota.Edad,
      Peso: this.mascota.Peso,
      Ubicacion: this.mascota.Ubicacion
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
  },
  methods: {
    onFileMascotaSelected (event) {
      this.imagen = URL.createObjectURL(event.target.files[0])
    },
    borrarMascota () {
      fetch(`${process.env.VUE_APP_IP}mascota/mascota/${this.mascota._id}`, {
        headers: {
          Key: this.$store.getters.getTokenSesion
        },
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(respuesta => {
          if (respuesta.status === 200) {
            this.status = 'Mascota borrada correctamente'
          } else {
            this.status = respuesta.msg
          }
        })
    }
  }

}
</script>
