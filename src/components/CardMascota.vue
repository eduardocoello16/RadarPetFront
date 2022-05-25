<template>
    <div id="cardMascota">
     <img id="foto" v-if="imagen" :src="imagen" alt="">
     <span v-if="!imagen" class="loader"></span>
      <div id="datos">
      <p v-if="imagen"> {{mascota.Nombre}}</p>
      </div>
    </div>
</template>
<style scoped>
.loader {
  width: 100%;
  height: 100%;
  display: block;
  margin: auto;
  position: relative;
  background: #FFF;
  box-sizing: border-box;
}
.loader::after {
  content: '';
  width: calc(100% - 30px);
  height: calc(100% - 15px);
  top: 15px;
  left: 15px;
  position: absolute;
  background-image: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5) 50%, transparent 100%),
   linear-gradient(#DDD 100px, transparent 0),
   linear-gradient(#DDD 50px, transparent 0);
  background-repeat: no-repeat;
  background-size: 75px 175px, 100% 100px, 100% 16px, 100% 30px;
  background-position: -185px 0, center 0, center 115px, center 142px;
  box-sizing: border-box;
  animation: animloader 1s linear infinite;
}

@keyframes animloader {
  to {
    background-position: 185px 0, center 0, center 115px, center 142px;
  }
}
p{
  margin: 0.2em;
  font-size: 0.6em;
  font-weight: bold;
}
#datos{
  width: 100%;
  height: 20%;

}

#foto{
  width: 100%;
  height: 80%;

}

#cardMascota{
    cursor: pointer;
    width: 80px;
    height: 80px;
    white-space: normal;
    overflow: hidden;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color__secondary);
  color: black;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.219);
}
@media (min-width: 340px) {
#cardMascota{
    width: 120px;
    height: 120px;

}
p{
  font-size: 0.8em;

}
}
@media (min-width: 900px) {

#cardMascota{
    width: 250px;
    height: 250px;
}
p{
  font-size: 1.5em;

}
}
</style>
<script>
export default {
  name: 'CardMascota',
  props: {
    mascota: Object
  },
  data () {
    return {
      imagen: ''
    }
  },
  mounted () {
    fetch(`${process.env.VUE_APP_IP}mascota/fotoMascota/${this.mascota._id}`, {
    })
      .then(response => response.blob())
      .then(res => {
        const imageObjectURL = URL.createObjectURL(res)
        this.imagen = imageObjectURL
      })
  }
}
</script>
