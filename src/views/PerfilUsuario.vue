<template>
<div id="datosUsuario">
<form  @submit.prevent='EditarUsuario'>
      <h2>Bienvenido {{user.nombre}}</h2>
         <label for="nombre">NombreUsuario</label>
        <input type="text" v-model='user.nombre'  id="NombreUsuario" name="nombre" />
           <label for="apellido">Apellido</label>
        <input type="text" v-model='user.apellido' id="apellido" name="apellido" />
        <label for="tel">Teléfono</label>
        <input type="text" v-model='user.telefono' id="tel" name="tel" />
        <label for="email">Email</label>
        <input type="text" v-model='user.email' id="mail" name="email" />
        <label for="avatar">Avatar</label>
         <input @change="onFileSelected" type="file" id="imagenup" ref="foto" name="foto" />
        <button id="enviar">Actualizar Datos</button>
        </form>
        <section>
        <CardIdentificacion :imagen="imagen" :Nombre="user.nombre" :Apellido="user.apellido" :Email="user.email" :Telefono="user.telefono" />
        </section>
        </div>
<div v-for="mascota in mascotas" :key= "mascota.id">
  <CardMascota @borrado="removeMascota" :mascota="mascota" :propiedad="true"></CardMascota>
</div>

</template>
<style scoped>

#datosUsuario{
  display: flex;
}
#enviar{
  background: black;
  color: whitesmoke;
  margin: 1.5em;
  border: none;
  font-size: 2em;
}
  #avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 0 auto;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 1em;
    background-color: #23553f;
  }
  #avatar:hover .cover{
     background: black;
     width: 100%;
     height: 100%;
     opacity: 0.5;
      border-radius: 1em;
  }
</style>

<script>
import CardMascota from '../components/CardMascota.vue'
import CardIdentificacion from '../components/CardIdentificacion.vue'
export default {
  name: 'PerfilUsuario',
  components: {
    CardMascota,
    CardIdentificacion
  },
  data () {
    return {
      user: '', // obtengo el usuario de la store
      mascotas: [],
      imagen: this.$store.getters.getAvatar,
      status: ''
    }
  },
  methods: {
    removeMascota (event) {
      const id = this.mascotas.findIndex(mascota => mascota.id === event)
      this.mascotas.splice(id, 1)
    },
    onFileSelected (event) {
      this.imagen = URL.createObjectURL(event.target.files[0])
    },
    subirFoto () {
      const formData = new FormData()
      formData.append('avatar', this.$refs.foto.files[0])
      fetch(`${process.env.VUE_APP_IP}usuario/uploadAvatar`, {
        method: 'PUT',
        headers: {
          Key: this.$store.getters.getTokenSesion
        },
        body: formData
      })
        .then(respuesta => {
          this.$store.dispatch('setAvatarImage')
          return respuesta.json()
        })
        .then(respuesta => {
          if (respuesta.status === 200) {
            this.status = 'Foto subida correctamente'
          } else {
            this.status = respuesta.msg
          }
        })
    }
  },
  created () {
    if (!this.$store.getters.getAvatar) {
      fetch(`${process.env.VUE_APP_IP}usuario/getAvatar/`, {
        method: 'GET',
        headers: {
          Key: this.$store.getters.getTokenSesion,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.blob())
        .then(res => {
          const imageObjectURL = URL.createObjectURL(res)
          this.imagen = imageObjectURL
        })
    }

    fetch(`${process.env.VUE_APP_IP}usuario/getUsuario`, {
      method: 'GET',
      headers: {
        Key: this.$store.getters.getTokenSesion,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(respuesta => respuesta.json())
      .then(res => {
        this.user = res
      })
    fetch(`${process.env.VUE_APP_IP}mascota/getFromUser`, {
      method: 'GET',
      headers: {
        Key: this.$store.getters.getTokenSesion,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(respuesta => respuesta.json())
      .then(res => {
        this.mascotas = res
      })
  }
}

</script>
