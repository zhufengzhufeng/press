<template>
  <div>
    <zh-row>
      <zh-col>
        <div class="grid-content bg-purple-dark"></div>
      </zh-col>
    </zh-row>
    <zh-row>
      <zh-col :span="12">
        <div class="grid-content bg-purple"></div>
      </zh-col>
      <zh-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </zh-col>
    </zh-row>
    <zh-row>
      <zh-col :span="8">
        <div class="grid-content bg-purple"></div>
      </zh-col>
      <zh-col :span="8">
        <div class="grid-content bg-purple-light"></div>
      </zh-col>
      <zh-col :span="8">
        <div class="grid-content bg-purple"></div>
      </zh-col>
    </zh-row>
    <zh-row>
      <zh-col :span="6">
        <div class="grid-content bg-purple"></div>
      </zh-col>
      <zh-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </zh-col>
      <zh-col :span="6">
        <div class="grid-content bg-purple"></div>
      </zh-col>
      <zh-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </zh-col>
    </zh-row>
    <zh-row>
      <zh-col :span="4">
        <div class="grid-content bg-purple"></div>
      </zh-col>
      <zh-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </zh-col>
      <zh-col :span="4">
        <div class="grid-content bg-purple"></div>
      </zh-col>
      <zh-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </zh-col>
      <zh-col :span="4">
        <div class="grid-content bg-purple"></div>
      </zh-col>
      <zh-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </zh-col>
    </zh-row>
  </div>
</template>
<style lang="scss" scoped>
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
  margin-bottom: 20px
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>