<template>
<h4 class="main-title"> דוח נסיעה</h4>
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
            <v-carousel-item  :value="car" v-for="car in cars" :key="car">
               <h3 class="cars"> {{car}} </h3>
                <table> 
                    <thead>
                        <tr>
                              <th> דוח</th>
                            <th>נהג</th>
                            <th> תאריך </th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-for="drive in drivesSortedObject[car]" :key="drive">
                            <td> <router-link class="link-to-report" :name="drive.id" :to="'/reports/'+drive['_id']"> לצפייה בדוח </router-link></td>
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
import axios from "axios"
import moment from "moment"
export default {
    data(){
        return{
            spinnerStarter: false,
                 drivesData:[],
                 url:"http://localhost:3000/reports",
                                  url:"/.netlify/functions/fetch_all",

            isError:false,
            slide:'קנגו - צ`265465',
            cars:['קנגו - צ`265465','קנגו- צ`265445','סוואנה - צ`297616','טיוטה - צ`197807','קולורדו - צ`187099','קולורדו - צ`187088','אופל - צ`153847'],
            isAuthenticated:false,
            placeholder:"הכנס סיסמא",
            passValue:"",
            isFinished:false
        }
    },
    methods:{
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
            this.isFinished = true

        },
        checkIfZeroLength(){
          
                this.isError = false
            
        },
         checkPassword(){
            if(this.passValue == 'Aa123456'){
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
.link-to-report{
    display: inline-block;
    padding: 4px 10px;
    background-color: rgba(0, 0, 0, 0.753);
    color: white;
    text-decoration: none;
    border-radius: 20px;
}
table th, table td{ /* Added padding for better layout after collapsing */
    padding: 4px 8px;
}
table{
    width:80%;
        border-collapse: collapse;
    table-layout: fixed;
    text-align: center;
    margin: 0 auto;
    color: white;
}
table thead tr th{
    font-size: 1.2rem;
    border-bottom: 1px solid white;
}
table tbody tr td{
    font-size: 0.9rem;
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