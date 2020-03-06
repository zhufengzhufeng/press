<template>
    <div>
      <zh-input v-model="value" placeholder="编辑"  suffix-icon="edit"></zh-input>
      <zh-input v-model="value" placeholder="编辑"  prefix-icon="edit"></zh-input>
    </div>
</template>

<script>
export default {
    data(){
        return {value:''}
    }
}
</script>