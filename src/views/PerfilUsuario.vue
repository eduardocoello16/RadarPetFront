<template>
<h2>Bienvenido {{user.nombre}}</h2>
<p>Tu mail es {{user.email}}</p>
 <form  @submit.prevent='subirFoto'>
   <div id="avatar"  :style="{ backgroundImage: 'url(' + imagen + ')' }" >
     <div class="cover">
     <input @change="onFileSelected" type="file" id="imagenup" ref="foto" name="foto" />
     </div>
     </div>
          <p>{{status}}</p>
  <button id="enviar" type="submit">Enviar</button>
</form>
<div v-for="mascota in mascotas" :key= "mascota.id">
  <CardMascota @borrado="removeMascota" :mascota="mascota" :propiedad="true"></CardMascota>
</div>

</template>
<style scoped>
#imagenup{
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;

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
export default {
  name: 'PerfilUsuario',
  components: {
    CardMascota
  },
  data () {
    return {
      user: '',
      mascotas: [],
      imagen: '',
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
  mounted () {
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
