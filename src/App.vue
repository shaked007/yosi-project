<template>
<HelloWorld/>
</template>

<script>

import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

}
</script>


<style >
@font-face {
  font-family: openSans;
  src: url(@/assets/OpenSansHebrew-Bold.ttf);
}

body,html{
  font-family: openSans;
  min-height: 100vh;
  
}
body{
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.6),
    rgba(0,0,0, 0.6)
  ), url(@/assets/car.jpg);
  


  background-position: 70% 50%;

  background-size: cover;
  background-repeat: no-repeat;
}
     @media (max-width: 480px) {
        
        }
</style>
