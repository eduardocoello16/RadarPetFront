<template>
<div id="datosUsuario">
  <form  @submit.prevent='EditarUsuario'>
    <h2>Bienvenido {{datoUsuario.nombre}}</h2>
    <p>{{editUserStatus}}</p>
    <label for="NombreUsuario">NombreUsuario</label>
    <input type="text" v-model='user.nombre'  id="NombreUsuario" name="nombre" />
    <label for="apellido">Apellido</label>
    <input type="text" v-model='user.apellido' id="apellido" name="apellido" />
    <label for="tel">Teléfono</label>
    <input type="text" v-model='user.telefono' id="tel" name="tel" />
    <label for="email">Email</label>
    <input type="text" v-model='user.email' id="mail" name="email" />
    <label for="avatar">Avatar</label>
    <input @change="onFileSelected" type="file" accept="image/png,image/jpeg" id="imagenup" ref="avatar" name="foto" />
    <button id="enviar">Actualizar Datos</button>
  </form>
  <CardIdentificacion :imagen="imagen" :Usuario="user" class="hiddenCardOnMovile"/>
</div>
      <div id="mascotasList">
<div  v-for="mascota in mascotas" :key= "mascota.id">
  <div id="mascotaInfo">
  <EditMascota @borrado="removeMascota" :mascota="mascota" :propiedad="true"/>
    <CardMascota class="hiddenCardOnMovile" :mascota="mascota"/>
  </div>

</div>
</div>

</template>
<style scoped>
.hiddenCardOnMovile{
    width: 400px;
  display: none;
}
#mascotasList{
  margin-top: 5em;
}
input, label{
  width: 100%;
}
form{
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  text-align: start;
}
#datosUsuario{
  display: flex;
  justify-content: center;
}
#enviar{
      background-color: var(--color__color);
  color: whitesmoke;
  margin-top: 1.5em;
  border: none;
  font-size: 1em;
  border-radius: 10px;
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
  @media (min-width: 900px) {
    #mascotaInfo {
      display: flex;
      justify-content: center;
}
    #editMascota{
  width: 40%;
}

.hiddenCardOnMovile{
  display: block;
}
form{
  width: 50%;
}
#datosUsuario{
  justify-content: space-around;
}

}
</style>

<script>
import EditMascota from '../components/EditMascota.vue'
import CardIdentificacion from '../components/CardIdentificacion.vue'
import CardMascota from '../components/CardMascotaCompleta.vue'
export default {
  name: 'PerfilUsuario',
  components: {
    EditMascota,
    CardIdentificacion,
    CardMascota
  },
  data () {
    return {
      user: this.$store.getters.getUsuario, // obtengo el usuario de la store
      mascotas: [],
      imagen: this.$store.getters.getAvatar,
      status: '',
      editUserStatus: ''
    }
  },
  methods: {
    EditarUsuario () {
      const formData = new FormData()
      formData.append('datos', JSON.stringify(this.user))
      formData.append('avatar', this.$refs.avatar.files[0])
      fetch(`${process.env.VUE_APP_IP}usuario/updateDatos/`, {
        method: 'PUT',
        headers: {
          Key: this.$store.getters.getTokenSesion
        },
        body: formData
      })
        .then(res => {
          if (res.status === 200) {
            this.$store.dispatch('getUserInfo')
            this.$store.dispatch('setAvatarImage')
          }
          return res.json()
        })
        .then(res => {
          this.editUserStatus = res.msg
        })
    },
    removeMascota (event) {
      const id = this.mascotas.findIndex(mascota => mascota.id === event)
      this.mascotas.splice(id, 1)
    },
    onFileSelected (event) {
      this.imagen = URL.createObjectURL(event.target.files[0])
    }
  },
  computed: {
    datoUsuario () {
      return this.$store.getters.getUsuario
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
