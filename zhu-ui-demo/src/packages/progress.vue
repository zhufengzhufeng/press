<template>
    <div class="zh-progress">
        <div class="bar">
             <div class="bar-outer" :style="{height:strokeWidth+'px'}">
            <div class="bar-inner" :style="barStyle"></div>
        </div>
        </div>
       
        <div class="bar-text">
                {{content}}
            </div>
    </div>
</template>

<script>
export default {
    name:'zh-progress',
    props:{
        strokeWidth:{
            type:Number,
            default:6
        },
        percentage:{
            type:Number,
            default:0,
            required:true,
            validator:val=>val>=0&&val<=100
        },
        format:{
            type:Function
        },
        showText:{
            type:Boolean,
            default:true
        },
        color:{
            type:String,
            default:'blue'
        }
    },
    computed:{
        content(){
            if(typeof this.format == 'function'){
                return this.format(this.percentage);
            }else{
                return `${this.percentage}%`
            }
        },
        barStyle(){
            const style = {};
            style.width = this.percentage + '%';
            style.backgroundColor = this.color;
            return style
        }
    }
}
</script>

<style lang="scss">
.bar-outer{
    border-radius:100px;
    background-color:#ebeef5;
    position: relative;
    vertical-align: middle;
  
}
.bar{
         margin-right: -55px;
    padding-right:55px;
      display:inline-block;
      width:100%;
}
.bar-inner{
    transition: width .6s ease;
    position: absolute;
    top:0;
    left:0;
    height:100%
}
.zh-progress{
    width:100%;
}
.bar-text{
     display: inline-block;
     vertical-align: middle;
     margin-left:10px;
}

</style>