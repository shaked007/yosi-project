<template>
<h4 class="main-title"> טופס שילוח משימה</h4>
 <h6 class="sub-title"> היסטוריית דוחות</h6>
<div class="password-container" v-if="!isAuthenticated">
  <v-text-field  type="password" :error="isError" @input="checkIfZeroLength" :placeholder=" isError  ?'סיסמא לא נכונה' :'הכנס סיסמא'" v-model="passValue"> </v-text-field>
  <button class="check-password-button" @click="checkPassword"> בדוק סיסמא</button>
 
  </div>
    <div class="text-center">

    <v-progress-circular v-if="!isFinished && spinnerStarter"
      indeterminate
      color="white"
      size="60"
    ></v-progress-circular>
    </div>
  <div class="carousel-container" v-if="isAuthenticated && isFinished">  

        <v-carousel height="80vh" light hide-delimiters v-model="slide">
            <v-carousel-item  :value="car.carName" v-for="car in cars" :key="car.key">
               <h3 class="cars"> {{car.carName}} </h3>
               <div class="filter-btn">
                        <button class="revert-filter-btn"  @click="revertFilter(car)"> רענן <v-icon> mdi-refresh-circle</v-icon> </button>

                            <button class="revert-filter-btn" v-if="!isFiltering" @click="isFiltering=true"> סנן</button>
</div>
               <div class="filters-container" v-if="isFiltering">
                   <q-input filled dark    hide-bottom-space no-error-icon  :error="false" :model-value="!car.dateModel.from? 'כל התאריכים':`${`${car.dateModel.to.split('/')[2]}/${car.dateModel.to.split('/')[1]}/${car.dateModel.to.split('/')[0]}`} - ${`${car.dateModel.from.split('/')[2]}/${car.dateModel.from.split('/')[1]}/${car.dateModel.from.split('/')[0]}`}` " readonly   ref="timeRef" name="tidruh-time" placeholder="בחר תאריכים"  :rules="['timeOrFulltime']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date @range-end="handleRange" v-model="car.dateModel" range   >

                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="סגור" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div class="drivers-select-container"> 
           <q-select
          @update:model-value="handleDriver"
     
                 class="bg-class"
                 ref="select" filled dark
                 v-model="car.driverModel"
                
          :options="drivers"
 name="car" 

        />
        </div>
        <button class="revert-filter-btn"  @click="revertFilter(car)"> בטל סינון</button>
        
      </div>
                <table> 
                    <thead>
                        <tr>
                                   <th >מחיקה </th>
                              <th> דוח</th>
                            <th>נהג</th>
                            <th> תאריך </th>
                                                     

                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-for="(drive,index) in drivesSortedObject[car.carName]" :key="drive['_id']">
                                                            <td ><button class="link-to-report" @click="deleteRecord(drive,index,drivesSortedObject[car.carName],car)"> מחק </button></td>

                            <td> <router-link class="link-to-report" :name="drive.id" :to="'/reports/'+drive['_id']">לצפייה </router-link></td>
                            <td>{{drive['driver']}} </td>
                            <td>{{drive.date}} </td>
                             </tr>
                    </tbody>
                                    </table>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
