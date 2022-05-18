/* eslint-disable no-useless-escape */
<template>
  <div class="pdsf">
    <form  v-if="modo == 'login'" @submit.prevent='iniciarSesion'>
         <h2>Iniciar Sesión</h2>
          <p>{{errores}}</p>
      <label for="email">Email</label>
      <input type="text" v-model='email' name="email" />
      <label for="password">Contraseña</label>
      <input type="password" v-model='password' name="password" />
      <button id="enviar">Enviar</button>
      </form>
      <div v-if="modo == 'login'">
          <p>¿No tienes cuenta?</p>
     <button  v-on:click="modo='register'">Registrarte</button>
      </div>
      <div id="register" v-if="modo == 'register'">
      <form  @submit.prevent='registrarUsuario'>
      <h2>Registra tus datos</h2>
       <p>{{errores}}</p>
         <label for="NombreUsuario">Nombre</label>
        <input type="text" v-model='user.nombre'  id="NombreUsuario" name="nombre" />
           <label for="apellido">Apellido</label>
        <input type="text" v-model='user.apellido' id="apellido" name="apellido" />
        <label for="tel">Teléfono</label>
        <input type="text" v-model='user.telefono' id="tel" name="tel" />
        <label for="email">Email</label>
        <input type="text" v-model='user.email' id="mail" name="email" />
        <label for="password">Contraseña</label>
        <input type="password" v-model='user.password' name="password" />
        <label for="avatar">Avatar</label>
         <input @change="onFileSelected" type="file" id="imagenup" ref="foto" name="foto" />
        <button id="enviar">Enviar</button>
        </form>
        <section>
      <CardIdentificacion :imagen="imagen" :Usuario="user" />
        </section>
</div>
  </div>
</template>
<style>
 section{
        width: 50%;
  }
#register{
  display: flex;
}

</style>
<script>
import CardIdentificacion from '../components/CardIdentificacion.vue'
export default {
  components: {
    CardIdentificacion
  },
  data () {
    return {
      email: '',
      password: '',
      modo: 'login',
      errores: '',
      imagen: '',
      user: {
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        password: '',
        password2: ''
      }
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
        email: this.email,
        password: this.password
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
      // Comprobar errores
      // eslint-disable-next-line no-useless-escape
      const re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
      if (re.test(this.email)) {
        console.log('email valido')
      } else {
        console.log('Email no valido')
      }
      const newPost = this.user
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
          } else {
            return respuesta.json()
          }
        })
        .then(respuesta => {
          if (respuesta) {
            this.errores = respuesta.msg
          }
        })
    }
  }
}
</script>
