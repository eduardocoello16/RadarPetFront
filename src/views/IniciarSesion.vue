/* eslint-disable no-useless-escape */
<template>
  <div>
    <form  v-if="modo == 'login'" @submit.prevent='iniciarSesion'>
         <h2>Iniciar Sesión</h2>
          <p>{{errores.server}}</p>
      <label for="email">Email</label>
      <input type="text" v-model='user.email' name="email" />
      <label for="password">Contraseña</label>
      <input type="password" v-model='user.password' name="password" />
      <button id="enviar">Enviar</button>
      </form>
      <div v-if="modo == 'login'">
          <p>¿No tienes cuenta?</p>
     <button  v-on:click="modo='register'">Registrarte</button>
      </div>
      <div id="register" v-if="modo == 'register'">
                <section id="sectionidenti">
      <CardIdentificacion :imagen="imagen" :Usuario="user" />
        </section>
        <section class="Formulario">
      <form  @submit.prevent='comprobarDatos'>
      <h2>Registra tus datos</h2>
      <p>{{this.errores.passregex}}</p>
         <label for="NombreUsuario">Nombre</label>
        <input type="text" v-model='user.nombre'  id="NombreUsuario" />
        <span>{{errores.nombre}}</span>
           <label for="apellido">Apellidos</label>
        <input type="text" v-model='user.apellido' id="apellido" name="apellido" />
         <span>{{errores.apellido}}</span>
        <label for="tel">Teléfono</label>
        <input type="text" v-model='user.telefono' id="tel" name="tel" />
         <span>{{errores.telefono}}</span>
        <label for="email">Email</label>
        <input type="text" v-model='user.email' id="mail" name="registeremail" />
          <span>{{errores.email}}</span>
        <label for="password">Contraseña</label>
        <input type="password" v-model='user.password' name="registerpassword" />
              <label for="password">Repite la Contraseña</label>
        <input type="password" v-model='password2' name="registerpassword2" />
        <span>{{errores.password}}</span>
        <label for="avatar">Avatar</label>
         <input @change="onFileSelected" type="file" id="imagenup" ref="foto" name="foto" />
          <span>{{errores.imagen}}</span>
        <button id="enviar">Enviar</button>
        </form>
        </section>

</div>
  </div>
</template>
<style>
input, label{
  width: 100%;
}
form{
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  text-align: start;
}
span{
  color: red;
}
#register{
  display: flex;
  flex-wrap: wrap;
}
.Formulario{
  width: 60%;
  display: flex;
  justify-content: center;
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
      password2: '',
      modo: 'login',
      errores: {
        passregex: '',
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        password: '',
        server: ''
      },
      imagen: '',
      user: {
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        password: ''
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
            this.errores.server = respuesta.msg
          }
        })
    },
    comprobarDatos () {
      let error = false
      this.errores.nombre = ''
      this.errores.apellido = ''
      this.errores.telefono = ''
      this.errores.email = ''
      this.errores.password = ''
      this.errores.passregex = ''
      this.errores.imagen = ''
      // Validar Contraseña
      const passregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,35}$/
      if (!passregex.test(this.user.password)) {
        this.errores.password = 'La contraseña no es segura'
        this.errores.passregex = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial'
        error = true
      }
      if (this.user.password !== this.password2) {
        this.errores.password = 'Las contraseñas no coinciden'
        error = true
      }
      // eslint-disable-next-line no-useless-escape
      const re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
      if (!re.test(this.user.email)) {
        this.errores.email = 'Email no válido'
        error = true
      }
      if (this.user.email > 40) {
        this.errores.email = 'Email no válido'
        error = true
      }
      // Validar nombre
      if (this.user.nombre.length < 5) {
        this.errores.nombre = 'Nombre vacío o muy corto'
        error = true
      }
      if (this.user.nombre.length > 40) {
        this.errores.nombre = 'Nombre demasiado largo'
        error = true
      }
      // Validar Apellido
      if (this.user.apellido.length < 5) {
        this.errores.nombre = 'Apellido vacío o muy corto'
        error = true
      }
      if (this.user.apellido.length > 40) {
        this.errores.nombre = 'Apellido demasiado largo'
        error = true
      }
      if (error === false) {
        this.registrarUsuario()
      }
    },
    registrarUsuario () {
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
            this.errores.server = respuesta.msg
          }
        })
    }
  }
}
</script>
