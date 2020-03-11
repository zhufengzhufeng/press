# Upload上传 
通过点击或者拖拽上传文件

## 点击上传

<demo-block>
::: slot source
<upload-test1></upload-test1>
:::

通过 slot 你可以传入自定义的上传按钮类型和文字提示。可通过设置limit和on-exceed来限制上传文件的个数和定义超出限制时的行为。可通过设置before-remove来阻止文件移除操作。

::: slot highlight
```html
<zh-upload
    class="upload-demo"
    action="https://localhost:3000/upload"
    :on-remove="handleRemove"
    :beforeRemove="beforeRemove"
    :multiple="true
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList"
>
    <zh-button size="small" type="primary">点击上传</zh-button>
    <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</zh-upload>
<script>
export default {
    data() {
        return {
            fileList: [
                {
                    name: "food.jpeg",
                    url:
                        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                },
                {
                    name: "food2.jpeg",
                    url:
                        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                }
            ]
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
    }
};
</script>
```
:::
</demo-block>


## 用户头像上传

<demo-block>
::: slot source
<upload-test2></upload-test2>
:::

::: slot highlight
```html
<zh-upload
    class="avatar-uploader"
    action="https://localhost:3000/upload"
    :on-success="handleAvatarSuccess"
    :beforeUpload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</zh-upload>
<script>
export default {
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
}
</script>

<style>
  .avatar-uploader .zh-upload-handler {
      width: 180px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .zh-upload-handler:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
```
:::
</demo-block>

## 图片列表缩略图

<demo-block>
::: slot source
<upload-test3></upload-test3>
:::

::: slot highlight
```html
<zh-upload
    class="upload-demo"
    action="https://localhost:3000/upload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    list-type="picture">
    <zh-button size="small" type="primary">点击上传</zh-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</zh-upload>
<script>
export default {
    data() {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
}
</script>
```
:::
</demo-block>

## 拖拽上传
<demo-block>
::: slot source
<upload-test4></upload-test4>
:::

::: slot highlight
```html
<zh-upload
    class="upload-demo"
    :drag="true"
    action="https://localhost:3000/upload"
    multiple>
    
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</zh-upload>
```
:::
</demo-block>


## Attribute

参数 |说明|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
action|必选参数，上传的地址|string|—|—
multiple|是否支持多选文件|boolean|—|—
name|上传的文件字段名|string—file
drag|是否启用拖拽上传|boolean|—|false
accept|接受上传的文件类型（thumbnail-mode 模式下此参数无效）|string|—|—
on-remove|文件列表移除文件时的钩子|function(file, fileList)|—|—
on-success|文件上传成功时的钩子|function(response, file, fileList)|—|—
on-error|文件上传失败时的钩子|function(err, file, fileList)|—|—
on-progress|文件上传时的钩子|function(event, file, fileList)|—|—
on-change|文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用|	function(file, fileList)—|—|
before-upload|上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。|function(file)|—|—
before-remove|删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。|function(file, fileList)|—|—
list-type|文件列表的类型|string|text/picture|text
file-list|上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]|array|	—|[]
http-request|覆盖默认的上传行为，可以自定义上传的实现|function|—|—
limit|最大允许上传个数|number|—|—
on-exceed|文件超出个数限制时的钩子|function(files, fileList)|—|-

