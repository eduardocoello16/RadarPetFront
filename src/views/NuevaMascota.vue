<template>
  <div class="pdsf">
    <form @submit.prevent='enviarDatos'>
      <label for="nombre"  >Nombre</label>
      <input type="text" v-model='Nombre' name="Nombre" />
      <label for="ubicacion">Ubicación</label>
      <input type="text" v-model='Ubicacion' name="ubicacion" />
      <button id="enviar">Enviar</button>
      </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      Nombre: '',
      Ubicacion: ''
    }
  },
  mounted () {
    document.title = 'Nueva Mascota'
    if (!this.$store.getters.getTokenSesion) {
      this.$router.push('/iniciarsesion')
    }
  },
  methods: {
    enviarDatos () {
      const newPost = {
        Nombre: this.Nombre,
        Ubicacion: this.Ubicacion
      }
      fetch(`${process.env.VUE_APP_IP}mascota/nueva`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          key: this.$store.getters.getTokenSesion
        },
        body: JSON.stringify(newPost)
      })
        .then(respuesta => respuesta.json())
        .then(respuesta => {
          if (respuesta) {
            this.$router.push('/mascotas')
          }
        })
    }
  }
}
</script>
