<template>
  <div class="pdsf">
    <form  v-if="modo == 'login'" @submit.prevent='iniciarSesion'>
         <h2>Iniciar Sesión</h2>
          <p>{{errores}}</p>
      <label for="email">Email</label>
      <input type="text" v-model='Email' name="email" />
      <label for="password">Contraseña</label>
      <input type="password" v-model='Password' name="password" />
      <button id="enviar">Enviar</button>
      </form>
      <div v-if="modo == 'login'">
          <p>¿No tienes cuenta?</p>
     <button  v-on:click="modo='register'">Registrarte</button>
      </div>
      <form v-if="modo == 'register'" @submit.prevent='registrarUsuario'>
      <h2>Registrarse</h2>
         <label for="nombre">Nombre</label>
        <input type="text" v-model='Nombre' name="nombre" />
           <label for="apellido">Apellido</label>
        <input type="text" v-model='Apellido' id="apellido" name="apellido" />
        <label for="email">Email</label>
        <input type="text" v-model='Email' name="email" />
        <label for="password">Contraseña</label>
        <input type="password" v-model='Password' name="password" />
        <img  id="imagenavatar" :src="imagen" alt="">
        <label for="avatar">Avatar</label>
         <input @change="onFileSelected" type="file" id="imagenup" ref="foto" name="foto" />
        <button id="enviar">Enviar</button>
        </form>

  </div>
</template>
<style>
  #imagenavatar{
    width: 100px;
  }
</style>
<script>
export default {
  data () {
    return {
      modo: 'login',
      Nombre: '',
      Apellido: '',
      Email: '',
      Password: '',
      errores: '',
      imagen: ''
    }
  },
  mounted () {
    document.title = 'Iniciar Sesión'
  },
  methods: {
    onFileSelected (event) {
      this.imagen = URL.createObjectURL(event.target.files[0])
    },
    iniciarSesion () {
      const newPost = {
        email: this.Email,
        password: this.Password
      }
      fetch(`${process.env.VUE_APP_IP}usuario/iniciarsesion`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      })
        .then(respuesta => respuesta.json())
        .then(respuesta => {
          if (respuesta.token) {
            this.$store.dispatch('setTokenSesion', respuesta.token)
            this.$store.dispatch('setAvatarImage')
            this.$router.push('/')
          } else {
            this.errores = respuesta.msg
          }
        })
    },
    registrarUsuario () {
      const newPost = {
        nombre: this.Nombre,
        Apellido: this.Apellido,
        email: this.Email,
        password: this.Password
      }
      const formData = new FormData()
      formData.append('datos', JSON.stringify(newPost))
      formData.append('avatar', this.$refs.foto.files[0])
      fetch(`${process.env.VUE_APP_IP}usuario/registrarse`, {
        method: 'POST',
        body: formData
      })
        .then(respuesta => {
          if (respuesta.status === 200) {
            this.modo = 'login'
          }
        })
    }
  }
}
</script>
