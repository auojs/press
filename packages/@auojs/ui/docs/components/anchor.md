# Anchor 锚点

用于跳转到页面指定位置。

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## 代码演示

:::demo 静态位置

> 不浮动，状态不随页面滚动变化。

```vue
<template>
  <section class="code-box-demo" data-v-67a5e324="">
    <div class="auo-anchor-wrapper" data-v-67a5e324="" style="max-height: 100vh;">
      <div class="auo-anchor fixed">
        <div class="auo-anchor-ink">
          <span class="auo-anchor-ink-ball" style="top: 10.5px;"></span>
        </div>
        <div class="auo-anchor-link">
          <a class="auo-anchor-link-title" href="#components-anchor-demo-basic" title="Basic demo">
            Basic demo
          </a>
          <!---->
        </div>
        <div class="auo-anchor-link">
          <a
            class="auo-anchor-link-title"
            href="#components-anchor-demo-static"
            title="Static demo"
          >
            Static demo
          </a>
          <!---->
        </div>
        <div class="auo-anchor-link">
          <a class="auo-anchor-link-title" href="#API" title="API">API</a>
          <div class="auo-anchor-link">
            <a class="auo-anchor-link-title" href="#Anchor-Props" title="Anchor Props">
              Anchor Props
            </a>
            <!---->
          </div>
          <div class="auo-anchor-link">
            <a class="auo-anchor-link-title" href="#Link-Props" title="Link Props">Link Props</a>
            <!---->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

:::
