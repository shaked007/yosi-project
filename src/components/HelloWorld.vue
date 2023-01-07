<template>
<FormView  v-if="isFormView" />
<ReportView :urlParams="urlParams" v-if="isReportView"/>
</template>

<script>
import FormView from "./FormView"
import ReportView from "./ReportView"
export default {
  name: 'HelloWorld',
  data(){
    return{
      isFormView:false,
      isReportView:false,
      urlParams:""
    }
  },
  methods:{
    checkViewToRender(){
   
        const url = window.location.href;
        console.log(url)
      
        if(url.includes('?')){
        
            this.urlParams = url.split('?')[1];
            this.isReportView = true;
        }else{
          this.isFormView = true;
        }

    } 

    
  },
    beforeMount(){
      this.checkViewToRender()
    },
    components:{
      FormView
      ,ReportView
    }
  
}
</script>
