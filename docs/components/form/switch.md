# Switch 开关
表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基本用法

<demo-block>
::: slot source
<switch-test1></switch-test1>
:::

绑定v-model到一个Boolean类型的变量。可以使用active-color属性与inactive-color属性来设置开关的背景色。

::: slot highlight
```html
<zh-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949">
</zh-switch>

<script>
  export default {
    data() {
      return {
        value: true
      }
    }
  };
</script>
```
:::
</demo-block>


## 扩展的 value 类型

<demo-block>
::: slot source
<switch-test2></switch-test2>
:::

设置active-value和inactive-value属性，接受Boolean, String或Number类型的值。

::: slot highlight
```html
  {{value}}
  <zh-switch
    v-model="value"
    active-color="#13ce66"
    inactive-color="#ff4949"
    active-value="100"
    inactive-value="0">
  </zh-switch>

<script>
  export default {
    data() {
      return {
        value: '100'
      }
    }
  };
</script>
```
:::
</demo-block>


## 禁用状态

<demo-block>
::: slot source
<switch-test3></switch-test3>
:::

设置disabled属性，接受一个Boolean，设置true即可禁用。。

::: slot highlight
```html
<zh-switch
  v-model="value1"
  disabled>
</zh-switch>
<zh-switch
  v-model="value2"
  disabled>
</zh-switch>
<script>
  export default {
    data() {
      return {
        value1: true,
        value2: false
      }
    }
  };
</script>
```
:::
</demo-block>