<template>
  <nav class="home">
     <div id="datos">
        <div id="perfil">
 <router-link to="/perfil" id="infoUser" >

 <div v-if="obtener" id="avatar"  v-bind:style="{ backgroundImage: 'url(' + obtener + ')' }" ></div>
 <p v-if="obtener" id="nombreUsuario">{{nombreUsuario}}</p>
   </router-link>
  </div>

     <router-link to="/" id="nombreWeb">
     <h1>RadarPet</h1>
     </router-link>
     <div id="buttonsleft" >
     <button @click="switchTema" class="Sesion">
       <svg v-if="modoOscuro" class="buton-color" id="SUN" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 404.27 408.97"><defs></defs><path class="cls-1" d="M224.08,139c-151.69,2.7-150.91,231.47-.15,234.11C374.6,370.57,375.57,141.83,224.08,139Z" transform="translate(-21.77 -51.52)"/><path class="cls-1" d="M65,241.13C50.52,242.63,23,234,21.77,255.79c.88,22.22,28.65,13.54,43.32,15.09C84.06,270.78,84.15,241.17,65,241.13Z" transform="translate(-21.77 -51.52)"/><path class="cls-1" d="M411.76,241.12c-14.5,1.59-42.05-7.09-43.3,14.63.84,22.25,28.6,13.66,43.28,15.12C430.74,270.88,430.87,241.26,411.76,241.12Z" transform="translate(-21.77 -51.52)"/><path class="cls-1" d="M209.59,95.92A14.42,14.42,0,0,0,224,110.19c15.68-.06,15.07-17.58,14.44-29.12C239,69.46,239.91,51.58,224,51.52,202.21,53.05,211.22,81.28,209.59,95.92Z" transform="translate(-21.77 -51.52)"/><path class="cls-1" d="M238.41,416.19a14.41,14.41,0,0,0-14.29-14.38c-15.67-.13-15.22,17.42-14.56,29-.53,11.59-1.55,29.5,14.31,29.69C245.74,459.08,236.81,430.85,238.41,416.19Z" transform="translate(-21.77 -51.52)"/><path class="cls-1" d="M348.7,150.13c8.21-9.92,28-19.47,21-34.59-2.61-5.3-7.08-7.94-13-8.09-12,.85-19.46,15.18-28.14,22.45C316.82,142.29,336.23,161.84,348.7,150.13Z" transform="translate(-21.77 -51.52)"/><path class="cls-1" d="M98.1,149.11c13.36,13.72,34.1-7,20.32-20.41-9.59-7.65-14.87-21-28.83-21.22-4.63.21-9.16,3.09-11.57,8.65C71.93,130.69,90.35,139.41,98.1,149.11Z" transform="translate(-21.77 -51.52)"/><path class="cls-1" d="M99.37,361.81c-8.19,9.95-28.05,19.45-21.11,34.58,2.58,5.3,7,8,12.94,8.18,11.07-.26,20.62-16.11,28.72-23.12C130.88,369.13,111.32,350.41,99.37,361.81Z" transform="translate(-21.77 -51.52)"/><path class="cls-1" d="M349,362.11c-12.51-12.11-32.31,7.43-20.4,20,9.94,8.2,19.5,28.07,34.62,20.83C384.09,390,359.22,372.39,349,362.11Z" transform="translate(-21.77 -51.52)"/></svg>
       <svg v-if="!modoOscuro" class="buton-color" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 382.23"><title>moon</title><path d="M.75,204.71v-31.5c1-.27.72-1.16.83-1.83,1-6.53,1.62-13.12,2.92-19.63A190.36,190.36,0,0,1,41.08,71.1a196.35,196.35,0,0,1,72.21-57.65A188.74,188.74,0,0,1,144.48,2a12.79,12.79,0,0,1,13.85,5.05c3.14,4.56,3.07,9.86-.29,14.67-1.43,2-3,4-4.51,6C137.27,49.57,129,74.38,126.91,101.28a141.33,141.33,0,0,0,10,64.17,143.62,143.62,0,0,0,112.67,89,141.22,141.22,0,0,0,86.1-13.82,155.37,155.37,0,0,0,27.2-17.78c5.75-4.6,11.47-4.95,16.64-1.77,2.7,1.66,3.58,4.52,5.28,6.84v6.75c-1.23.74-1.11,2.13-1.44,3.25-1.76,5.84-3.28,11.74-5.38,17.49-12.68,34.72-33.27,63.85-62.42,86.54-32.34,25.18-69,39.2-110.18,41.48-26.69,1.49-52.76-1.74-77.48-11.64C57.45,343.61,15.56,291.94,2.74,217,2,212.89,2.44,208.63.75,204.71Z" transform="translate(-0.75 -1.58)"/></svg>
       </button>
       <router-link  to="/iniciarsesion" v-if="token === ''"> <button  class="Sesion"><svg class="buton-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg></button></router-link>
 <a  v-if="token !== ''"><button  class="Sesion" @click="cerrarSesion"><svg class="buton-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M344.7 238.5l-144.1-136C193.7 95.97 183.4 94.17 174.6 97.95C165.8 101.8 160.1 110.4 160.1 120V192H32.02C14.33 192 0 206.3 0 224v64c0 17.68 14.33 32 32.02 32h128.1v72c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C354.3 264.4 354.3 247.6 344.7 238.5zM416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32z"/></svg></button></a></div>

    </div>
    <div id="publicarNuevaMascota"> <router-link to="/nuevamascota"> <button id="publicar">Publicar mascota</button></router-link></div>
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
      if (this.modoOscuro) {
        this.modoOscuro = false
      } else {
        this.modoOscuro = true
      }
    }
  },
  data () {
    return {
      modoOscuro: false
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
  },
  mounted () {
    // Detectar scroll Top sea mayor a 0 y cambiar headder color a blanco
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        document.querySelector('nav').classList.add('header-scroll')
      } else {
        document.querySelector('nav').classList.remove('header-scroll')
      }
    })
  }
  // Si hay usuario en el store, hacer una petición para obtener su avatar
}
</script>

