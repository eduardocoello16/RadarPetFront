<template>
  <nav class="home">
     <router-link to="/"> <h1>RadarPet</h1></router-link>
     <div>
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
</style>
