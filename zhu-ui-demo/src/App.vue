<template>
   <div>
      <zh-upload
      style="width:360px"
         name="avatar"
         action="http://localhost:3000/upload"
         :file-list="fileList"
         :limit="3"
         accept="image/jpeg"
         :on-exceed="handleExceed"
         :multiple="true"
         :on-success="handleSuccess"
         :on-error="handleError"
         :on-progress="handleProgress"
         :on-remove="handleRemove"
         :on-change="handleChange"

         :beforeUpload="beforeUpload"
         :beforeRemove="beforeRemove"

         list-type="picture"
         :drag="true"
      >
         <zh-button type="primary" icon="shangchuan">点击上传</zh-button>
         <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </zh-upload>
   </div>
</template>

<script>
export default {
   data(){
      return {
         fileList:[
            {name:'珠峰架构',url:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
         ]}
   },
   methods:{
      handleExceed(files,fileList){
         console.log('超过限制')
      },
      handleSuccess(){

      },
      handleError(){

      },
      handleRemove(){

      },
      handleProgress(){

      },
      handleChange(){

      },
      beforeUpload(file){
         const isJpg = file.type === 'image/jpeg';
         const isLt500K = file.size / 1024  < 500;
         
         if(!isJpg){
            console.log('图片规则不符合')
         }
         if(!isLt500K){
            console.log('图片不能超过 500k')
         }
         return isJpg && isLt500K

      },
      beforeRemove(){
         return window.confirm('确定移除吗?')
      }
   }
}
</script>
