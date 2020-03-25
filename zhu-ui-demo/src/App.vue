<template>
    <div style="margin:10px;">
      {{value}}  
       <zh-date-picker v-model="value"></zh-date-picker>


      {{value1}}
       <br>
       <zh-date-range-picker v-model="value1" ></zh-date-range-picker>
    </div>
</template>
<script>
export default {
   data(){
     return {
       value: '',
       value1:[]
     }
   }
}
</script>