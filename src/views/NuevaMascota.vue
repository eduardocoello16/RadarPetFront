<template>
<h2>Crear Mascotas</h2>
<div v-if="!tipoestado">
<button @click="tipoestado = 'Encontrado'">Encontrado</button>
<button @click="tipoestado = 'Perdido'">Perdido</button>
</div>

  <div v-if="tipoestado" class="contenedorForm">
    <form @submit.prevent='enviarDatos'>
      <label for="nombre"  >Nombre</label>
      <input type="text" v-model='Nombre' name="Nombre" />
      <label for="tipo">Tipo</label>
      <select name="tipo" id="tipo"  v-model='Tipo' >
        <option value="Perro">Perro</option>
        <option value="Gato">Gato</option>
      </select>
      <label for="Raza">Raza</label>
          <input type="text" v-model="Raza" id="raza" placeholder="Raza">
          <label for="Edad">Edad</label>
          <input type="number" v-model="edad" id="edad" placeholder="Edad">
          <label for="Peso">Peso</label>
          <input type="number" v-model="peso" id="peso" placeholder="Peso">
          <label for="contacto">Contacto</label>
          <select name="contacto" id="contacto"  v-model="tipocontacto" >
            <option value="tel">Teléfono</option>
            <option value="mail">E-mail</option>
          </select>
      <label for="ubicacion">Ubicación</label>
      <input type="text" v-model='Ubicacion' name="ubicacion" />
      <label  for="descripcion">Descripción</label>
      <textarea name="descripcion" id="descripcion" cols="30" rows="10" v-model='Descripcion'></textarea>
        <img  id="imagenavatar" :src="imagen" alt="">
       <input @change="onFileSelected" type="file" id="imagenup" ref="foto" name="foto" />
      <button id="enviar">Enviar</button>
      </form>
  </div>
</template>
<style scoped>
.contenedorForm{
  display: flex;
  justify-content: center;
  align-items: center;
}
textarea{
  width: 100%;
 resize: none;
}
form{
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  text-align: start;
}
input, label{
  width: 100%;
}
</style>
<script>
export default {
  data () {
    return {
      tipoestado: '',
      contacto: '',
      Nombre: '',
      imagen: '',
      Ubicacion: '',
      Descripcion: '',
      Tipo: '',
      Raza: '',
      edad: '',
      peso: '',
      tipocontacto: ''
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
      if (this.tipocontacto === 'tel') {
        this.contacto = this.$store.getters.getUsuario.telefono
      } else {
        this.contacto = this.$store.getters.getUsuario.email
      }
      const newPost = {
        TipoEstado: this.tipoestado,
        Nombre: this.Nombre,
        Ubicacion: this.Ubicacion,
        Tipo: this.Tipo,
        Raza: this.Raza,
        Edad: this.edad,
        Peso: this.peso,
        Tipocontacto: this.tipocontacto,
        Contacto: this.contacto,
        Descripcion: this.Descripcion
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
            this.$router.push('/')
          } else {
            return respuesta.json()
          }
        })
        .then(respuesta => (console.log(respuesta)))
    }
  }
}
</script>
