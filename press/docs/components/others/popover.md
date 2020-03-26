# Popover 弹出框

## 基础用法
<demo-block>
::: slot source
<popover-test1></popover-test1>
:::

::: slot highlight
```html
<template>
    <div style="margin: 100px 0 100px">
        <zh-popover
            placement="right"
            width="200px"
            title="标题"
            content="这是弹框"
            trigger="click"
            v-model="value1"
        >
            <zh-button slot="reference">点击弹框</zh-button>
        </zh-popover>

        <zh-popover
            placement="top"
            width="200px"
            title="标题"
            content="这是弹框"
            trigger="hover"
            v-model="value2"
        >
            <zh-button slot="reference">点击弹框</zh-button>
        </zh-popover>

        <zh-popover
            placement="right"
            width="200px"
            title="标题"
            content="这是弹框"
            trigger="hover"
            v-model="value3"
        >
            <zh-button slot="reference">点击弹框</zh-button>
        </zh-popover>

        <zh-popover width="200px" title="标题" content="这是弹框" trigger="hover" v-model="value4">
            <zh-button slot="reference">点击弹框</zh-button>
        </zh-popover>

        <zh-popover
            placement="left"
            width="200px"
            title="标题"
            content="这是弹框"
            trigger="hover"
            v-model="value5"
        >
            <zh-button slot="reference">点击弹框</zh-button>
        </zh-popover>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: true,
            value2: false,
            value3: false,
            value4: false,
            value5: false
        };
    }
};
</script>
```
:::
</demo-block>

## Attributes
参数|说明|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
trigger|触发方式|String|click/hover|click
title|标题|String|—|—
content|显示的内容，也可以通过 slot 传入 DOM|String|—|—
width|宽度|String, Number|—|最小宽度 150px
placement|出现位置|String|top/bottom/left/right|bottom
value / v-model|状态是否可见|Boolean|—|false
