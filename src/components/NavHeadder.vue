<template>
  <nav class="home">
     <div id="datos">
   <div class="buttons">  <router-link to="/perfil" id="perfil"><div id="avatar"  v-bind:style="{ backgroundImage: 'url(' + obtener + ')' }" ></div> <p id="nombreUsuario">{{nombreUsuario}}</p></router-link></div>
     <router-link to="/"> <h1>RadarPet</h1></router-link>
     <div class="buttons">
     <button  class="Sesion">  <img class="modooscuro" src="../assets/luna.png" alt=""></button>
       <router-link  to="/iniciarsesion" v-if="token === ''"> <button  class="Sesion"><img src="../assets/user-solid.svg" alt=""></button></router-link>
 <a  v-if="token !== ''"><button  class="Sesion" @click="cerrarSesion"><img src="../assets/right-to-bracket-solid.svg" alt=""></button></a></div>

    </div>
      <router-link to="/nuevamascota"> <button id="publicar">Publicar mascota</button></router-link>
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
#perfil:hover{
  background-color: #f0f0f0;
  border-radius: 2em;
}
#nombreUsuario{
  font-size: 0.6em;
  margin: 0;
}
h1{
  color: rgb(24, 24, 24);
  font-size: 1.5em;
  font-weight: bold;
  padding: 0;
}
#datos{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em 0 1em;
}

nav.home{
  background-color: rgba(255, 255, 255, 0.980);
  position: sticky;
  width: 100%;
  top: 0;
  padding-bottom: 1em ;
  z-index: 100;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      a{
        font-weight: bold;
        color: #23553f;
        text-decoration: none;
          &.router-link-exact-active {
        color: #42b983;
      }
      }
    }
.buttons{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
   width: 3em;
     background-color: #f0f0f0;
      height: 3em;
}
    #avatar{
     width: 1.5em;
      height: 1.5em;
      margin: 0 1em 0 1em;
      background-size: cover;
      background-position: center;
    background-repeat: no-repeat;
        border-radius: 1em;
    }
    .Sesion{
  width: 2em;
  height: 2em;
}
.modooscuro{
  width: 1.5em;
  height: 1.5em;
  margin-left: 0.5em;
}
button{
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
}
button:hover{
  background-color: #f0f0f0;
  border-radius: 1em;
}
#publicar{
  padding:  0.8em;
  background-color: #23553f;
  color: white;
  font-weight: bold;
  font-size: 0.8em;
  border-radius: 1em;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
