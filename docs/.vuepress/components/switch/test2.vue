<template>
   
  <div>
     {{value}}
     <zh-switch
    v-model="value"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-value="100"
    inactive-value="0">
  </zh-switch>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '100'
      }
    }
  };
</script>