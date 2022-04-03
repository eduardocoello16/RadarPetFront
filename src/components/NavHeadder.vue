<template>
  <nav class="home">
     <router-link to="/"> <h1>RadarPet</h1></router-link>
     <div>
    <router-link to="/nuevamascota"><button>He perdido mi mascota</button></router-link>
    <router-link to="/iniciarsesion"><button>Iniciar Sesión</button></router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
    .home{
      display: flex;
      justify-content: space-between;
       padding: 30px;
    background-color: wheat;
    display: flex;
      a{
        font-weight: bold;
        color: #2c3e50;
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
