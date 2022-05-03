<template>
<h2>Bienvenido {{user.nombre}}</h2>
<p>Tu mail es {{user.email}}</p>
 <div id="avatar"  v-bind:style="{ backgroundImage: 'url(' + obtener + ')' }" ></div>
 <form  @submit.prevent='subirFoto'>
  <label for="foto">Foto</label>
  <input type="file" id="foto" ref="foto" name="foto" />
  <button id="enviar">Enviar</button>
</form>
<div v-for="mascota in mascotas" :key= "mascota.id">
  <CardMascota :mascota="mascota"></CardMascota>
</div>

</template>
<style scoped>
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
      mascotas: ''
    }
  },
  methods: {
    subirFoto () {
      const formData = new FormData()
      formData.append('avatar', this.$refs.foto.files[0])
      console.log(this.$refs.foto.files[0])
      fetch(`${process.env.VUE_APP_IP}usuario/uploadAvatar`, {
        method: 'PUT',
        headers: {
          Key: this.$store.getters.getTokenSesion
        },
        body: formData
      })
        .then(respuesta => {
          if (respuesta.status === 200) {
            this.$store.dispatch('setAvatarImage')
          }
        })
    }
  },
  computed: {
    obtener () {
      if (this.$store.getters.getTokenSesion) {
        return this.$store.getters.getAvatar
      } else {
        return ''
      }
    }
  },
  mounted () {
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
