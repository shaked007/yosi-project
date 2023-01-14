<template>
<h3 class="no-permissions-header" v-if="!isAuthenticated"> אין לך הרשאות לעמוד זה </h3>
<div v-if="isAuthenticated">

 <h4 class="main-title"> דוח נסיעה</h4>
 <h6 class="current-date"> {{currentDate}} </h6>
 <div class="flex-and-submit-container">

    <input type="hidden" name="date" :value="report['date']" />
    <div class="grey-zone-container">
      <div class="flex-inputs" > 
        <h6 class="form-subtitle"> מילוי פרטים </h6>
        <div class="names-container" v-for="job in jobs" :key="job.name">
          <span class="person--job-title"> {{job.hebrewName}}</span>
          
            <v-text-field
            dark
            autocomplete="off"
          :name="job.name"
          class="disabled"
      :persistent-placeholder="report[job.name]"
            
            
            :value="report[job.name]"
              required                     

          ></v-text-field>
             <v-text-field
                autocomplete="off"
                   class="disabled"
                dark
       readonly
             :persistent-placeholder="report[job.name +'-num']"

            :value="report[job.name +'-num']"
                            required                             

          ></v-text-field>
           </div>
      
   

          <q-input filled dark  readonly required   :value="report['tidruh-time']" name="tidruh-time" :placeholder="report['tidruh-time']"  >
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
          
          </q-icon>
        </template>
      </q-input>
      <v-textarea
      required
        autocomplete="off"
          name="nosim"
          :value="report['nosim']"
         dark
                                  append-inner-icon="mdi-account-multiple"

          ></v-textarea>
           <v-textarea
           required
               autocomplete="off"
       dark
       
            :value="report['description']"
                      append-inner-icon="mdi-clipboard-outline"

          ></v-textarea>
             <v-select
             required
             readonly
          :items="cars"
          :value="report['car']"
    dark
          append-inner-icon="mdi-car"

        ></v-select>
        
          <v-radio-group   readonly required v-model="report['is-sleep']" class="font-sizer" label="האם הנהג ישן 7 שעות לפני ביצוע המשימה?">
              <v-radio label="כן"    value="true" ></v-radio>
              <v-radio label="לא"  value="false" ></v-radio>
</v-radio-group >
   <v-radio-group  readonly required class="font-sizer" v-model="report['is-licensed']"  label="האם לנהג יש רישיון והיתר מתאים לסוג הרכב?">
    
              <v-radio label="כן"  value="true" ></v-radio>
              <v-radio label="לא" value="false" ></v-radio>
</v-radio-group >
 <v-radio-group   readonly required  v-model="report['is-drove-before']" label="האם הנהג נסע בציר זה בעבר?">
              <v-radio label="כן"  name="is-drove-before" value="true" ></v-radio>
              <v-radio label="לא" name="is-drove-before" value="false" ></v-radio>
</v-radio-group >
  <v-text-field required 
         
          :value="report['destination']"
             autocomplete="off"
          readonly
          dark 
            append-inner-icon="mdi-map-marker"
          ></v-text-field>
           <v-textarea required 
           readonly
           dark
          :value="report['dangers']"
          append-inner-icon="mdi-alert"
          ></v-textarea>
          <v-text-field  required  dark  readonly  autocomplete="off"   type="number" append-inner-icon="mdi-phone"> </v-text-field>
           <v-checkbox required 
           v-model="check"
           dark
           readonly
      label="הנהג עבר תדרוך נסיעה"
    ></v-checkbox>
          <v-checkbox required 
          readonly
          dark 
          v-model="check"

          
      label="כרטיס עבודה מלא וחתום ע״י בעלי התפקידים"
    ></v-checkbox>
</div>
    </div>
   
  </div>

  </div>
</template>

<script>
import axios from "axios"
import moment from "moment"
export default {
  name:"ReportView",
  data(){
    return{
      check:true,
      isAuthenticated:false,
      report:[],
       jobs:[{hebrewName:'מפקד משלח משימה',name:"mefaked-meshaleh-mesima"},
      {name:'mefaked-mesima',hebrewName:"מפקד המשימה"},
       {name:'driver',hebrewName:"נהג"}
      ],
    
      url:"http://localhost:3000/reports/" + window.location.href.split('/')[window.location.href.split('/').length-1]
    }
  },
  beforeMount(){
    if(JSON.parse(sessionStorage.getItem("isAuthenticated"))){
       
        this.getReportById()
    }else{
      this.isAuthenticated = false;
    }
    
  },
  methods:{

       async getReportById(){
        const reportResponse = await axios.get(this.url);
        this.report = reportResponse.data;
        console.log(this.report)
        this.report.date = moment(new Date(this.report.date),'L', 'he').format("יום dddd  D/M/y");
           this.isAuthenticated = true;
        
      }
  }
}
</script>

<style scoped>
.input-group__input *{
  color: rgba(255, 255, 255, 0.87) !important;
  }
.names-container{
  text-align: center;
}
.no-permissions-header{
  color: white;
  position: relative;
  top: 30%;
  text-align: center;
}
.main-title{
  color:white;
}
.person--job-title{
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  font-size: 1.2rem;
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
  text-align: center;
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
  /* align-items: center; */
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