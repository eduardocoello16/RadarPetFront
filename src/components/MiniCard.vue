<template>
     <div id="Card">
    <div id="cardMascota">
      <img id="foto" :src="imagen" alt="">
      <p>Nombre: {{this.mascota.Nombre}}</p>
      <p>Tipo: {{this.Tipo}}</p>
      <p> Raza: {{this.Raza}}</p>
      <p> Edad: {{this.Edad}}</p>
      <p>Peso: {{this.Peso}}</p>
      <p> Contacto: {{this.Contacto}}</p>
    </div>
    </div>
</template>
<style scoped>
#foto{
  width: 100%;
  height: 300px;
  cursor: pointer;
}
#Card{
  display: flex;
  justify-content: space-around;

}
#cardMascota{
  width: 400px;
    white-space: normal;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-shadow: 0px 0px 10px #000;
}
</style>
<script>
export default {
  name: 'MiniCard',
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
