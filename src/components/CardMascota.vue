<template>
    <h2>Tu mascota</h2>
    <p>{{mascota}}</p>
      <img  id="foto" :src="imagen" alt="">
</template>
<style scoped>
#foto{
  width: 200px;
  height: 200px;
  cursor: pointer;
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
