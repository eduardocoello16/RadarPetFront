<template>
<head>
  <meta name="viewport" content= "width=device-width, user-scalable=no">
  <meta name="google" content="notranslate">
</head>
  <NavHeadder/>
  <router-view/>
  <NavFooter/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;1,800&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
* {
  font-family: 'Open Sans', sans-serif;
  font-weight: 500;
}

.tema {

    --color__primary: rgb(248, 248, 248);
    --color__color: rgb(202, 96, 26);
     --color__secondary: whitesmoke;
    --color__headder: rgba(253, 253, 253, 0.975);
     --color__text: rgb(5, 12, 19);
      --color__text2: rgb(65, 65, 65);
       --color__hover: rgba(226, 226, 226, 0.986);

    &-dark {
        --color__primary: rgb(24, 38, 53);
         --color__color: rgb(202, 96, 26);
         --color__secondary: whitesmoke;
            --color__headder: rgba(17, 33, 49, 0.990);
         --color__text: rgb(252, 252, 252);
        --color__text2: rgb(65, 65, 65);
          --color__hover: rgba(31, 31, 31, 0.801);
    }
}
*{
  transition: background-color 0.4s ease;
}
body{
  margin: 0;
  overflow-x: hidden;
  background-color: var(--color__primary);
  color: var(--color__text);
}
</style>
<script>

import NavHeadder from './components/NavHeadder.vue'
import NavFooter from './components/NavFooter.vue'
export default {
  name: 'App',
  components: {
    NavHeadder,
    NavFooter
  },
  mounted () {
    document.body.classList.add('tema')
  }
}
</script>
