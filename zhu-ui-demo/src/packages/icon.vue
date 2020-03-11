<template>
  <svg class="zh-icon" aria-hidden="true" @click="$emit('click')">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>
<script>
export default {
  props: {
    icon: String
  },
  mounted(){
      import ("@/styles/icon.js")
  },
  name: "zh-icon"
};
</script>
<style lang="scss">
.zh-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
</style>