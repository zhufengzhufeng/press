# Input 输入框
通过鼠标或键盘输入字符
## 基础用法
<demo-block>
::: slot source
<input-test1></input-test1>
:::

::: slot highlight
```html
<zh-input type="password" v-model="value" placeholder="请输入内容"></zh-input>
```
:::
</demo-block>


## 禁用状态

<demo-block>
::: slot source
<input-test2></input-test2>
:::

通过 disabled 属性指定是否禁用 input 组件

::: slot highlight
```html
 <zh-input type="password" v-model="value" placeholder="请输入内容" disabled></zh-input>
```
:::
</demo-block>



## 可清空

<demo-block>
::: slot source
<input-test3></input-test3>
:::

使用clearable属性即可得到一个可清空的输入框

::: slot highlight
```html
<zh-input type="text" v-model="value" placeholder="请输入内容" clearable></zh-input>
```
:::
</demo-block>


## 密码框
<demo-block>
::: slot source
<input-test4></input-test4>
:::

使用show-password属性即可得到一个可切换显示隐藏的密码框

::: slot highlight
```html
<zh-input type="password" v-model="value" placeholder="请输入内容" show-password></zh-input>
```
:::
</demo-block>

## 带 icon 的输入框
<demo-block>
::: slot source
<input-test5></input-test5>
:::

可以通过 prefix-icon 和 suffix-icon 属性在 input 组件首部和尾部增加显示图标

::: slot highlight
```html
<zh-input
    placeholder="编辑"
    suffix-icon="edit"
    v-model="input">
</zh-input>
<zh-input
    placeholder="编辑"
    prefix-icon="edit"
    v-model="input">
</zh-input>
```
:::
</demo-block>



## Attributes
参数|说明|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
type|类型|string|text，textarea 和其他 原生 input 的 type 值 |text
value / v-model|绑定值|string / number | - | -
disabled|禁用|boolean|-|false
position|图标位置|string | left / right | left
clearable| 是否可清空|boolean | - | false
show-password | 是否显示切换密码图标 | boolean | - | false
name|	原生属性|	string|	—	|—
prefix-icon	 | 输入框头部图标 |	string | —	|—
suffix-icon |	输入框尾部图标 |	string | — | —

## Input Events
事件名称 | 	说明	| 回调参数
:-|:-|:-|:-
blur|	在 Input 失去焦点时触发 |	(event: Event)
focus|	在 Input 获得焦点时触发	 | (event: Event)
change|	仅在输入框失去焦点或用户按下回车时触发	|  (event: Event)
input	|在 Input 值改变时触发 |	(value: string)

