<template>
  <div class="zh-upload">
    <uploadDragger v-if="drag" :accept="accept" @file="uploadFiles"></uploadDragger>

    <div @click="handleClick" class="zh-upload-handler" v-else>
      <slot></slot>
    </div>

    <input
      type="file"
      ref="input"
      class="upload"
      :accept="accept"
      :multiple="multiple"
      :name="name"
      @change="handleChange"
    />
    <slot name="tip"></slot>
    <ul>
      <li v-for="file in files" :key="file.uid">
        <template v-if="listType == 'text'">
          <div class="list-item">
            <zh-icon icon="file"></zh-icon>
            <span>{{file.name}}</span>
          </div>
          <zh-icon icon="cha" @click="handleRemove(file.rawFile,file)" class="cha"></zh-icon>
        </template>
        <template v-else>
          <img style="width:70px;height:70px" :src="file.url" alt />
          <div class="list-item">
            <span>{{file.name}}</span>
            <zh-progress v-if="file.status == 'uploading'" :percentage="file.percentage"></zh-progress>
          </div>
          <zh-icon icon="cha" @click="handleRemove(file.rawFile,file)" class="cha"></zh-icon>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import ajax from "./ajax";
import uploadDragger from './upload-dragger'
export default {
  name: "zh-upload",
  props: {
    name: String,
    action: String,
    fileList: {
      type: Array,
      default: () => []
    },
    accept: String,
    limit: Number,
    multiple: Boolean,
    onExceed: Function,
    onSuccess: Function,
    onError: Function,
    onProgress: Function,
    onRemove: Function,
    onChange: Function,
    beforeUpload: Function,
    beforeRemove: Function,
    httpRequest: {
      type: Function,
      default: ajax
    },
    listType: {
      default: "text",
      type: String
    },
    drag:{
        drag:Boolean,
        default:false
    }
  },
  data() {
    return {
      files: []
    };
  },
  components:{
      uploadDragger
  },
  watch: {
    fileList: {
      immediate: true,
      handler(fileList) {
        this.files = fileList.map(item => {
          item.uid = Date.now() + this.tempIndex++;
          item.status = item.status || "success";
          return item;
        });
      }
    }
  },
  created() {
    this.tempIndex = 1;
    this.reqs = {};
  },
  methods: {
    handleClick() {
      this.$refs.input.value = null;
      this.$refs.input.click();
    },
    handleStart(rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      let file = {
        status: "ready",
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      };

      if (this.listType == "picture") {
        file.url = URL.createObjectURL(rawFile);
      }
      this.files.push(file);
      // 文件列表变化 会通知用户
      this.onChange(file, this.files);
    },
    handleProgress(ev, rawFile) {
      const file = this.getFile(rawFile);
      this.onProgress(ev, file, this.files);
      file.status = "uploading";
      file.percentage = ev.percent || 0;
    },
    handleSuccess(res, rawFile) {
      const file = this.getFile(rawFile);
      this.onSuccess(res, file, this.files);
      this.onChange(file, this.files);
      file.status = "success";
    },
    handleError(err, rawFile) {
      const file = this.getFile(rawFile);
      this.onError(err, file, this.files);
      this.onChange(file, this.files);
      file.status = "fail";
      delete this.reqs[rawFile.uid];
    },
    post(rawFile) {
      // 上传文件
      // 需要考虑当前是否需要终端
      const { uid } = rawFile;
      const options = {
        file: rawFile,
        filename: this.name,
        action: this.action,
        onProgress: ev => {
          this.handleProgress(ev, rawFile);
        },
        onSuccess: res => {
          this.handleSuccess(res, rawFile);
        },
        onError: err => {
          this.handleError(err, rawFile);
        }
      };
      let req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },
    upload(rawFile) {
      this.$refs.input.value = null;

      if (!this.beforeUpload) {
        return this.post(rawFile);
      }
      // 上传之前看一下是否符合规范
      let before = this.beforeUpload(rawFile);

      if (before) {
        this.post(rawFile);
      } else {
        // 删除列表中的
        this.handleRemove(rawFile);
      }
    },
    getFile(rawFile) {
      return this.files.find(file => file.uid === rawFile.uid);
    },
    abort(file) {
      if (this.reqs[file.uid]) {
        this.reqs[file.uid].abort(); // 让ajax 去中断操作
      }
    },
    handleRemove(rawFile, file) {
      if (rawFile) {
        file = this.getFile(rawFile);
      }
      let doRemove = () => {
        // 这里需要中断请求
        this.abort(file);
        this.files.splice(this.files.indexOf(file), 1);
      };
      if (!this.beforeRemove) {
        doRemove();
      }
      let r = this.beforeRemove();
      if (r) {
        doRemove();
      }
    },
    uploadFiles(files) {
      // 2.限制文件个数
      if (this.limit && this.fileList.length + files.length > this.limit) {
        return this.onExceed && this.onExceed(files, this.fileList);
      }
      [...files].forEach(rawFile => {
        // 3.开始上传 上传之前需要更新列表 ，自己算一个
        this.handleStart(rawFile);
        this.upload(rawFile);
      });
    },
    handleChange(e) {
      const files = e.target.files;
      // 1.开始上传
      this.uploadFiles(files);
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/_var.scss";
.zh-upload {
  .zh-upload-handler {
    display: inline-block;
  }
  .upload {
    display: none;
  }
  li {
    .zh-icon {
      width: 18px;
      height: 18px;
    }
    position: relative;
    margin: 10px 0;
    width: 100%;
    display: flex;
    padding-right: 4px;
    align-items: center;
    line-height: 1.5;
    .list-item{
        flex:1;
         margin-left: 10px;
    }
    .cha {
      display: none;
    }
    &:hover {
      background: #f5f7fa;
      color: $primary;
    }
    &:hover .cha {
      position: absolute;
      right:5px;
      display:block;
      top:3px;;
    }
  }
}
</style>