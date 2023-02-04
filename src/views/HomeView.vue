<template>

<h4 class="main-title"> טופס שילוח משימה</h4>
 <h6 class="sub-title"> מסך הבית </h6>
<!-- <FormView  v-if="isFormView" />
<ReportView :urlParams="urlParams" v-if="isReportView" /> -->

<div class="links-flex">
  <router-link v-ripple  class="report" to="fill-report">למילוי דוח</router-link>
  <router-link class="history" to="reports"> להיסטוריית דוחות</router-link>
   </div>
   <div v-if="!$isMobile" class="print-icon-container"> 
   <router-link class="printer-link" to="/print-view"><v-icon x-large   size="60">  mdi mdi-printer</v-icon></router-link>
   </div>
<img :src="require('../assets/383zameret.png')"> 
</template>

<script>


export default {
  name: 'homeView',
  data(){
    return{
      isMobile:"",
      isFormView:false,
      isReportView:false,
      urlParams:""
    }
  },
  methods:{


     
    checkViewToRender(){
   
        const url = window.location.href;
      
        if(url.includes('?')){
        
            this.urlParams = url.split('?')[1];
            this.isReportView = true;
        }else{
          this.isFormView = true;
        }

    } 

    
  },
    beforeMount(){
      // this.checkViewToRender()
    },
    components:{
     
      
    }
  
}
</script>

<style scoped>
.printer-link{
  position: relative;
  top: 100%;
  display: inline-block;
  color: white;
  background-color: black;
  text-decoration: none;
  outline: none;
  border-radius: 20px;
  padding: 0.5em 1em;
}
.print-icon-container{
  color: white;
  text-align: center;


}
.print-icon-container button{
    border-radius: 50%;
  
    padding: 1em;
    background-color: rgba(0, 0, 0, 0.76);
} 
.links-flex .report{
  color:white;
  display: inline-block;
  background-color: rgba(128, 128, 128, 0.753);
  border-radius: 20px;
  padding:0.5em 1em;
  text-decoration:none;
}
.links-flex .history{
  color:white;
  border: 1px solid grey;
  display: inline-block;
  /* background-color: rgba(128, 128, 128, 0.753); */
  border-radius: 20px;
  padding:0.5em 1em;
  text-decoration:none;
}
.links-flex{
  font-size: 20px;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
img{
  position: absolute;
  bottom: 10%;
  height:180px;
  width: 140px;
  left: 50%;
  transform: translate(-50%,0);
}
.main-title{
  text-align: center;
  font-size: 3rem;
  margin-top: 20px;
  margin-bottom: 20px;
  color:white;
}
.sub-title{
  text-align: center;
  color: rgba(255, 255, 255, 0.781);
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: 400 !important;

}
</style>
