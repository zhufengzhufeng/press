<template>
    <aside class="zh-aside" :style="{width}"><slot></slot></aside>
</template>

<script>
export default {
    name:'zh-aside',
    props:{
        width:String
    }
}
</script>

<style lang="scss">
aside{
    display: block;
}
</style>