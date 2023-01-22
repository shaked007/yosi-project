<template>
 <!-- <Nav/> -->
 <!-- <iframe name="hiddenFrame" width="0" height="0" border="0" style="display: none;"></iframe> -->

 <h4 class="main-title">טופס שילוח משימה</h4>
 <h6 class="current-date"> {{currentDate}} </h6>
 <div class="flex-and-submit-container">
  <form ref="report-form" method="POST"   @submit="handleSubmit($event)" :action="currentUrl" >
    <input type="hidden" name="date" :value="new Date()" />
    <div class="grey-zone-container">
      <div class="flex-inputs" > 
        <!-- <h6 class="form-subtitle"> מילוי פרטים </h6> -->
        <div>
                            <h6 > בעלי תפקידים</h6>

        <div v-for="job in jobs" :key="job.name">
                    <br>

          <span class="person--job-title"> {{job.hebrewName}}</span>
          
            <v-text-field
            dark
            autocomplete="off"
          :name="job.name"
            label='שם מלא'
              required                     

          ></v-text-field>
             <v-text-field
                autocomplete="off"
          :name="job.name +'-num'"
            label='מספר אישי'
                            required                             

          ></v-text-field>
           </div>
              </div>

   
        <div id="date"> 
          <q-input filled dark v-model="starterTime" readonly   ref="timeRef" name="tidruh-time" placeholder=" שעת התדרוך  (לחץ על השעון)"  :rules="['timeOrFulltime']">
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
                  </div>

<div > 
  <div class="nosim-container">

                                <v-btn 
                                @click="handleMinus"
        class="ma-2"
        color="dark"
        dark
      >
        <v-icon
          dark
          right
        >
          mdi-minus-thick
        </v-icon>
      </v-btn>


                              <span  class="nosim-title"> נוסעים ({{nosim}})</span>
        <v-btn @click="handlePlus"
        class="ma-2"
        color="dark"
        dark
      >
        <v-icon
          dark
          right
        >
          mdi-plus-thick
        </v-icon>
      </v-btn>

</div>
  <div v-for="index in nosim" :key="index">
          <span class="person--job-title">נוסע {{index}}</span>
          
            <v-text-field
            dark
            autocomplete="off"
          :name="'nosea' + index "
            label='שם מלא'
              required                     

          ></v-text-field>
             <v-text-field
                autocomplete="off"
          :name="'nosea' +index +'-num'"
            label='מספר אישי'
                            required                             

          ></v-text-field>
           </div>
      </div> 
      
           <v-textarea
           required
               autocomplete="off"
          name="description"
            label='תיאור המשימה'
                      append-inner-icon="mdi-clipboard-outline"

          ></v-textarea>
          <div id="car">
             <v-select
                 required
                 ref="select"
                 v-model="carValue"
            :rules="[(v) => !!v || 'יש לבחור רכב']"
          :items="cars"
 label='סוג הרכב + מס צ'          
 name="car" 
          append-inner-icon="mdi-car"

        ></v-select>
                  </div>
<div id="radios"> 
          <v-radio-group  mandatory ref="radio1"  v-model="radio1" class="font-sizer" label="האם הנהג ישן 7 שעות לפני ביצוע המשימה?">
              <v-radio label="כן"   name="is-sleep" :value="true" ></v-radio>
              <v-radio label="לא" name="is-sleep" :value="false" ></v-radio>
</v-radio-group >
   <v-radio-group  mandatory  v-model="radio2" ref="radio2" class="font-sizer" label="האם לנהג יש רישיון והיתר מתאים לסוג הרכב?">
    
              <v-radio label="כן"  name="is-licensed" :value="true" ></v-radio>
              <v-radio label="לא" name="licensed" :value="false" ></v-radio>
</v-radio-group >
 <v-radio-group   mandatory v-model="radio3"  ref="radio3" label="האם הנהג נסע בציר זה בעבר?">
              <v-radio label="כן"  name="is-drove-before" :value="true" ></v-radio>
              <v-radio label="לא" name="is-drove-before" :value="false" ></v-radio>
