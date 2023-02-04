<template>

<dialog  ref="dialog">  
    <h6> דוחות</h6> 
 <h5 >{{modalText}} </h5>
  <h5> בתאריכים:  {{dates}}</h5> 
  <img :src="require('@/assets/report.jpg') " >
<div class="action-btn-flex">
    <button @click="printHandler" class="print-btn"> 
         <v-icon> 
                mdi mdi-printer
        </v-icon>
        הדפס
    </button>
    <download-excel 
    worksheet="אוסף דוחות"
    :data="filteredDrives"
    :fields="fields"
    name="אוסף דוחות.xls"
    :header="[modalText, dates]"
    class="excel-btn">
    <v-icon> mdi mdi-microsoft-excel</v-icon>
        ייצא לאקסל
    </download-excel>

    <button @click="backHandler" class="return-btn"> 
        <v-icon> 
                mdi mdi-window-close
        </v-icon>
        חזור
    </button>
     </div>

 </dialog>



  <h4 class="main-title"> טופס שילוח משימה</h4>
 <h6 class="sub-title"> הדפסת דוחות</h6>
<div class="password-container" v-if="!isAuthenticated">
  <v-text-field  type="password" :error="isError" @input="checkIfZeroLength" :placeholder=" isError  ?'סיסמא לא נכונה' :'הכנס סיסמא'" v-model="passValue"> </v-text-field>
  <button class="check-password-button" @click="checkPassword"> בדוק סיסמא</button>
 
  </div>
    <div class="text-center ">
  <div  v-if="isAuthenticated && !chosenFilterType"   class="sorting-options"> 
        <button @click="filterType = 'driver'"> מיין לפי נהג</button>
        <button @click="filterType = 'car'"> מיין לפי רכב</button>
        </div> 

    </div>
    <div class="filter-container" v-if="filterType == 'driver'"> 
         

            <div class="drivers-select-container"> 
            <q-input filled dark  placeholder="סנן לפי נהג" v-model="driverModel" hide-bottom-space no-error-icon  :error="false" />
        </div>

 <q-input filled dark    hide-bottom-space no-error-icon placeholder="כל התאריכים" :error="false" :model-value="!dateModel.from? '':`${`${dateModel.to.split('/')[2]}/${dateModel.to.split('/')[1]}/${dateModel.to.split('/')[0]}`} - ${`${dateModel.from.split('/')[2]}/${dateModel.from.split('/')[1]}/${dateModel.from.split('/')[0]}`}` " readonly   ref="timeRef" name="tidruh-time"   :rules="['timeOrFulltime']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date minimal @range-end="copy"  v-model="dateModel" range   >

                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="סגור" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
                  <button v-if="driverModel" @click="filterAndNavigate"><v-icon> mdi mdi-printer</v-icon>  הדפס</button>


    </div>
    <div class="filter-container" v-if="filterType == 'car'">
                    <v-select
                 required
                 
                 ref="select"
                 v-model="carValue"
  
          :items="cars"
 label='סוג הרכב + מס צ'          
 name="car" 
          append-inner-icon="mdi-car"

        ></v-select>
             <q-input filled dark    hide-bottom-space no-error-icon placeholder="כל התאריכים" :error="false" :model-value="!dateModel.from? '':`${`${dateModel.to.split('/')[2]}/${dateModel.to.split('/')[1]}/${dateModel.to.split('/')[0]}`} - ${`${dateModel.from.split('/')[2]}/${dateModel.from.split('/')[1]}/${dateModel.from.split('/')[0]}`}` " readonly   ref="timeRef" name="tidruh-time"   :rules="['timeOrFulltime']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date minimal @range-end="copy"  v-model="dateModel" range   >

                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="סגור" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <button v-if="carValue" @click="filterAndNavigate"><v-icon> mdi mdi-printer</v-icon>  הדפס</button>
      <!-- <router-link :to="{name:'/final-print-view',params:{reports:JSON.stringify(drivesSortedObject)} }" > </router-link> -->
         </div>

 
</template>

