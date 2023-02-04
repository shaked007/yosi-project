<template>
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
        const item = this.handleRangeAndCarFilter(this.dateModel)
         let dates ;
              if(this.dateModel.from  && this.dateModel.to){
                    dates = `${this.dateModel.to.split('/')[2]}/${this.dateModel.to.split('/')[1]}/${this.dateModel.to.split('/')[0]} - ${this.dateModel.from.split('/')[2]}/${this.dateModel.from.split('/')[1]}/${this.dateModel.from.split('/')[0]} `
              }else{
                    dates= 'כל התאריכים'
              }
              
         const response = await this.$swal({
                icon:"info",
                title:'כמות הדוחות',
                text:`  נמצאו ${item.length} דוחות 
                עם הרכב ${this.carValue}
                בין התאריכים : 
                  ${dates}` 
                 ,  
                 confirmButtonText:'הדפס',
                 showCancelButton:true,
                 cancelButtonText:'חזור'
                 })
                if (response.isConfirmed){
                             this.$swal.close()
                        this.$swal.closeModal()
                        setTimeout(()=>{
                        sessionStorage.setItem('reports',JSON.stringify(item))
                        this.$router.push("/print-final-view")
                },1000)
            }else{
                this.carValue = ''
                this.dateModel =  {from:"",to:""}
            }
        }else if (this.filterType =='driver'){
            const item = this.handleRangeAndDriverFilter(this.dateModel)
            let dates ;
              if(this.dateModel.from  && this.dateModel.to){
                    dates = `${this.dateModel.to.split('/')[2]}/${this.dateModel.to.split('/')[1]}/${this.dateModel.to.split('/')[0]} - ${this.dateModel.from.split('/')[2]}/${this.dateModel.from.split('/')[1]}/${this.dateModel.from.split('/')[0]} `
              }else{
                    dates= 'כל התאריכים'
              }
           const response = await this.$swal({
                icon:"info",
                title:'כמות הדוחות',
                text:` נמצאו ${item.length} דוחות 
                של הנהג ${this.driverModel}
                 בין התאריכים : 
                ${dates}` 
              ,  
                   confirmButtonText:'הדפס',
                 showCancelButton:true,
                 cancelButtonText:'חזור'
            })
            if (response.isConfirmed){
                this.$swal.close()
                this.$swal.closeModal()
                setTimeout(()=>{
                    sessionStorage.setItem('reports',JSON.stringify(item))
                    this.$router.push("/print-final-view")
                },1000)
        
            }else{
                this.driverModel = ''
                this.dateModel =  {from:"",to:""}
            }
   
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