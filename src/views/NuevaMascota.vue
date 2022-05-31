<template>
<h2> Publicar una mascota {{tipoestado}}</h2>
  <div v-if="!tipoestado" id="tipoestado">
<div class="tipoestado" @click="tipoestado = 'Encontrada'">
  <h2>He encontrado una mascota</h2>
  <p>Publica una mascota que encontraste y no sabes cual es su dueño. </p>
  </div>
<div class="tipoestado" @click="tipoestado = 'Perdida'">
  <h2>He perdido una mascota</h2>
  <p>Publica una mascota que perdiste para que la gente pueda contactar contigo. </p>
  </div>
</div>
  <p>{{error}}</p>
  <div v-if="tipoestado" >
        <button class="start" v-if="tipoestado === 'Encontrada'" @click="tipoestado = 'Perdida'">Cambiar a Perdida</button>
        <button v-if="tipoestado === 'Perdida'" @click="tipoestado = 'Encontrada'">Cambiar a Encontrada</button>
        <div class="contenedorForm">
    <form @submit.prevent='enviarDatos'>
      <label for="nombre"  >Nombre</label>
      <input type="text" v-model='Nombre' name="Nombre" />
      <label for="tipo">Tipo</label>
      <select name="tipo" id="tipo"  v-model='Tipo' >
        <option value="Perro">Perro</option>
        <option value="Gato">Gato</option>
        <option value="Pajaro">Pajaro</option>
        <option value="Otro">Otro</option>
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
  </div>
</template>
<style scoped>
#tipoestado{
  width: 100%;
  padding: 3em;
  box-sizing: border-box;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.tipoestado{
  border-radius: 1em;
  width: 100%;
  height: 50%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  color: var(--color__text2);
  background-color: var(--color__secondary);
  margin: 10px;
   box-shadow: 6px 5px 7px rgba(0, 0, 0, 0.144);
  cursor: pointer;
}
p{
  width: 100%;
}
.tipoestado:hover{
  background: var(--color__text2);
  color: var(--color__text1);
}
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
@media (min-width: 900px) {
  #tipoestado{
    flex-wrap: nowrap;
      height: 600px;
  }
  .tipoestado{
    width: 50%;
    height: 100%;
  }
}
</style>
<script>
export default {
  data () {
    return {
      error: '',
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
        .then(respuesta => (this.error = respuesta.msg))
    }
  }
}
</script>
