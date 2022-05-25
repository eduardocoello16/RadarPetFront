<template>
    <CardMascotaCompleta :mascota="mascota" />
</template>
<script>
export default {
  name: 'InfoMascota',
  data () {
    return {
      mascota: Object,
      id: ''
    }
  },
  mounted () {
    fetch(`${process.env.VUE_APP_IP}mascota/mascota/${this.id}`, {
    })
      .then(response => response.blob())
      .then(res => {
        this.mascota = res
      })
  }

}
</script>
