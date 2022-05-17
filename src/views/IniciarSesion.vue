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
      <div id="register" v-if="modo == 'register'">
      <form  @submit.prevent='registrarUsuario'>
      <h2>Registra tus datos</h2>
       <p>{{errores}}</p>
         <label for="NombreUsuario">Nombre</label>
        <input type="text" v-model='Nombre'  id="NombreUsuario" name="nombre" />
           <label for="apellido">Apellido</label>
        <input type="text" v-model='Apellido' id="apellido" name="apellido" />
        <label for="tel">Teléfono</label>
        <input type="text" v-model='telefono' id="tel" name="tel" />
        <label for="email">Email</label>
        <input type="text" v-model='Email' id="mail" name="email" />
        <label for="password">Contraseña</label>
        <input type="password" v-model='Password' name="password" />
        <label for="avatar">Avatar</label>
         <input @change="onFileSelected" type="file" id="imagenup" ref="foto" name="foto" />
        <button id="enviar">Enviar</button>
        </form>
        <section>
      <CardIdentificacion :imagen="imagen" :Nombre="Nombre" :Apellido="Apellido" :Email="Email" :Telefono="telefono" />
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
      modo: 'login',
      Nombre: '',
      Apellido: '',
      telefono: '',
      Email: '',
      Password: '',
      Password2: '',
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
      // Comprobar errores

      const newPost = {
        nombre: this.Nombre,
        apellido: this.Apellido,
        email: this.Email,
        password: this.Password,
        telefono: this.telefono
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
