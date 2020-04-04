<template>
  <div id="app" style="width:300px; margin:0 auto">
    <zh-carousel
      height="200px"
      :autoplay="true"
      :delay="3000"
      :initial-index="2"
      :loop="false"
      @change="change"
    >
      <zh-carousel-item name="box1">
        <div class="content" style="background:red">内容1</div>
      </zh-carousel-item>
      <zh-carousel-item name="box2">
        <div class="content" style="background:blue">内容2</div>
      </zh-carousel-item>
      <zh-carousel-item name="box3">
        <div class="content" style="background:green">内容3</div>
      </zh-carousel-item>
    </zh-carousel>
  </div>
</template>
<script>
export default {
  methods: {
    change(index) {
      console.log(index);
    }
  }
};
</script>
<style lang="scss">
.content {
  width: 100%;
  height: 100%;
}
</style>