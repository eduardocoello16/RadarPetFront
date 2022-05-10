<template>
<h2>Crear Mascotas</h2>
  <div class="pdsf">
    <form @submit.prevent='enviarDatos'>
      <label for="nombre"  >Nombre</label>
      <input type="text" v-model='Nombre' name="Nombre" />
      <label for="tipo">Tipo</label>
      <input type="text" v-model='Tipo' name="Tipo" />
      <label for="Raza">Raza</label>
          <input type="text" v-model="Raza" id="raza" placeholder="Raza">
          <label for="Edad">Edad</label>
          <input type="number" v-model="edad" id="edad" placeholder="Edad">
          <label for="Peso">Peso</label>
          <input type="number" v-model="peso" id="peso" placeholder="Peso">
      <label for="ubicacion">Ubicación</label>
      <input type="text" v-model='Ubicacion' name="ubicacion" />
        <img  id="imagenavatar" :src="imagen" alt="">
       <input @change="onFileSelected" type="file" id="imagenup" ref="foto" name="foto" />
      <button id="enviar">Enviar</button>
      </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      Nombre: '',
      imagen: '',
      Ubicacion: '',
      Tipo: '',
      Raza: '',
      edad: '',
      peso: ''
    }
  },
  mounted () {
    document.title = 'Nueva Mascota'
    if (!this.$store.getters.getTokenSesion) {
      this.$router.push('/iniciarsesion')
    }
  },
  methods: {
    onFileSelected (event) {
      this.imagen = URL.createObjectURL(event.target.files[0])
    },
    enviarDatos () {
      const newPost = {
        Nombre: this.Nombre,
        Ubicacion: this.Ubicacion,
        Tipo: this.Tipo,
        Raza: this.Raza,
        Edad: this.edad,
        Peso: this.peso
      }
      const formData = new FormData()
      formData.append('datos', JSON.stringify(newPost))
      formData.append('foto', this.$refs.foto.files[0])
      fetch(`${process.env.VUE_APP_IP}mascota/nueva`, {
        method: 'POST',
        headers: {
          key: this.$store.getters.getTokenSesion
        },
        body: formData
      })
        .then(respuesta => {
          if (respuesta.status === 200) {
            this.$router.push('/mascotas')
          } else {
            return respuesta.json()
          }
        })
        .then(respuesta => (console.log(respuesta)))
    }
  }
}
</script>
