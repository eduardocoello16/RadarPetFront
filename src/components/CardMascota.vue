<template>
    <div id="cardMascota">
      <img id="foto" :src="imagen" alt="">
      <p> {{mascota.Nombre}}</p>
    </div>
</template>
<style scoped>
#foto{
  width: 100%;
  height: 120px;
  cursor: pointer;
}

#cardMascota{
  width: 120px;
    white-space: normal;
    overflow: hidden;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.219);
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
