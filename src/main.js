import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

if (Cookies.get('token')) {
  store.dispatch('getUserInfo')
  store.dispatch('setAvatarImage')
}
createApp(App).use(store).use(router).mount('#app')
