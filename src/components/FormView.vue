<template>
 <Nav/>
 <h4 class="main-title"> דוח נסיעה</h4>
 <h6 class="current-date"> {{currentDate}} </h6>
 <div class="flex-and-submit-container">
  <form ref="report-form" :action="currentUrl" >
    <div class="grey-zone-container">
      <div class="flex-inputs" > 
        <h6 class="form-subtitle"> מילוי פרטים </h6>
        <v-text-field
          name="mefaked-meshaleh-mesima"
            label=' שם מפקד משלח נסיעה + מ"א'
                                                          append-inner-icon="mdi-account"

          ></v-text-field>
        <v-text-field
          name="mefaked-mesima"
            label='שם מפקד המשימה + מ"א'
                                                          append-inner-icon="mdi-account"

          ></v-text-field>
           <v-text-field
          name="driver"
            label='שם הנהג + מ"א'
                                              append-inner-icon="mdi-account"

          ></v-text-field>

          <q-input filled dark v-model="starterTime" placeholder="שעת התדרוך"  :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
             <q-time name="starting-time"  dark v-model="starterTime" format24h >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="סגור" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <v-textarea
          name="nosim"
            label='נוסעים ( שם+מ"א )'
                                  append-inner-icon="mdi-account-multiple"

          ></v-textarea>
           <v-textarea
          name="description"
            label='תיאור המשימה'
                      append-inner-icon="mdi-clipboard-outline"

          ></v-textarea>
             <v-select
          :items="cars"
 label='סוג הרכב + מס צ'           
          append-inner-icon="mdi-car"

        ></v-select>
        
          <v-radio-group  class="font-sizer" label="האם הנהג ישן 7 שעות לפני ביצוע המשימה?">
              <v-radio label="כן"  name="is-sleep" :value="true" ></v-radio>
              <v-radio label="לא" name="is-sleep" :value="false" ></v-radio>
</v-radio-group >
   <v-radio-group class="font-sizer" label="האם לנהג יש רישיון והיתר מתאים לסוג הרכב?">
              <v-radio label="כן"  name="is-licensed" :value="true" ></v-radio>
              <v-radio label="לא" name="licensed" :value="false" ></v-radio>
</v-radio-group >
 <v-radio-group  label="האם הנהג נסע בציר זה בעבר?">
              <v-radio label="כן"  name="is-drove-before" :value="true" ></v-radio>
              <v-radio label="לא" name="is-drove-before" :value="false" ></v-radio>
</v-radio-group >
  <v-text-field
          name="desination"
            label='יעד הנסיעה'
            append-inner-icon="mdi-map-marker"
          ></v-text-field>
           <v-textarea
          name="dangers"
          append-inner-icon="mdi-alert"
            label='פירוט גורמי סיכון בציר'
          ></v-textarea>
          <v-text-field  type="number" append-inner-icon="mdi-phone"> </v-text-field>
           <v-checkbox
           name="is-tudrah"
      label="הנהג עבר תדרוך נסיעה"
    ></v-checkbox>
          <v-checkbox
           name="is-card"
      label="כרטיס עבודה מלא וחתום ע״י בעלי התפקידים"
    ></v-checkbox>
</div>
    </div>
    <button class="finish-report-button" type="submit"  @click.prevent="handleSubmit" v-ripple> סיים דוח </button></form>
  
  </div>

</template>

<script>
import moment from "moment"
import Nav from "./Nav"

export default {

  data(){
    return{
      starterTime:'',
      finishedTime:'',
      cars:['קנגו - צ׳265465','קנגו- צ׳265445','סוואנה - צ׳297616','טיוטה - צ׳197807','קולורדו - 187099','קולורדו - 187088','אופל - צ׳153847'],
      inputsObject:'',
      whatsappDomain:"whatsapp://send?",
      queryStringInputs:"",
      generatedLink:"",
      finalLink:"",
      message:"",
      currentUrl:window.location.href+"?",
      currentDate:  moment(new Date(),'L', 'he').format("יום dddd  D/M/y")
    }
  },
  components:{
     Nav
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

      }

    }
  },
}
</script>

<style  scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}
.font-sizer label{
  font-size:0.9rem !important;
}
.direction-wrapper{
  direction: ltr !important;
}
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
  width: 90%;
  padding-top: 10px;
  gap: 10px 10px;
  margin: 0 auto;
  justify-content: flex-start;
}
.finish-report-button{
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
  margin-top: 20px;
  margin-bottom: 20px;
  color:white;
}
</style>