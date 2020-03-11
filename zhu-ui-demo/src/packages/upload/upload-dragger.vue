<template>
  <div
    class="zhu-upload-dragger"
    @drop.prevent="onDrop"
    @dragover.prevent
    @dragleave.prevent
  >
    <zh-icon icon="shangchuan" class="icon"></zh-icon>
    <div class="zhu-upload__text">
      将文件拖到此处，或
      <em>点击上传</em>
    </div>
  </div>
</template>

<script>
export default {
  
  props:{
      accept:String
  },
  methods: {
    onDrop(e) {
        console.log('drop')
      const accept = this.accept;
      if (!accept) {
        this.$emit("file", e.dataTransfer.files);
        return;
      }else{
          // todo filter files
        this.$emit("file", e.dataTransfer.files);
      }
    }
  }
};
</script>

<style lang="scss">
.zhu-upload-dragger {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    width: 360px;
    height: 180px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .icon{
        margin-top:40px;
        margin-bottom:16px;;
        width:50px;
        height:50px;

    }
}
</style>