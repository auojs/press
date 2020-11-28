# Spin 加载中

用于页面和区块的加载中状态。

## 何时使用

页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

:::demo 基本用法

> 一个简单的 loading 状态。

```vue
<template>
  <div>
    <div class="auo-spin auo-spin-spinning" data-v-67a5e324="">
      <span class="auo-spin-dot auo-spin-dot-spin">
        <i class="auo-spin-dot-item"></i>
        <i class="auo-spin-dot-item"></i>
        <i class="auo-spin-dot-item"></i>
        <i class="auo-spin-dot-item"></i>
      </span>
    </div>
  </div>
</template>
```

:::

:::demo 另外用法

> 测试

```vue
<template>
  <div>
    <div class="loader"></div>
  </div>
</template>
```

:::

:::demo 另外用法 2

> 测试 2

```vue
<template>
  <div>
    <div class="selected">
      <div class="pulse"></div>
    </div>
  </div>
</template>
```

:::
