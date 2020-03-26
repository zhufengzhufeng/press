# DatePicker 日期选择器
用于选择或输入日期

## 选择日
以「日」为基本单位，基础的日期选择控件

<demo-block>
::: slot source
<datepicker-test1></datepicker-test1>
:::
基本单位由type属性指定。
::: slot highlight
```html
<zh-date-picker v-model="value"></zh-date-picker>
```
:::
</demo-block>

## 选择日期范围
可在一个选择器中便捷地选择一个时间范围

<demo-block>
::: slot source
<datepicker-test2></datepicker-test2>
:::
在选择日期范围时，默认情况下左右面板会联动。
::: slot highlight
```html
<zh-date-range-picker v-model="value"></zh-date-range-picker>
```
:::
</demo-block>

## Attributes
参数|说明|类型|可选值|默认值
:-|:-|:-|:-|:-|:-
value / v-model | 绑定值 | date(DatePicker) / array(DateRangePicker) | — | —