</v-radio-group >
</div>
  <v-text-field required 
          name="destination"
             autocomplete="off"
            label='יעד הנסיעה'
            append-inner-icon="mdi-map-marker"
          ></v-text-field>
           <v-textarea required 
          name="dangers"
          append-inner-icon="mdi-alert"
            label='פירוט גורמי סיכון בציר'
          ></v-textarea>
          <div>
  <div class="nosim-container">

                                <v-btn
                                @click="handleMinusStops"
        class="ma-2"
        color="dark"
        dark
      
      
      >

        <v-icon
          dark
          right
        >
          mdi-minus-thick
        </v-icon>
      </v-btn>
                                  <span  class="nosim-title">  יעדי עצירה</span><span class="nosim-title" v-if="stops"> ({{stops}})</span>  
                                    

  <v-btn @click="handlePlusStops"
        class="ma-2"
        color="dark"
        dark
      >

        <v-icon
          dark
          right
        >
          mdi-plus-thick
        </v-icon>
      </v-btn>
</div>
<span  class="nosim-title"  v-if="!stops">  לא נרשמו יעדי עצירה בנסיעה זו</span>
  <div v-for="index in stops" :key="index">
          <span class="person--job-title">עצירה {{index}}</span>
          
            <v-text-field
            dark
            autocomplete="off"
          :name="'stop' + index"
            label='עצירה'
              required                     

          ></v-text-field>
            
           </div>
          </div>







<div > 
  <div class="nosim-container">

                                <v-btn 
                                @click="handleMinusPhones"
        class="ma-2"
        color="dark"
        dark
      >
        <v-icon
          dark
          right
        >
          mdi-minus-thick
        </v-icon>
      </v-btn>


                              <span  class="nosim-title"> אנשי קשר חיוניים ({{phones}})</span>
        <v-btn @click="handlePlusPhones"
        class="ma-2"
        color="dark"
        dark
      >
        <v-icon
          dark
          right
        >
          mdi-plus-thick
        </v-icon>
      </v-btn>

</div>
  <div v-for="index in phones" :key="index">
          <span class="person--job-title">איש קשר  {{index}}</span>
          
            <v-text-field
            dark
            autocomplete="off"
          :name="'contact' + index "
            label='שם מלא'
              required                     

          ></v-text-field>
             <v-text-field
                autocomplete="off"
                type="number"
          :name="'contact' +index +'-num'"
            label='טלפון'
                            required                             

          ></v-text-field>
           </div>
      </div> 





           <v-checkbox required 
           name="is-tudrah"
           
      label="הנהג עבר תדרוך נסיעה"
    >

    </v-checkbox>
        <div class="label-alignment"> 
          <v-checkbox required 
           name="is-card"
      label="כרטיס עבודה מלא וחתום ע״י בעלי התפקידים"
    ></v-checkbox>
      </div>
</div>
    </div>
    <div class="phone-container">
    <h6 > גדוד 383 - משרד קצין רכב </h6>
   <h6> <a href="tel:054-993-6883"> 0549936883</a> - יוסי שושן</h6>
    </div>
    <br>
    <input class="finish-report-button"  type="submit"   value="סיים דוח" v-ripple></form>
  
  </div>

</template>

<script>
import moment from "moment"
// import Nav from "./Nav"
import axios from "axios"


