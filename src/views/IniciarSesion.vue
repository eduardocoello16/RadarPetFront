<template>
  <div class="pdsf">
    <form @submit.prevent='enviarDatos'>
      <label for="email">Email</label>
      <input type="text" v-model='Email' name="email" />
      <label for="password">Contraseña</label>
      <input type="password" v-model='Password' name="password" />
      <button id="enviar">Enviar</button>
      </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      Email: '',
      Password: ''
    }
  },
  methods: {
    enviarDatos () {
      const newPost = {
        email: this.Email,
        password: this.Password
      }
      console.log(JSON.stringify(newPost))
      fetch('http://192.168.1.44:4000/usuario/iniciarsesion', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      })
        .then(respuesta => respuesta.json())
        .then(respuesta => {
          this.$router.push('/')
          console.log(respuesta)
        })
    }
  }
}
</script>
