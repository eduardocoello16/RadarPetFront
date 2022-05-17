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
      <h2>Identificate</h2>
         <label for="nombre">Nombre</label>
        <input type="text" v-model='Nombre' name="nombre" />
           <label for="apellido">Apellido</label>
        <input type="text" v-model='Apellido' id="apellido" name="apellido" />
        <label for="tel">Teléfono</label>
        <input type="text" v-model='telefono' id="tel" name="tel" />
        <label for="email">Email</label>
        <input type="text" v-model='Email' name="email" />
        <label for="password">Contraseña</label>
        <input type="password" v-model='Password' name="password" />
        <label for="avatar">Avatar</label>
         <input @change="onFileSelected" type="file" id="imagenup" ref="foto" name="foto" />
        <button id="enviar">Enviar</button>
        </form>
        <div id="cardIdenti" >
        <div id="identi"></div>
        <div id="identiInfo">
          <div id="avatar"  :style="{ backgroundImage: 'url(' + imagen + ')' }" ></div>
        <p>Nombre: {{Nombre}}</p>
        <p>Apellido: {{Apellido}}</p>
        <p>Teléfono: {{telefono}}</p>
        <p>Email: {{Email}}</p>
        <p>Contraseña: {{Password}}</p>
        </div>
        </div>
</div>
  </div>
</template>
<style>
  #avatar{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 1em;
    background-color: #23553f;
  }
#cardIdenti{
  position: absolute;
  top: 130px;
  right: 200px;
  z-index: -5;
  width: 350px;
  transform: rotate(5deg);

}
#identi{
  width: 350px;
  margin: 0;
  height: 350px;
  background-image: url(../assets/identificación.svg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
#identiInfo{
  overflow: hidden;
  white-space: nowrap;
  background: rgb(224, 224, 224);
  margin-top: 0;
  max-width: 350px;
  height: 350px;
  text-align: start;
    box-sizing: border-box;
    margin-top: -30px;
  padding: 2em;
  border-end-end-radius: 1em;
    border-end-start-radius: 1em;
      box-shadow: -4px 9px 25px 0px rgba(0, 0, 0, 0.075);
}
#register{
  display: flex;
}
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
      telefono: '',
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
          }
        })
    }
  }
}
</script>
