(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{365:function(a,t,e){},431:function(a,t,e){"use strict";var s=e(365);e.n(s).a},457:function(a,t,e){"use strict";e.r(t);e(12),e(46),e(49),e(425);var s={data:function(){return{imageUrl:""}},methods:{handleAvatarSuccess:function(a,t){this.imageUrl=URL.createObjectURL(t.raw)},beforeAvatarUpload:function(a){var t="image/jpeg"===a.type,e=a.size/1024/1024<2;return t||this.$message.error("上传头像图片只能是 JPG 格式!"),e||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&e}}},r=(e(431),e(28)),i=Object(r.a)(s,(function(){var a=this.$createElement,t=this._self._c||a;return t("div",[t("zh-upload",{staticClass:"avatar-uploader",attrs:{action:"https://localhost:3000/upload","on-success":this.handleAvatarSuccess,beforeUpload:this.beforeAvatarUpload}},[this.imageUrl?t("img",{staticClass:"avatar",attrs:{src:this.imageUrl}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)}),[],!1,null,null,null);t.default=i.exports}}]);