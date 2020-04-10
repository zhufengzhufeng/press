<template>
  <div>
    <zh-row :gutter="20">
      <zh-col :span="16">
        <div class="grid-content bg-purple"></div>
      </zh-col>
      <zh-col :span="8">
        <div class="grid-content bg-purple"></div>
      </zh-col>
    </zh-row>
    <zh-row :gutter="20">
      <zh-col :span="8">
        <div class="grid-content bg-purple"></div>
      </zh-col>
      <zh-col :span="8">
        <div class="grid-content bg-purple"></div>
      </zh-col>
      <zh-col :span="4">
        <div class="grid-content bg-purple"></div>
      </zh-col>
      <zh-col :span="4">
        <div class="grid-content bg-purple"></div>
      </zh-col>
    </zh-row>
    <zh-row :gutter="20">
      <zh-col :span="4">
        <div class="grid-content bg-purple"></div>
      </zh-col>
      <zh-col :span="16">
        <div class="grid-content bg-purple"></div>
      </zh-col>
      <zh-col :span="4">
        <div class="grid-content bg-purple"></div>
      </zh-col>
    </zh-row>
  </div>
</template>

<style lang="scss" scoped>
  .zh-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .zh-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>