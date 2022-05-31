<template>
<div id="loginmode">
  <form   @submit.prevent='iniciarSesion'>
    <h2>Iniciar Sesión</h2>
    <label for="email">Email</label>
    <input type="text" v-model='user.email' name="email" />
     <label for="password">Contraseña <img v-if="passwordField != 'password'" id="mostrar" src="../assets/ojo.svg" @click="mostrarPass" alt="mostrarPass"><img v-else id="mostrar" src="../assets/ojocerrado.svg" @click="mostrarPass" alt="mostrarPass"></label>
    <input :type="passwordField" v-model='user.password' name="password" />
    <p id="error">{{error}}</p>
    <button id="enviar">Enviar</button>
    <div id="cambiarRegister">
      <p>¿No tienes cuenta?</p>
      <router-link to="/registrarse"> <button>Registrarte</button></router-link>
    </div>
  </form>
</div>
</template>
<style scoped>
#mostrar{
  width: 20px;
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
#loginmode{

  display: flex;
  justify-content: center;
  align-items: center;
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
export default {
  data () {
    return {
      passwordField: 'password',
      error: '',
      imagen: '',
      user: {
        email: '',
        password: ''
      }
    }
  },
  mounted () {
    document.title = 'Iniciar Sesión'
  },
  methods: {
    mostrarPass () {
      this.passwordField = this.passwordField === 'password' ? 'text' : 'password'
    },
    onFileSelected (event) {
      this.imagen = URL.createObjectURL(event.target.files[0])
    },
    iniciarSesion () {
      fetch(`${process.env.VUE_APP_IP}usuario/iniciarsesion`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.user)
      })
        .then(respuesta => respuesta.json())
        .then(respuesta => {
          if (respuesta.token) {
            this.$store.dispatch('setTokenSesion', respuesta.token)
            this.$store.dispatch('setAvatarImage')
            this.$router.push('/')
          } else {
            this.error = respuesta.msg
          }
        })
    }
  }
}
</script>
