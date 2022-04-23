<template>
    <h2>Tu mascota</h2>
    <p>{{mascota}}</p>
</template>
<script>
export default {
  name: 'CardMascota',
  props: {
    mascota: Object
  }

}
</script>
