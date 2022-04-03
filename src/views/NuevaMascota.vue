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
  methods: {
    enviarDatos () {
      const newPost = {
        Nombre: this.Nombre,
        Ubicacion: this.Ubicacion
      }
      fetch('http://192.168.1.35:4000/mascota/nueva', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      })
        .then(respuesta => respuesta.json())
        .then(respuesta => console.log(respuesta))
    }
  }
}
</script>
