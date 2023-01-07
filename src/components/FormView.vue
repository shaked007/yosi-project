<template>
 
 <h4 class="main-title"> דוח נסיעה</h4>
 <h6 class="current-date"> {{currentDate}} </h6>
 <div class="flex-and-submit-container">
  <form ref="report-form" :action="currentUrl" >
    <div class="grey-zone-container">
      <div class="flex-inputs" > 
        <h6 class="form-subtitle"> מילוי פרטים </h6>
        <v-text-field
          name="driber"
            label="שם הנהג"
          ></v-text-field>
        <v-text-field
          name="mashak-toran"
            label="שם המשק תורן"
          ></v-text-field>
        <VueTimepicker/>
</div>
    </div>
    <button type="submit"  @click.prevent="handleSubmit" v-ripple> סיים דוח </button></form>
  
  </div>

</template>

<script>
import moment from "moment"
import VueTimepicker from 'vue3-timepicker/src/VueTimepicker.vue'
export default {

  data(){
    return{
      picker:new Date().toISOString().substr(0, 10),
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
  components:{
    VueTimepicker
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
.form-subtitle{
  
  font-size: 1.4rem;
}
.grey-zone-container{

 border-radius: 20px;
  background-color: rgb(0,0,0,0.5);
  direction: rtl !important;
  width: 80%;
    min-height: 80vh;
  margin-left :auto;
  margin-right:auto;
  margin-bottom: 15px;
}
.flex-inputs{
  display: flex;
  flex-direction: column;
  color: white !important;
  width: 80%;
  gap: 10px 10px;
  margin: 0 auto;
  justify-content: flex-start;
}
button{
    margin: 0 auto;
    border-radius: 20px;
    background-color: white;
    padding: 0.5em 1.8em;
}
form{
  padding-bottom: 20px;
  text-align: center;
}
.current-date{
  text-align: center;
  color: rgba(255, 255, 255, 0.781);
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: 400 !important;

}

.main-title{

  text-align: center;
  font-size: 3rem;
  color:white;
}
</style>