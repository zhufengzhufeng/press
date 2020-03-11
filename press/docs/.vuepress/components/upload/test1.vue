<template>
    <div>
        <zh-upload
            class="upload-demo"
            action="https://localhost:3000/upload"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
        >
            <zh-button icon="shangchuan" type="primary">点击上传</zh-button>
            <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </zh-upload>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fileList:[
                {name:'珠峰架构',url:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
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
            // return this.$confirm(`确定移除 ${file.name}？`);
        }
    }
};
</script>