<script>
import moment from "moment"
import axios from "axios"
export default {
    data(){
        return{
            fields:{
                "תאריך":'date',
                "שם מפקד משלח משימה":'mefaked-meshaleh-mesima',
                'מ"א מפקד משלח משימה':'mefaked-meshaleh-mesima-num',
                "שם מפקד משימה":'mefaked-mesima',
                'מ"א מפקד משימה':'mefaked-mesima-num',
                "שם נהג":'driver',
                'מ"א נהג':'driver-num',
                'שעת תדרוך':'tidruh-time',
                'נוסע 1':'nosea1',
                'נוסע 1 מ"א':'nosea1-num',
                'נוסע 2':'nosea2',
                'נוסע 2 מ"א':'nosea2-num',
                'נוסע 3':'nosea3',
                'נוסע 3 מ"א':'nosea3-num',
                'נוסע 4':'nosea4',
                'נוסע 4 מ"א':'nosea4-num',
                 'נוסע 5':'nosea5',
                'נוסע 5 מ"א':'nosea5-num',
                'תיאור':'description',
                'רכב':'car',
                'האם ישן שמונה שעות לפני נסיעה':'is-sleep',
                'האם יש רישיון':'is-licensed',
                'האם נהג בדרך זו בעבר':'is-drove-before',
                'יעד':'destination',
                'סכנות':'dangers',
                'עצירה 1':'stop1',
                'עצירה 2':'stop2',
                'עצירה 3':'stop3',
                'איש קשר 1':'contact1',
                'טלפון איש קשר 1':'contact1-num',
                'האם תודרך':'is-tudrah',
                'האם כרטיס נהיגה בתוקף':'is-card' 


                
            },
            filteredDrives:[],
            modalText:'', 
            dates:'',
            driverModel:"",
            filterType:"",
            dateModel:{from:"",to:""},
                carValue:'',
            chosenFilterType:false,
              startingDate:"",
            endingDate:"",
                 cars:['קנגו - צ`265465','קנגו- צ`265445','סוואנה - צ`297616','טיוטה - צ`197807','קולורדו - צ`187099','קולורדו - צ`187088','אופל - צ`153847'],

            passValue:"",
            isError:false,
                        spinnerStarter: false,
            isFinished:false,
            isAuthenticated:false,

             url:"/.netlify/functions/fetch_all",
            drivesSortedObject:""
        }
    },
methods:{
    printHandler(){
        this.$refs.dialog.close()
     setTimeout(()=>{
                        sessionStorage.setItem('reports',JSON.stringify(this.filteredDrives))
                        this.$router.push("/print-final-view")
                },1000)
    },
    backHandler(){
        this.$refs.dialog.close()
        this.filteredDrives = [] 
         this.carValue = ''
        this.dateModel =  {from:"",to:""}
    },
   dateCheck(from,to,check) {

    var fDate,lDate,cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if((cDate <= lDate && cDate >= fDate)) {
        return true;
    }
    return false;
},


     async filterAndNavigate(){
        if(this.filterType == 'car'){
        this.filteredDrives = this.handleRangeAndCarFilter(this.dateModel)
              if(this.dateModel.from  && this.dateModel.to){
                    this.dates = `${this.dateModel.to.split('/')[2]}/${this.dateModel.to.split('/')[1]}/${this.dateModel.to.split('/')[0]} - ${this.dateModel.from.split('/')[2]}/${this.dateModel.from.split('/')[1]}/${this.dateModel.from.split('/')[0]} `
              }else{
                    this.dates = 'כל התאריכים'
              }
               this.modalText   =  ` נמצאו ${this.filteredDrives.length} דוחות 
                ברכב ${this.carValue}`

            this.$refs.dialog.show()
          this.$refs.dialog.classList.add("ani-class")
              
        }else if (this.filterType =='driver'){
            this.filteredDrives = this.handleRangeAndDriverFilter(this.dateModel)
          
              if(this.dateModel.from  && this.dateModel.to){
                    this.dates  = `${this.dateModel.to.split('/')[2]}/${this.dateModel.to.split('/')[1]}/${this.dateModel.to.split('/')[0]} - ${this.dateModel.from.split('/')[2]}/${this.dateModel.from.split('/')[1]}/${this.dateModel.from.split('/')[0]} `
              }else{
                    this.dates = 'כל התאריכים'
              }
            this.modalText =` נמצאו ${this.filteredDrives.length} דוחות 
                 של הנהג ${this.driverModel}`
          
                 this.$refs.dialog.show()
          this.$refs.dialog.classList.add("ani-class")
       
   
        }
    },
     handleRangeAndDriverFilter(object){
            console.log(object)
            if(object.from  && object.to){
            const fromArr = object.from.split('/')
                        const toArr = object.to.split('/')

          this.startingDate =  new Date(`${fromArr[1]}/${fromArr[2]}/${fromArr[0]}`)
          this.endingDate =  new Date(`${toArr[1]}/${toArr[2]}/${toArr[0]}`)
     
            
       
   return [...this.drivesData.filter((car)=>{
                let stru = car.date.split(' ')[ car.date.split(' ').length-1]
                stru =  new Date(`${stru.split('/')[1]}/${stru.split('/')[0]}/${stru.split('/')[2]}`)
                return this.dateCheck(this.startingDate,this.endingDate,stru) && car.driver.includes(this.driverModel)
            })]
            }
            return [...this.drivesData.filter((driver)=>{return driver.driver.includes(this.driverModel)})]
        },
     handleRangeAndCarFilter(object){
            console.log(object)
            if(object.from  && object.to){
            const fromArr = object.from.split('/')
                        const toArr = object.to.split('/')

          this.startingDate =  new Date(`${fromArr[1]}/${fromArr[2]}/${fromArr[0]}`)
          this.endingDate =  new Date(`${toArr[1]}/${toArr[2]}/${toArr[0]}`)
     
            
       
                        return [... this.drivesSortedObject[this.carValue].filter((car)=>{
                let stru = car.date.split(' ')[ car.date.split(' ').length-1]
                stru =  new Date(`${stru.split('/')[1]}/${stru.split('/')[0]}/${stru.split('/')[2]}`)
                return this.dateCheck(this.startingDate,this.endingDate,stru)
            })]

            }
          
            return [...this.drivesSortedObject[this.carValue]]
        },
     checkIfZeroLength(){
          
                this.isError = false
            
        },
          checkPassword(){
            if(this.passValue == '0549936883'){
                this.isAuthenticated = true;
                sessionStorage.setItem('isAuthenticated',JSON.stringify(true))
                this.getDrivesData()
                
            }else{
                this.isError = true
            }
        },
       async  getDrivesData(){

            const drivesResponse = await axios.get(this.url);
            this.drivesData = drivesResponse.data
            this.drivesSortedObject ={};
            this.drivesData.forEach((drive)=>{
                drive.date = moment(new Date(drive.date),'L', 'he').format("יום dddd  D/M/y")
                if(this.drivesSortedObject.hasOwnProperty(drive.car)){
                     this.drivesSortedObject[drive.car].push(drive)
                }else{
                     this.drivesSortedObject[drive.car] = []
                    this.drivesSortedObject[drive.car].push(drive)

                }
         
            })
            console.log( this.drivesSortedObject)

        },
}
}
</script>

