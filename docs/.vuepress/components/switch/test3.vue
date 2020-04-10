<template>
  <div>
    <zh-switch v-model="value1" disabled></zh-switch>
    <zh-switch v-model="value2" disabled></zh-switch>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: true,
      value2: false
    };
  }
};
</script>