<style lang="scss" scoped>

.buton-color{
  fill: var(--color__text);
  height: 100%;
  widows: 100%;
}

#buttonsleft{
   flex-basis: 100%;
  display: flex;
  justify-content: flex-end;
   overflow: hidden;
}
#perfil{
     flex-basis: 100%;

    overflow: hidden;
}
#infoUser{
  display: flex;
  flex-wrap: wrap;
  width: 3em;
  justify-content: center;
}

#nombreWeb{
   flex-basis: 100%;
}
#nombreUsuario{
  text-align: start;
  font-size: 0.6em;
  margin: 0;
}
h1{
  color: var(--color__text);
  font-size: 1.5em;
  font-weight: bold;
  padding: 0;
  margin-top: 0;
  transition: 0.2s margin ease;
}
#datos{
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 1em;
}

.home{
  background-color: var(--color__headder);
  color: var(--color__text);
  position: sticky;
  width: 100%;
  top: 0;
  padding-bottom: 1em ;
  z-index: 100;

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
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
        border-radius: 1em;
    }
    .Sesion{
  width: 2.5em;
  margin-right: 0.5em;
  height: 2.5em;
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
#publicar:hover{
  background-color: var(--color__hover);
}
#publicarNuevaMascota{
  width: 100%;
}
// Para cuando se hace scroll minimizar el header
.header-scroll{
  padding: 0 ;
}
.header-scroll #publicarNuevaMascota{
 display: none;
}
.header-scroll h1{
 margin: 0.5em;
  margin-top: 0;
}

@media (min-width: 900px) {

#datos{
    padding: 1.5em;
}
  #nombreUsuario{
  font-size: 1em;
}

h1{
  font-size: 3em;
}
}
</style>
