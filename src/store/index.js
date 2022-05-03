import { createStore } from 'vuex'
import Cookies from 'js-cookie'
export default createStore({
  state: {
    tokenSesion: '',
    Usuario: '',
    avatar: ''
  },
  getters: {
    getAvatar: state => {
      return state.avatar
    },
    getTokenSesion: state => {
      return state.tokenSesion
    },
    getUsuario: state => {
      return state.Usuario
    }
  },
  mutations: {
    setAvatar: (state, avatar) => {
      state.avatar = avatar
    },
    setToken (state, token) {
      state.tokenSesion = token
    },
    setUsuario (state, Usuario) {
      state.Usuario = Usuario
    }
  },
  actions: {
    setTokenSesion: (context, token) => {
      context.commit('setToken', token)
      Cookies.set('token', token, { sameSite: 'strict', secure: false })
      if (Cookies.get('token')) {
        fetch(`${process.env.VUE_APP_IP}usuario/getUsuario`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            key: Cookies.get('token')
          }
        })
          .then(respuesta => respuesta.json())
          .then(respuesta => {
            context.commit('setUsuario', respuesta)
            Cookies.set('usuario', JSON.stringify(respuesta), { sameSite: 'strict', secure: false })
          })
      }
    },
    setAvatarImage: (context) => {
      fetch(`${process.env.VUE_APP_IP}usuario/getAvatar/`, {
        method: 'GET',
        headers: {
          Key: Cookies.get('token'),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.blob())
        .then(res => {
          const imageObjectURL = URL.createObjectURL(res)
          context.commit('setAvatar', imageObjectURL)
        })
    },
    cerrarSesion: (context) => {
      context.commit('setToken', '')
      context.commit('setUsuario', '')
      context.commit('setAvatar', '')
      Cookies.remove('token')
      Cookies.remove('usuario')
    },
    getUserInfo: (context) => {
      context.commit('setToken', Cookies.get('token'))
      context.commit('setUsuario', JSON.parse(Cookies.get('usuario')))
    }
  },
  modules: {
  }
})
