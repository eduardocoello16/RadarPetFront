<template>
  <nav class="home">
     <router-link to="/"> <h1>RadarPet</h1></router-link>
     <div>
       <router-link to="/perfil"  v-if="obtener != ''">    <div id="avatar"  v-bind:style="{ backgroundImage: 'url(' + obtener + ')' }" ></div></router-link>
      <router-link to="/perfil"> <p>{{nombreUsuario}}</p> </router-link>
    <router-link to="/nuevamascota"><button>Publicar mascota</button></router-link>
    <router-link v-if="token === ''" to="/iniciarsesion"><button>Iniciar Sesión</button></router-link>
    <button @click="cerrarSesion" v-if="token !== ''">Cerrar Sesión</button>
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
      return (this.$store.getters.getTokenSesion)
    },
    obtener () {
      return this.$store.getters.getAvatar
    },
    nombreUsuario () {
      return this.$store.getters.getUsuario.nombre
    }
  }
  // Si hay usuario en el store, hacer una petición para obtener su avatar
}
</script>

<style lang="scss" scoped>
nav{
  height: 100px;
  padding: 30px;
  z-index: 100;
}
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
