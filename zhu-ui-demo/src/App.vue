<template>
   <div>
     
      <zh-input v-model="value"  suffix-icon="edit"></zh-input>
      <zh-input v-model="value"  prefix-icon="edit"></zh-input>
   </div>
</template>


<script>
export default {

   data(){
      return {value:100}
   }
}
</script>
