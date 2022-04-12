import { createStore } from 'vuex'
import Cookies from 'js-cookie'
export default createStore({
  state: {
    tokenSesion: '',
    nombreUsuario: ''
  },
  getters: {
    getTokenSesion: state => {
      return state.tokenSesion
    },
    getNombreUsuario: state => {
      return state.nombreUsuario
    }
  },
  mutations: {
    setToken (state, token) {
      state.tokenSesion = token
    },
    setUsuario (state, Usuario) {
      state.nombreUsuario = Usuario
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
    cerrarSesion: (context) => {
      context.commit('setToken', '')
      context.commit('setUsuario', '')
      Cookies.remove('token')
      Cookies.remove('usuario')
    },
    getUserInfoFromCookie: (context) => {
      if (Cookies.get('token') && Cookies.get('usuario')) {
        context.commit('setToken', Cookies.get('token'))
        context.commit('setUsuario', JSON.parse(Cookies.get('usuario')))
      }
    }
  },
  modules: {
  }
})
