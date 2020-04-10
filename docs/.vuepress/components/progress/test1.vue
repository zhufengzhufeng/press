<template>
    <div>
        <zh-progress :percentage="50" color="#409EFF"></zh-progress>
        <zh-progress :percentage="50" :strokeWidth="10" color="#67C23A"></zh-progress>
        <zh-progress :percentage="50" color="#E6A23C"></zh-progress>
        <zh-progress :percentage="100" :format="formatFunc" color="#F56C6C"></zh-progress>
    </div>
</template>

<script>
export default {
    methods: {
      formatFunc(percentage){
        return percentage === 100 ? '满' : `${percentage}%`;
      }
    }
}
</script>