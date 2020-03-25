<template>
  <div style="padding:200px 0 0 300px;">
    <zh-popover placement="top" width="200" trigger="click" title="标题" content="这是一个弹框">
      <div>这是一个弹框，弹框，弹框，弹框</div>
      <zh-button slot="reference">click 激活</zh-button>
    </zh-popover>
    <zh-popover placement="bottom" width="200" trigger="click" title="标题" content="这是一个弹框">
      <div>这123123弹框</div>
      <zh-button slot="reference">click 激活</zh-button>
    </zh-popover>
    <zh-popover placement="left" width="200" trigger="click" title="标题" content="这是一个弹框">
      <div>这123123弹框</div>
      <zh-button slot="reference">click 激活</zh-button>
    </zh-popover>
    <zh-popover placement="right" width="200" trigger="click" title="标题" content="这是一个弹框">
      <div>这123123弹框</div>
      <zh-button slot="reference">click 激活</zh-button>
    </zh-popover>
  </div>
  <!-- <div>
    <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <li v-for="i in count" class="infinite-list-item" :key="i">{{ i }}</li>
    </ul>
  </div>-->
  <!--
      <zh-popover
        placement="to-start"
        title="标题"
        width="200"
        tigger="hover"
        content="这是一段内容"
      >
        <zh-button slot="reference">hover 激活</zh-button>
      </zh-popover>
  -->
  <!--
      {{value}}  
       <zh-date-picker v-model="value"></zh-date-picker>


      {{value1}}
       <br>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
      disabled: false
    };
  },
  methods: {
    load() {
      this.count += 2;
      // if (this.count == 30) {
      //   this.disabled = true;
      // }
    }
  }
};
</script>

<style lang="scss">
.infinite-list {
  height: 300px;
  width: 400px;
  border: 1px springgreen solid;
}
.infinite-list-item {
  border: 1px solid blue;
  background: red;
}
</style>