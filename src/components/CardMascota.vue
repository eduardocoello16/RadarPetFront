<template>
  <div id="Card">
    <div id="cardMascota" :class="{ cardMascotaPropiedad: propiedad == true }">
      <img :class="{ caducada: isCaducada }" id="foto" :src="imagen" alt="">
      <p>Nombre: {{this.Nombre}}</p>
      <p>Tipo: {{this.Tipo}}</p>
      <p> Raza: {{this.Raza}}</p>
      <p> Edad: {{this.Edad}}</p>
      <p>Peso: {{this.Peso}}</p>
      <p> Contacto: {{this.Contacto}}</p>
    </div>
    <div class="cardForm"  v-if="propiedad == true">
      <div v-if="this.isCaducada == true">
        <p>Mascota Caducada, si quiere volver a activarla otros 3 meses pulsa aquí</p>
        <button @click="activarMascota">Activar Mascota</button>
      </div>
      <div v-else>
      <form  @submit.prevent='editarMascota'>
        <label for="Nombre">Nombre</label>
        <input type="text" v-model="Nombre" id="nombre"  placeholder="Nombre">
        <label for="Raza">Raza</label>
        <input type="text" v-model="Raza" id="raza" placeholder="Raza">
        <label for="tipo">Tipo</label>
        <select name="tipo" id="tipo"  v-model="Tipo" >
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
        </select>
        <label for="contacto">Contacto</label>
        <select name="contacto" id="contacto"  v-model="Tipocontacto" >
          <option value="tel">Teléfono</option>
          <option value="mail">E-mail</option>
        </select>
        <label for="Peso">Peso</label>
        <input type="number" v-model="Peso" id="peso" placeholder="Peso">
        <label for="Edad">Edad</label>
        <input type="number" v-model="Edad" id="edad" placeholder="Edad">
        <label for="descripcion">Descripción</label>
        <textarea name="descripcion" id="descripcion" cols="30" rows="10" v-model='Descripcion'></textarea>
        <label for="Ubicacion">Ubicacion</label>
        <input type="text" v-model="Ubicacion" id="ubicacion" placeholder="Ubicacion">
        <label for="fotoMascota">Foto Mascota</label>
        <input @change="onFileMascotaSelected" type="file" id="imagenMascota" ref="fotoMascota" name="fotoMascota" />
        <button type="submit">Guardar</button>
      </form>
    </div>
    <button @click="borrarMascota">Borrar</button>
    <p>{{this.status}}</p>
  </div> <!-- Cierre Propiedad = true -->
</div>  <!-- Cierre Card -->
</template>
<style scoped>
#foto{
  width: 100%;
  height: 300px;
  cursor: pointer;
}
</style>
<script>
export default {
  name: 'CardMascota',
  props: {
    propiedad: {
      type: Boolean,
      default: false
    },
    mascota: Object
  },
  emits: ['borrado'],
  data () {
    return {
      isCaducada: false,
      imagen: '',
      status: '',
      Tipocontacto: this.mascota.Tipocontacto,
      Contacto: this.mascota.Contacto,
      Nombre: this.mascota.Nombre,
      Tipo: this.mascota.Tipo,
      Raza: this.mascota.Raza,
      Edad: this.mascota.Edad,
      Peso: this.mascota.Peso,
      Descripcion: this.mascota.Descripcion,
      Ubicacion: this.mascota.Ubicacion
    }
  },
  mounted () {
    const fechaexp = new Date(this.mascota.FechaExpiracion)
    if (fechaexp < new Date()) {
      this.isCaducada = true
    }
    fetch(`${process.env.VUE_APP_IP}mascota/fotoMascota/${this.mascota._id}`, {
    })
      .then(response => response.blob())
      .then(res => {
        const imageObjectURL = URL.createObjectURL(res)
        this.imagen = imageObjectURL
      })
  },
  methods: {
    activarMascota () {
      fetch(`${process.env.VUE_APP_IP}mascota/aumentarCaducidad/${this.mascota._id}`, {
        method: 'PUT',
        headers: {
          Key: this.$store.getters.getTokenSesion
        }
      })
        .then(res => res.json())
        .then(res => {
          this.status = res.msg
          this.isCaducada = false
        })
    },
    onFileMascotaSelected (event) {
      this.imagen = URL.createObjectURL(event.target.files[0])
    },
    editarMascota () {
      if (this.Tipocontacto === 'tel') {
        this.Contacto = this.$store.getters.getUsuario.telefono
      } else {
        this.Contacto = this.$store.getters.getUsuario.email
      }
      const formData = new FormData()
      const datosMascotaEditar = {
        Nombre: this.Nombre,
        Tipo: this.Tipo,
        Raza: this.Raza,
        Edad: this.Edad,
        Peso: this.Peso,
        Ubicacion: this.Ubicacion,
        Contacto: this.Contacto,
        Descripcion: this.Descripcion,
        Tipocontacto: this.Tipocontacto
      }
      formData.append('datos', JSON.stringify(datosMascotaEditar))
      formData.append('foto', this.$refs.fotoMascota.files[0])
      fetch(`${process.env.VUE_APP_IP}mascota/updateDatos/${this.mascota._id}`, {
        method: 'PUT',
        headers: {
          Key: this.$store.getters.getTokenSesion
        },
        body: formData
      })
        .then(respuesta => {
          if (respuesta.status === 200) {
            this.status = 'Datos actualizados'
          } else {
            this.status = respuesta.msg
          }
        })
    },
    borrarMascota () {
      if (confirm('¿Estas seguro de borrar la mascota?')) {
        fetch(`${process.env.VUE_APP_IP}mascota/mascota/${this.mascota._id}`, {
          headers: {
            Key: this.$store.getters.getTokenSesion
          },
          method: 'DELETE'
        })
          .then(respuesta => {
            if (respuesta.status === 200) {
              this.$emit('borrado', this.mascota._id)
            } else {
              console.log(respuesta.msg)
            }
          })
      }
    }
  }

}
</script>

<style scoped>
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
.cardMascotaPropiedad{
  width: 50%;
}
.cardForm{
  margin-left: 10px;
  width: 50%;
}
input, label{
  width: 100%;
}
form{
  width: 40%;
  display: flex;
  flex-wrap: wrap;
  text-align: start;
}
.caducada{
   -webkit-filter: grayscale(1); /* Webkit */
    filter: gray; /* IE6-9 */
    filter: grayscale(1); /* W3C */
}
</style>
