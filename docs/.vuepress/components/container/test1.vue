<template>
  <div>
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
  </div>
</template>

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