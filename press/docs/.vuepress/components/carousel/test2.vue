<template>
  <div class="block">
    <zh-carousel height="150px" arrow="always">
      <zh-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </zh-carousel-item>
    </zh-carousel>
  </div>
</template>

<style>
  .zh-carousel h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .zh-carousel-item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .zh-carousel-item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>