<style scoped>
.excel-btn{
    cursor: pointer;
          background-color: green;
    color: white;
    padding: 0.5em 1em;
    border-radius: 20px;
}
.print-btn{
      background-color: rgb(13,110,253);
    color: white;
    padding: 0.5em 1em;
    border-radius: 20px;
}
.return-btn{
    background-color: red;
    color: white;
    padding: 0.5em 1em;
    border-radius: 20px;
}
.action-btn-flex{
    display: flex;
    flex-direction: row;
    width: 100px;
    width: 80%;
    margin: 0 auto;
    justify-content: space-evenly;
}
.ani-class{
  animation: zoom 0.3s ease-in-out forwards;
  
}
@keyframes zoom{
  0%{
    opacity: 0;
    transform:translate(-50%,-50%) scale(0.8) ;
  }
  100%{
    opacity: 1;
    transform: translate(-50%,-50%)  scale(1);
  }
  
}
dialog img{
    width: 90%;
    height: 65%;
}
dialog h5{
  text-align: center;
  color: grey;
  font-size: 1rem;
}
dialog{
  opacity: 0;
  text-align: center;
  width: 500px;
  position: fixed;
  top: 50%;
  z-index: 100;
  height: 50%;
  border: none;
  border-radius: 20px;
  left: 50%;
  transform: translate(-50%,-50%) scale(0.8);
}
dialog::backdrop {
  background: rgba(0,0,0,1);
}


.drivers-select-container{
    margin-bottom: 10px;
    direction: rtl !important;
}
.filter-container{
    direction: rtl;
    color: white;
    width:80%;
    margin: 0 auto;
}
.sorting-options button{
    font-size: 1rem;
    background:grey;
    border-radius: 20px;
    padding: 0.5em 1em;
}
.sorting-options button:hover{
    font-size: 1rem;
    background:rgb(175, 174, 174);
    border-radius: 20px;
    padding: 0.5em 1em;
}

.sorting-options{
      direction: rtl;
      color: white;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    width: 80%;
    margin: 0 auto;
    display: flex;
}

.password-container{
    color: white;
    text-align: center;
    direction: rtl;
    width: 80%;
    margin: 0 auto;
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
.check-password-button{
  color:white;
  display: inline-block;
  background-color: rgba(128, 128, 128, 0.753);
  border-radius: 20px;
  padding:0.5em 1em;
  text-decoration:none;
}

</style>