<template>
<v-app>
<router-view/>
</v-app>

</template>

<script>


export default {
  name: 'App',
  mounted(){
    sessionStorage.setItem('isAuthenticated',JSON.stringify(false))

  },
 methods: {
      changeRTL () {
        this.$vuetify.rtl = true
      },
    },
  components: {
   
  },

}
</script>


<style >
.v-window__controls {
 
    align-items: flex-start !important;

}
.v-btn--variant-elevated {
    background:  transparent !important;
    color: white !important;
}
 .v-text-field input   {
  color: white;
}
 .v-text-field label{
  color: white;
 }
@font-face {
  font-family: openSans;
  src: url(@/assets/OpenSansHebrew-Bold.ttf);
}

body,html{
  font-family: openSans !important;
  min-height: 100vh;
  
}

*{
   margin:calc() !important;
}
:root{
  font-size: 16px;
}
.v-application{
    background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.9),
    rgba(0,0,0, 0)
  ), url(@/assets/car.jpg) !important;
  
  background-position: 50% 50% !important;

  background-size: cover !important;
  background-repeat: no-repeat !important;

}
#app{
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.9),
    rgba(0,0,0, 0)
  ), url(@/assets/car.jpg) !important;
  

  background-position: 70% 50%;

  background-size: cover;
  background-repeat: no-repeat;
}
     @media (max-width: 480px) {
        
        }
</style>
