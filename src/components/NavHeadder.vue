<template>
  <nav class="home">
     <router-link to="/"> <h1>RadarPet</h1></router-link>
     <div>
         <div id="avatar"  v-bind:style="{ backgroundImage: 'url(' + $store.getters.getAvatar + ')' }" ></div>
      <router-link to="/perfil"  v-if="$store.getters.getUsuario"> <p>{{$store.getters.getUsuario.nombre}}</p> </router-link>
    <router-link to="/nuevamascota"><button>He perdido mi mascota</button></router-link>
    <router-link v-if="!$store.getters.getTokenSesion" to="/iniciarsesion"><button>Iniciar Sesión</button></router-link>
    <button @click="cerrarSesion" v-if="$store.getters.getTokenSesion">Cerrar Sesión</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
    }
  },
  methods: {
    cerrarSesion () {
      this.$store.dispatch('cerrarSesion')
      this.$router.push('/')
    }
  },
  mounted () {
    // Si hay usuario en el store, hacer una petición para obtener su avatar

  }
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
        background-size: contain;
        border-radius: 1em;
    }
</style>
