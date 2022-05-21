<template>
  <nav class="home">
    <a>  <router-link to="/"> <h1>RadarPet</h1></router-link></a>
     <div id="datos">
    <router-link to="/nuevamascota"><button>Publicar mascota</button></router-link>
    <router-link v-if="token === ''" to="/iniciarsesion"><button class="Sesion"></button></router-link>
   <div> <button  class="Sesion" @click="cerrarSesion" v-if="token !== ''">s</button></div>
    <router-link to="/perfil"  v-show="obtener != ''">    <div id="avatar"  v-bind:style="{ backgroundImage: 'url(' + obtener + ')' }" ></div></router-link>
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
a{
  width: 100%;
}
h1{
  color: #fff;
  font-size: 2em;
  font-weight: bold;

  padding: 0;
  width: 100%;
}
#datos{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
}

nav.home{

  padding: 30px;
  z-index: 100;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
       padding: 30px;
    background-color: #2c3e50;
      a{
        font-weight: bold;
        color: #23553f;
        text-decoration: none;
          &.router-link-exact-active {
        color: #42b983;
      }
      }
      div{
        margin-right: 0.1em;
        button{
          margin: 0.5em;
        }
      }
    }
    #avatar{
     width: 50px;
      height: 50px;
      margin: 0 1em 0 1em;
          background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
        border-radius: 1em;
    }
    .Sesion{
  width: 50px;
  height: 50px;
  background-color: #23553f;
}
</style>
