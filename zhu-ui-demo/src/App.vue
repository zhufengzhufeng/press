<template>
<div style="margin: 100px 0 800px">
    <zh-progress :percentage="50" color="#409EFF"></zh-progress>
    <zh-progress :percentage="50" :strokeWidth="10" color="#67C23A"></zh-progress>
    <zh-progress :percentage="50" color="#E6A23C"></zh-progress>
    <zh-progress :percentage="100" :format="formatFunc" color="#F56C6C"></zh-progress>
    <zh-popover
      placement="right"
      width = "200px"
      title="标题"
      content="这是弹框"
      trigger="click"
      v-model="value1"
    >
      <zh-button slot="reference">点击弹框</zh-button>
    </zh-popover>

     <zh-popover
      placement="top"
      width = "200px"
      title="标题"
      content="这是弹框"
      trigger="hover"
       v-model="value2"
    >
      <zh-button slot="reference">点击弹框</zh-button>
    </zh-popover>

      <zh-popover
      placement="right"
      width = "200px"
      title="标题"
      content="这是弹框"
      trigger="hover"
       v-model="value3"
    >
      <zh-button slot="reference">点击弹框</zh-button>
    </zh-popover>

     <zh-popover
      width = "200px"
      title="标题"
      content="这是弹框"
      trigger="hover"
       v-model="value4"
    >
      <zh-button slot="reference">点击弹框</zh-button>
    </zh-popover>


      <zh-popover
      placement="left"
      width = "200px"
      title="标题"
      content="这是弹框"
      trigger="hover"
       v-model="value5"
    >
      <zh-button slot="reference">点击弹框</zh-button>
    </zh-popover>
   
</div>
  
</template>

<script>
export default {
    data(){
      return {value1:true,value2:false,value3:false,value4:false,value5:false}
    },
    methods: {
      formatFunc(percentage){
        return percentage === 100 ? '满' : `${percentage}%`;
      }
    }
}
</script>