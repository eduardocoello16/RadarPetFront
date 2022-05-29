/* eslint-disable no-useless-escape */
<template>
      <div id="register">

        <section class="Formulario">
      <form  @submit.prevent='registrarUsuario'>
      <h2>Registra tus datos</h2>
      <span>{{this.errores.server}}</span>
      <span>{{this.errores.passregex}}</span>
         <label for="NombreUsuario">Nombre</label>
        <input type="text" v-model='user.nombre'  @change="verificarNombre" id="NombreUsuario" />
        <span>{{errores.nombre}}</span>
           <label for="apellido">Apellidos</label>
        <input type="text" v-model='user.apellido' @change="verificarApellido"  id="apellido" name="apellido" />
         <span>{{errores.apellido}}</span>
        <label for="tel">Teléfono</label>
        <input type="tel" v-model='user.telefono' @change="verificarTelefono" id="tel" name="tel" />
         <span>{{errores.telefono}}</span>
        <label for="email">Email</label>
        <input type="text" v-model='user.email' @change="verificarEmail" id="mail" name="registeremail" />
          <span>{{errores.email}}</span>
        <label for="password">Contraseña</label>
        <input type="password" v-model='user.password' @change="verificarPass"  name="registerpassword" />
              <label for="password">Repite la Contraseña</label>
        <input type="password" v-model='password2' @change="verificarPass" name="registerpassword2" />
        <span>{{errores.password}}</span>
        <label for="avatar">Avatar</label>
         <input @change="onFileSelected" type="file" id="imagenup" ref="foto" name="foto" />
          <span>{{errores.imagen}}</span>
        <button id="enviar">Enviar</button>
        </form>
        </section>
          <section id="sectionidenti">
      <CardIdentificacion class="hiddenCardOnMovile" :imagen="imagen" :Usuario="user" />
        </section>

</div>
</template>
<style scoped>
.inputFail{
  border-color: red;
}
#cambiarRegister{
 text-align: center;
  width: 100%;
}
#error{
  color:red;
  width: 100%;
}
.hiddenCardOnMovile{
  display: none;
}

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

  display: flex;
  justify-content: center;
}
  @media (min-width: 900px) {
    .Formulario{
        width: 60%;
    }
.hiddenCardOnMovile{
  display: block;
}
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
    document.title = 'Register'
  },
  methods: {
    verificarNombre (e) {
      e.target.classList.remove('inputFail')
      this.errores.nombre = ''
      if (this.user.nombre.length < 3) {
        e.target.classList.add('inputFail')
        this.errores.nombre = 'El nombre debe tener al menos 3 caracteres'
      }
      if (this.user.nombre.length > 40) {
        e.target.classList.add('inputFail')
        this.errores.nombre = 'Nombre demasiado largo'
      }
    },
    verificarApellido (e) {
      e.target.classList.remove('inputFail')
      this.errores.apellido = ''
      // Validar Apellido
      if (this.user.apellido.length < 5) {
        this.errores.apellido = 'Apellido vacío o muy corto'
      }
      if (this.user.apellido.length > 40) {
        this.errores.apellido = 'Apellido demasiado largo'
      }
    },
    verificarTelefono (e) {
      e.target.classList.remove('inputFail')
      this.errores.telefono = ''
      const telefonoregex = /^[0-9]{9}$/
      if (!telefonoregex.test(this.user.telefono)) {
        this.errores.telefono = 'El teléfono no es válido'
      }
    },
    verificarPass (e) {
    // Validar Contraseña
      e.target.classList.remove('inputFail')
      this.errores.password = ''
      const passregex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
      if (!passregex.test(this.user.password)) {
        this.errores.password = 'La contraseña no es segura'
        this.errores.passregex = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial'
      }
      if (this.user.password !== this.password2) {
        this.errores.password = 'Las contraseñas no coinciden'
      }
    },
    verificarEmail (e) {
      e.target.classList.remove('inputFail')
      this.errores.email = ''
      // eslint-disable-next-line no-useless-escape
      const re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
      if (!re.test(this.user.email.toLowerCase())) {
        this.errores.email = 'Email no válido'
      }
      if (this.user.email > 40) {
        this.errores.email = 'Email no válido'
      }
    },
    onFileSelected (event) {
      this.imagen = URL.createObjectURL(event.target.files[0])
    },
    iniciarSesion () {
      const newPost = {
        email: this.user.email,
        password: this.user.password
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
            this.$router.push('/iniciarsesion')
          } else {
            return respuesta.json()
              .then(respuesta => {
                this.errores.server = respuesta.msg.server
                this.errores.email = respuesta.msg.email
                this.errores.nombre = respuesta.msg.nombre
                this.errores.apellido = respuesta.msg.apellido
              })
          }
        })
    }
  }
}
</script>
