<template>
<h4 class="main-title"> דוח נסיעה</h4>
 <h6 class="sub-title"> היסטוריית דוחות</h6>
<div class="password-container">
  <v-text-field  type="password" :error="isError" @input="checkIfZeroLength" :placeholder=" isError  ?'סיסמא לא נכונה' :'הכנס סיסמא'" v-model="passValue"> </v-text-field>
  <button class="check-password-button" @click="checkPassword"> בדוק סיסמא</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            isError:false,
            placeholder:"הכנס סיסמא",
            passValue:"",
        }
    },
    methods:{
        checkIfZeroLength(){
          
                this.isError = false
            
        },
        checkPassword(){
            if(this.passValue == 'Aa123456'){

            }else{
                this.isError = true
            }
        }
    }

}
</script>

<style scoped>
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