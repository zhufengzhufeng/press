# Container 布局容器
用于布局的容器组件，方便快速搭建页面的基本结构：

`<zh-container>`：外层容器。当子元素中包含 `<zh-header>` 或 `<zh-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。

`<zh-header>`：顶栏容器。

`<zh-aside>`：侧边栏容器。

`<zh-main>`：主要区域容器。

`<zh-footer>`：底栏容器。

> 以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`<zh-container>` 的子元素只能是后四者，后四者的父元素也只能是 `<zh-container>`



<demo-block>
::: slot source
<container-test1></container-test1>
:::


::: slot highlight
```html
<zh-container>
    <zh-header>Header</zh-header>
    <zh-main>Main</zh-main>
</zh-container>

<zh-container>
    <zh-header>Header</zh-header>
    <zh-main>Main</zh-main>
    <zh-footer>Footer</zh-footer>
</zh-container>

<zh-container>
    <zh-aside width="200px">Aside</zh-aside>
    <zh-main>Main</zh-main>
</zh-container>

<zh-container>
    <zh-header>Header</zh-header>
    <zh-container>
    <zh-aside width="200px">Aside</zh-aside>
    <zh-main>Main</zh-main>
    </zh-container>
</zh-container>

<zh-container>
    <zh-header>Header</zh-header>
    <zh-container>
    <zh-aside width="200px">Aside</zh-aside>
    <zh-container>
        <zh-main>Main</zh-main>
        <zh-footer>Footer</zh-footer>
    </zh-container>
    </zh-container>
</zh-container>

<zh-container>
    <zh-aside width="200px">Aside</zh-aside>
    <zh-container>
    <zh-header>Header</zh-header>
    <zh-main>Main</zh-main>
    </zh-container>
</zh-container>

<zh-container>
    <zh-aside width="200px">Aside</zh-aside>
    <zh-container>
    <zh-header>Header</zh-header>
    <zh-main>Main</zh-main>
    <zh-footer>Footer</zh-footer>
    </zh-container>
</zh-container>

<style>
.zh-header,
.zh-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.zh-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.zh-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .zh-container {
  margin-bottom: 40px;
}

.zh-container:nth-child(5) .zh-aside,
.zh-container:nth-child(6) .zh-aside {
  line-height: 260px;
}

.zh-container:nth-child(7) .zh-aside {
  line-height: 320px;
}
</style>
```
:::
</demo-block>