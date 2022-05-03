<template>
  <nav class="home">
     <router-link to="/"> <h1>RadarPet</h1></router-link>
     <div>
         <div id="avatar"  v-bind:style="{ backgroundImage: 'url(' + obtener + ')' }" ></div>
      <router-link to="/perfil"  v-if="nombreUsuario"> <p>{{nombreUsuario}}</p> </router-link>
    <router-link to="/nuevamascota"><button>He perdido mi mascota</button></router-link>
    <router-link v-if="!token" to="/iniciarsesion"><button>Iniciar Sesión</button></router-link>
    <button @click="cerrarSesion" v-if="token">Cerrar Sesión</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    cerrarSesion () {
      this.$store.dispatch('cerrarSesion')
      this.$router.push('/')
    }
  },
  computed: {
    token () {
      if (this.$store.getters.getTokenSesion) {
        return true
      } else {
        return false
      }
    },
    obtener () {
      if (this.$store.getters.getTokenSesion) {
        return this.$store.getters.getAvatar
      } else {
        return ''
      }
    },
    nombreUsuario () {
      if (this.$store.getters.getUsuario) {
        return this.$store.getters.getUsuario.nombre
      } else {
        return ''
      }
    }
  }
  // Si hay usuario en el store, hacer una petición para obtener su avatar
}
</script>

<style lang="scss" scoped>
    .home{
      display: flex;
      justify-content: space-between;
       padding: 30px;
    background-color: #2c3e50;
    display: flex;
      a{
        font-weight: bold;
        color: #23553f;
        text-decoration: none;
          &.router-link-exact-active {
        color: #42b983;
      }
      }
      div{
        margin-right: 5em;
        button{
          margin: 0.5em;
        }
      }
    }
    #avatar{
     width: 80px;
      height: 80px;
      background-color: #23553f;
          background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
        border-radius: 1em;
    }
</style>