export default {

  data(){
    return{
      radio1:'',
      radio2:'',
      radio3:'',
      phones:1,
      stops:0,
      carValue:'',
      starterTime:'',
      rules:{
    select: [v =>  v.length >0 || "יש לבחור רכב"],
      },
      nosim:1,

      finishedTime:'',
      cars:['קנגו - צ`265465','קנגו- צ`265445','סוואנה - צ`297616','טיוטה - צ`197807','קולורדו - צ`187099','קולורדו - צ`187088','אופל - צ`153847'],
      inputsObject:'',
      whatsappDomain:"whatsapp://send?",
      queryStringInputs:"",
      generatedLink:"",
      jobs:[{hebrewName:'מפקד משלח משימה',name:"mefaked-meshaleh-mesima"},
      {name:'mefaked-mesima',hebrewName:"מפקד המשימה"},
       {name:'driver',hebrewName:"נהג"}
      ],
      finalLink:"",
      message:"",
      currentUrl:"/.netlify/functions/post_report",
      currentDate:  moment(new Date(),'L', 'he').format("יום dddd  D/M/y")
    }
  },
  components:{
    //  Nav
  },
mounted(){
  
},
  methods:{
  handleMinusPhones(){
        if(this.phones >1){
          this.phones--
        }
    
    },
  handlePlusPhones(){
    if(this.phones <5){
              this.phones++
            }
      },





    handleMinusStops(){
        if(this.stops >0){
          this.stops--
        }
    
    },
  handlePlusStops(){
    if(this.stops <5){
              this.stops++
            }
      },


    handleMinus(){
  if(this.nosim >1){
          this.nosim--
        }
    },
    handlePlus(){
        if(this.nosim <5){
          this.nosim++
        }
    },
    checkAllInputs(){
        return true;
    },
     async handleSubmit(event){
      let isTimeValid;
      let isCarValid;
      let isRadio1;
      let isRadio2;
      let isRadio3;

      try{
      isTimeValid = await this.$refs.timeRef.validate()
       isCarValid = await this.$refs.select.validate()

     console.log(isTimeValid,isCarValid,this.starterTime,this.radio1,this.radio2,this.radio3)
      }
      catch(err){
        console.log(err.message)
      }
      event.preventDefault()
      if (isTimeValid  && this.carValue  && this.radio1!==''  && this.radio2!=='' && this.radio3!==''){
      const form = this.$refs["report-form"];
      const data = Object.fromEntries(new FormData(form).entries());
      console.log(data)
      const response = await axios.post(this.currentUrl,JSON.stringify(data))
      if(response.status== 200){
          this.$swal({icon:'success',text:'הדו"ח הועלה בהצלחה'})
          window.location.href="/";

      }

      // if(this.checkAllInputs()){
      //     const form = this.$refs["report-form"]
      //     this.inputsObject = Object.values(form).reduce((obj,field) => { obj[field.name] = field.value; return obj }, {})
      //     Object.keys(this.inputsObject).forEach((inputName)=>{
      //       if(inputName && this.inputsObject[inputName]){
      //           this.queryStringInputs += inputName + "=" + encodeURIComponent(this.inputsObject[inputName])
      //       }
      //     })
      //    this.generatedLink = this.currentUrl+ (this.queryStringInputs)
      //   //  this.message += `${this.currentDate} דוח חדש פורסם בתאריך      
      //   //  `
      //   //  this.message+= `  לחץ על הלינק לצפייה בדוח  ${this.generatedLink}`
      //    this.message =`  לחץ על הלינק לצפייה בדוח  ${this.generatedLink} שפורסם בתאריך ${this.currentDate}   `
      //    this.finalLink = this.whatsappDomain +`text=${encodeURIComponent(this.message)}`
      //    window.open(this.finalLink)

      // }
      }else if(!isTimeValid){
         document.getElementById("date").scrollIntoView();

      }else if(!this.carValue){
             document.getElementById("car").scrollIntoView();
      }else if(this.radio1 === '' || this.radio2=== '' || this.radio3==='')
                   document.getElementById("radios").scrollIntoView();


    }

  },
}
</script>

<style  scoped>

.phone-container a{
  color: white;
}
.phone-container{
  color: white;
}
.nosim-container button{
  background-color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  color: black;
  padding: 0.5em 1em;
}
.nosim-container{
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  justify-content: center;
}
.nosim-title{
  color: white;
  font-size: 1.25rem;
}
.v-label{
  text-align: right !important;
}

.person--job-title{
  display: inline-block;
  color: rgba(255, 255, 255, 0.829);
  margin-bottom: 10px;
  font-size: 1rem;
}

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
  width: 95%;
    min-height: 80vh;
  margin-left :auto;
  margin-right:auto;
  margin-bottom: 15px;
}
.flex-inputs{
  display: flex;
  flex-direction: column;
  color: white !important;
  width: 95%;
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