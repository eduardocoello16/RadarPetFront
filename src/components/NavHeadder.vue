<template>
  <nav class="home">
     <div id="datos">
 <router-link to="/perfil" id="perfil"><div id="avatar"  v-bind:style="{ backgroundImage: 'url(' + obtener + ')' }" ></div> <p id="nombreUsuario">{{nombreUsuario}}</p></router-link>
     <router-link to="/"> <h1>RadarPet</h1></router-link>
     <div >
     <button @click="switchTema" class="Sesion"><svg class="buton-color" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 382.23"><title>moon</title><path d="M.75,204.71v-31.5c1-.27.72-1.16.83-1.83,1-6.53,1.62-13.12,2.92-19.63A190.36,190.36,0,0,1,41.08,71.1a196.35,196.35,0,0,1,72.21-57.65A188.74,188.74,0,0,1,144.48,2a12.79,12.79,0,0,1,13.85,5.05c3.14,4.56,3.07,9.86-.29,14.67-1.43,2-3,4-4.51,6C137.27,49.57,129,74.38,126.91,101.28a141.33,141.33,0,0,0,10,64.17,143.62,143.62,0,0,0,112.67,89,141.22,141.22,0,0,0,86.1-13.82,155.37,155.37,0,0,0,27.2-17.78c5.75-4.6,11.47-4.95,16.64-1.77,2.7,1.66,3.58,4.52,5.28,6.84v6.75c-1.23.74-1.11,2.13-1.44,3.25-1.76,5.84-3.28,11.74-5.38,17.49-12.68,34.72-33.27,63.85-62.42,86.54-32.34,25.18-69,39.2-110.18,41.48-26.69,1.49-52.76-1.74-77.48-11.64C57.45,343.61,15.56,291.94,2.74,217,2,212.89,2.44,208.63.75,204.71Z" transform="translate(-0.75 -1.58)"/></svg></button>
       <router-link  to="/iniciarsesion" v-if="token === ''"> <button  class="Sesion"><svg class="buton-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg></button></router-link>
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
.buton-color{
  fill: var(--color__text);
}
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
  background-color: var(--color__headder);
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
@media (min-width: 900px) {
h1{
  font-size: 3em;
}
}
</style>
