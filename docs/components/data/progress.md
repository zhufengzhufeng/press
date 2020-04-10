# Progress 进度条
用于展示操作进度，告知用户当前状态和预期。
## ¶线形进度条
<demo-block>
::: slot source
<progress-test1></progress-test1>
:::
通过 format 属性来指定进度条文字内容。
::: slot highlight
```html
<zh-progress :percentage="50" color="#409EFF"></zh-progress>
<zh-progress :percentage="50" :strokeWidth="10" color="#67C23A"></zh-progress>
<zh-progress :percentage="50" color="#E6A23C"></zh-progress>
<zh-progress :percentage="100" :format="formatFunc" color="#F56C6C"></zh-progress>

<script>
export default {
    methods: {
      formatFunc(percentage){
        return percentage === 100 ? '满' : `${percentage}%`;
      }
    }
}
</script>
```
:::
</demo-block>

## Attributes
参数|说明|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
percentage|百分比（必填）|number|0-100|0
stroke-width|进度条的宽度，单位 px|number|—|6
color|进度条背景色（会覆盖 status 状态颜色）|string/function/array|—|blue
format|格式化显示进度条内容|function|—|-