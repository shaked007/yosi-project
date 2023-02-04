<template>
  <ReportViewWithProps v-for="(report,index) in reports" :reportProp="report" :key="index" />
</template>

<script>
import ReportViewWithProps from "@/components/ReportViewWithProps.vue"
export default {
    data(){
        return{
            reports:'',
        }
    },
    beforeMount(){
       this.reports = JSON.parse(sessionStorage.getItem('reports'))
       console.log(this.reports)
    },
    mounted(){
        window.print()

    },
    components:{
        ReportViewWithProps
    },
}
</script>

<style>

</style>