<template>
<div id="Card">
      <img class="hideonPC" :style="{ caducada: isCaducada }" id="foto" :src="imagen" alt="">
    <div class="cardForm"  v-if="propiedad == true">
      <div v-if="this.isCaducada == true">
        <p>Mascota Caducada, si quiere volver a activarla otros 3 meses pulsa aquí</p>
        <button @click="activarMascota">Activar Mascota</button>
      </div>
      <div v-else>
      <form  id="datosmascotaedit" @submit.prevent='editarMascota'>
        <label for="Nombre">Nombre</label>
        <input type="text" v-model="datosMascota.Nombre" id="nombre"  placeholder="Nombre">
        <label for="Raza">Raza</label>
        <input type="text" v-model="datosMascota.Raza" id="raza" placeholder="Raza">
        <label for="tipo">Tipo</label>
        <select name="tipo" id="tipo"  v-model="datosMascota.Tipo" >
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
              <option value="Pajaro">Pajaro</option>
        <option value="Otro">Otro</option>
        </select>
        <label for="contacto">Contacto</label>
        <select name="contacto" id="contacto"  v-model="datosMascota.Tipocontacto" >
          <option value="tel">Teléfono</option>
          <option value="mail">E-mail</option>
        </select>
        <label for="Peso">Peso</label>
        <input type="number" v-model="datosMascota.Peso" id="peso" placeholder="Peso">
        <label for="Edad">Edad</label>
        <input type="number" v-model="datosMascota.Edad" id="edad" placeholder="Edad">
        <label for="descripcion">Descripción</label>
        <textarea name="descripcion" id="descripcion" cols="30" rows="10" v-model='datosMascota.Descripcion'></textarea>
        <label for="Ubicacion">Ubicacion</label>
        <input type="text" v-model="datosMascota.Ubicacion" id="ubicacion" placeholder="Ubicacion">
        <label for="fotoMascota">Foto Mascota</label>
        <input @change="onFileMascotaSelected" type="file" accept="image/png,image/jpeg" id="imagenMascota" ref="fotoMascota" name="fotoMascota" />
        <button type="submit">Guardar</button>
      </form>
    </div>
    <button @click="borrarMascota">Borrar</button>
    <p>{{this.status}}</p>
  </div> <!-- Cierre Propiedad = true -->
</div>  <!-- Cierre Card -->
</template>
<script>
export default {
  name: 'EditMascota',
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
      datosMascota: this.mascota,
      isCaducada: false,
      imagen: '',
      status: ''
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
      const datosMascotaEditar = this.datosMascota
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
<style scoped lang="scss">
button{
    margin-top: 1.2em;
}
#descripcion{
  width: 100%;
 resize: none;
}
#datosmascotaedit{
  padding: 2em;
}
#info{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
#Card{
  margin: 2em;
    white-space: normal;
    overflow: hidden;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color__secondary);
  color: var(--color__text2);
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.219);
}
.cardForm{
  margin-left: 10px;
  width: 100%;
}
input, label{
  width: 100%;
}
form{
  display: flex;
  flex-wrap: wrap;
  text-align: start;
}
.caducada{
   -webkit-filter: grayscale(1); /* Webkit */
    filter: gray; /* IE6-9 */
    filter: grayscale(1); /* W3C */
}
#foto{
  width: 100%;
  height: auto;
  cursor: pointer;
}
@media (min-width: 900px) {
  #Card{
    width: 60%;
  }
 .hideonPC{
   display: none;
 }
}
</style>
