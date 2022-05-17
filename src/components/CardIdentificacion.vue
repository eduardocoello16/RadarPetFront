<template>
     <div id="cardIdenti" >
        <div id="identi"></div>
        <div id="identiInfo">
          <div id="avatar"  :style= "{ backgroundImage: 'url(' + imagen + ')' }" ></div>
          <div class="dato"> <label for="nombre">Nombre: </label><p>&nbsp; {{Nombre}}</p></div>
          <div class="dato"> <label for="apellido">Apellido: </label><p>&nbsp;{{Apellido}}</p></div>
          <div class="dato"> <label for="tel">Teléfono: </label><p>&nbsp;{{Telefono}}</p></div>
          <div class="dato"> <label for="mail">Email: </label><p>&nbsp;{{Email}}</p></div>
        </div>
        </div>
</template>
<script>
export default {
  name: 'CardIdentificacion',
  props: {
    imagen: String,
    Nombre: String,
    Apellido: String,
    Email: String,
    Telefono: String
  }
}
</script>
<style scoped>
.dato{
  display: flex;
  margin: 5px 0 5px 0;
}
p{
margin: 0;
padding: 0;
}
  #avatar{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 1em;
    background-color: #23553f;
  }
#cardIdenti{
    width: 330px;
    height: 580px;
}
#identi{
  width: 100%;
  margin: 0;
  height: 50%;
  background-image: url(../assets/identificación.svg);
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
#identiInfo{
  overflow: hidden;
  white-space: nowrap;
  background: rgb(224, 224, 224);
  margin-top: 0;
  width: 100%;
  height: 50%;
  text-align: start;
    box-sizing: border-box;
    margin-top: -30px;
  padding: 2em;
  border-end-end-radius: 1em;
    border-end-start-radius: 1em;
      box-shadow: -4px 9px 25px 0px rgba(0, 0, 0, 0.075);
}
</style>