import hebrew from "@/assets/hebrew"
import axios from "axios"
import moment from "moment"
export default {
    data(){
        return{
             currentUrl:"/.netlify/functions/delete_report",
            drivers:["אולג","כל הנהגים"],
            startingDate:"",
            endingDate:"",
            isFiltering:false,
            driverFilter:"",
            backupReports:[],
            spinnerStarter: false,
                 drivesData:[],
                 url:"http://localhost:3000/reports",
                                  url:"/.netlify/functions/fetch_all",

            isError:false,
            slide:'קנגו - צ`265465',
            cars:[{key:'קנגו - צ`265465',carName:'קנגו - צ`265465',driverModel:"כל הנהגים",dateModel:{from:"",to:""}}
            ,{key:'קנגו- צ`265445',carName:'קנגו- צ`265445',driverModel:"כל הנהגים",dateModel:{from:"",to:""}},
            {key:'סוואנה - צ`297616',carName:'סוואנה - צ`297616',driverModel:"כל הנהגים",dateModel:{from:"",to:""}},
            {key:'טיוטה - צ`197807',carName:'טיוטה - צ`197807',driverModel:"כל הנהגים",dateModel:{from:"",to:""}},
            {key:'קולורדו - צ`187099',carName:'קולורדו - צ`187099',driverModel:"כל הנהגים",dateModel:{from:"",to:""}},
            {key:'קולורדו - צ`187088',carName:'קולורדו - צ`187088',driverModel:"כל הנהגים",dateModel:{from:"",to:""}},
            {key:'אופל - צ`153847',carName:'אופל - צ`153847',driverModel:"כל הנהגים",dateModel:{from:"",to:""}}],
            // cars:['קנגו - צ`265465','קנגו- צ`265445','סוואנה - צ`297616','טיוטה - צ`197807','קולורדו - צ`187099','קולורדו - צ`187088','אופל - צ`153847'],
            isAuthenticated:false,
            placeholder:"הכנס סיסמא",
            passValue:"",
            isFinished:false
        }
    },
    beforeMount(){
        if(sessionStorage.getItem('isAuthenticated') =='true'){
            this.isAuthenticated = true
            this.getDrivesData()
        }else{
            this.isAuthenticated = false
        }
    },
    methods:{
       async  deleteRecord(drive,index,arr,car){
        const swalAction = await this.$swal({icon:'warning',showCancelButton:true,showConfirmButton:true,confirmButtonText:'מחק',cancelButtonText:'חזור',title:':האם את בטוח שאתה רוצה למחוק את ',text:`דוח שבוצע בתאריך ${drive.date} ברכב ${this.slide}`,width:'300px',height:'300px'})
        if(swalAction.isConfirmed){
         const res  = await axios.post(this.currentUrl,JSON.stringify({'_id':drive['_id']}))
         if (res.status == 200){
            this.$swal({icon:'success',text:'הפריט נמחק בהצלחה'})
            this.getDrivesData()
            arr.splice(index,1)
            arr= arr.filter((filterDriver)=>{
                return drive['_id'] !== filterDriver['_id']
            })
            // var backup  = this.slide;
            // this.slide = ''
            // this.slide = backup
            // var keyBackup =   this.cars[key]['key'] 
            // this.cars[key]['key']  = ''
            // this.cars[key]['key'] = keyBackup
            // key[key] = key[key] +1;
            // key[key] = key[key] -1
           this.$router.push('/')
            this.$forceUpdate()
            this.$emit('',car)
         }
        }

        },
        handleDriver(val){
            if(val != 'כל הנהגים'){
             this.drivesSortedObject[this.slide] =   this.drivesSortedObject[this.slide].filter((car)=>{
              
                return  val==car.driver
            })}
        },
        
        revertFilter(car){
            if(car){
            this.cars.forEach((carObject)=>{
                console.log(carObject.carName,car.carName)
                if (carObject.carName == car.carName){
                    carObject.driverModel = "כל הנהגים";
                    carObject.dateModel = {from:"",to:""};
                    try{
                    this.drivesSortedObject[car.carName] = [...this.backupReports[car.carName]]
                    }
                    catch{}
                }
            })

            }
                                            this.isFiltering = false

        },
    dateCheck(from,to,check) {
    console.log(from)
    console.log(to)
    console.log(check)
    var fDate,lDate,cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if((cDate <= lDate && cDate >= fDate)) {
        return true;
    }
    return false;
},


      async  getDrivesData(){
                    this.spinnerStarter = true;

            const drivesResponse = await axios.get(this.url);
            console.log(drivesResponse)
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
            this.backupReports = {...this.drivesSortedObject}
            this.isFinished = true

        },
        checkIfZeroLength(){
          
                this.isError = false
            
        },
      
        handleRange(object){
            
          this.startingDate =  new Date(`${object.from['month']}/${object.from['day']}/${object.from['year']}`)
          this.endingDate =  new Date(`${object.to['month']}/${object.to['day']}/${object.to['year']}`)
            const backupTo = object.to['year'];
            const backupFrom = object.from['year'];
            object.to['year'] = object.to['day'];
            object.to['day'] = backupTo
          object.from['year'] = object.from['day'];
            object.from['day'] = backupFrom
            console.log(object)
            
            this.drivesSortedObject[this.slide] =   this.drivesSortedObject[this.slide].filter((car)=>{
                let stru = car.date.split(' ')[ car.date.split(' ').length-1]
                stru =  new Date(`${stru.split('/')[1]}/${stru.split('/')[0]}/${stru.split('/')[2]}`)
                return this.dateCheck(this.startingDate,this.endingDate,stru)
            })
        
        },
         checkPassword(){
            if(this.passValue == '0549936883'){
                this.isAuthenticated = true;
                sessionStorage.setItem('isAuthenticated',JSON.stringify(true))
                this.getDrivesData()
                
            }else{
                this.isError = true
            }
        }
    }

}
</script>

<style scoped>
.filter-btn{
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    font-size: 1.2rem;
    
}
.revert-filter-btn{
       display: inline-block;
    padding: 0.5em 1em;
    background-color: rgba(0, 0, 0, 0.753);
    color: white;
    text-decoration: none;
    border-radius: 20px;
}
.bg-class {
    background: rgb(255,255,255,0.07)  !important;
    color: #fff;
}
.drivers-select-container{
    /* direction: rtl; */
}
.q-date__range-to{
    border-radius: 50%;
}
.q-field--filled .q-field__control:after{
    height: 0px !important;
}


.filters-container{
    text-align: center;
    direction: rtl;
    width: 80%;
    margin:0 auto;
}
.link-to-report{
    display: inline-block;
    font-size: 0.8rem;
    padding: 0.5em 1em;
    background-color: rgba(34, 41, 38, 0.63);
    color: white;
    text-decoration: none;
    border-radius: 20px;
}
table th, table td{ /* Added padding for better layout after collapsing */
    padding: 4px 8px;
}
table{
    width:320px;
        border-collapse: collapse;
    table-layout: fixed;
    text-align: center;
    margin: 0 auto;
    color: white;
}
table thead{
    width: 320px;
}
table tbody{
    display: block;
    width: 320px;
    overflow: auto;
    height: 450px;
}
table tbody tr{
    width: 320px;
}
table thead tr{
        width:320px;

    text-align: right;
    display:block;
}
table thead tr th{
    width: 80px;
    text-align: center;
    font-size: 1.2rem;
    border-bottom: 1px solid white;
}
table tbody tr td{
    width: 80px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.747);
}
.carousel-container{
    height: 80vh;
}
.v-btn--variant-elevated {
    background:  transparent !important;
    color: white !important;
}
.cars{
    text-align: center;
       font-size: 1.3rem;
        color: white;
}
.btn-class{
    flex-wrap: wrap;
    font-size: 0.8rem;
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