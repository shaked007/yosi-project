<template>
 
 <h4 class="main-title"> דוח נסיעה</h4>
 <h6 class="current-date"> {{currentDate}} </h6>
 <div class="flex-and-submit-container">
  <form ref="report-form" :action="currentUrl" >
    <div class="flex-inputs">
      <input type="text" name="first">
    </div>
    <button type="submit" @click.prevent="handleSubmit" v-ripple> סיים דוח </button></form>
  
  </div>

</template>

<script>
import moment from "moment"
export default {

  data(){
    return{
      inputsObject:'',
      whatsappDomain:"whatsapp://send?",
      queryStringInputs:"",
      generatedLink:"",
      finalLink:"",
      message:"",
      currentUrl:"https://m.youtube.com"+"?",
      currentDate:  moment(new Date(),'L', 'he').format("יום dddd  D/M/y")
    }
  },
  methods:{
    checkAllInputs(){
        return true;
    },
    handleSubmit(){
      if(this.checkAllInputs()){
          const form = this.$refs["report-form"]
          this.inputsObject = Object.values(form).reduce((obj,field) => { obj[field.name] = field.value; return obj }, {})
          Object.keys(this.inputsObject).forEach((inputName)=>{
            if(inputName && this.inputsObject[inputName]){
                this.queryStringInputs += inputName + "=" + encodeURIComponent(this.inputsObject[inputName])
            }
          })
         this.generatedLink = this.currentUrl+ (this.queryStringInputs)
        //  this.message += `${this.currentDate} דוח חדש פורסם בתאריך      
        //  `
        //  this.message+= `  לחץ על הלינק לצפייה בדוח  ${this.generatedLink}`
         this.message =`  לחץ על הלינק לצפייה בדוח  ${this.generatedLink} שפורסם בתאריך ${this.currentDate}   `
         this.finalLink = this.whatsappDomain +`text=${encodeURIComponent(this.message)}`
         window.open(this.finalLink)
         console.log(this.finalLink)

      }

    }
  },
}
</script>

<style scoped >
.flex-inputs{
  min-height: 80vh;
}
button{
    margin: 0 auto;
    border-radius: 20px;
    background-color: white;
    padding: 0.5em 1.8em;
}
form{
  text-align: center;
}
.current-date{
  text-align: center;
  color: rgba(255, 255, 255, 0.781);
  font-size: 1.2rem;
  
  font-weight: 400 !important;

}

.main-title{

  text-align: center;
  font-size: 3rem;
  color:white;
}
</style>