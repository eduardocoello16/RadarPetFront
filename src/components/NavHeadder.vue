<template>
  <nav class="home">
     <div id="datos">
 <router-link to="/perfil" id="perfil"><div id="avatar"  v-bind:style="{ backgroundImage: 'url(' + obtener + ')' }" ></div> <p id="nombreUsuario">{{nombreUsuario}}</p></router-link>
     <router-link to="/"> <h1>RadarPet</h1></router-link>
     <div >
     <button @click="switchTema" class="Sesion">  <img src="../assets/moon.svg" alt=""></button>
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
    },
    switchTema () {
      document.body.classList.toggle('tema-dark')
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
    background-color: var(--color__hover);
  border-radius: 2em;
}
#perfil{
    margin-right: 2em;
}
#nombreUsuario{
  font-size: 0.6em;
  margin: 0;
}
h1{
  color: var(--color__text);
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
  background-color: var(--color__primary);
  color: var(--color__text);
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
          color: var(--color__text);
        text-decoration: none;
          &.router-link-exact-active {
          color: var(--color__text);
      }
      }
    }

    #avatar{
     width: 3em;
      height: 3em;
      margin: 0 1em 0 1em;
      background-size: cover;
      background-position: center;
    background-repeat: no-repeat;
        border-radius: 1em;
    }
    .Sesion{
  width: 3em;
  height: 3em;
  margin-right: 1em;
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
  background-color: var(--color__hover);
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
