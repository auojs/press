# Card 卡片

将信息聚合在卡片容器中展示。

:::demo 基础用法

> 包含标题，内容和操作。
>
> Card 组件包括`header`和`body`部分，`header` 部分需要有显式具名 `slot` 分发，同时也是可选的。

```vue
<template>
  <auo-card title="卡片名称" style="width:300px;">
    <template #extra>操作按钮</template>
    <div v-for="o in 4" :key="o" class="text item">
      {{ '列表内容 ' + o }}
    </div>
  </auo-card>
</template>
```

:::

:::demo 简单卡片

> 卡片可以只有内容区域。

```vue
<template>
  <auo-card style="width:300px;">
    <div v-for="o in 4" :key="o" class="text item">
      {{ '列表内容 ' + o }}
    </div>
  </auo-card>
</template>
```

:::

:::demo 带图片

> 可配置定义更丰富的内容展示。
>
> 配置 body-style 属性来自定义 body 部分的 style，我们还使用了布局组件。

```vue
<template>
  <auo-card style="width:300px;">
    <div v-for="o in 4" :key="o" class="text item">
      {{ '列表内容 ' + o }}
    </div>
  </auo-card>
</template>
```

:::

## API

### Card

| 参数     | 说明                                                 | 类型         | 默认值 |
| -------- | ---------------------------------------------------- | ------------ | ------ |
| title    | 卡片标题                                             | string\|slot | -      |
| extra    | 卡片右上角的操作区域                                 | string\|slot | -      |
| bordered | 是否显示边框                                         | boolean      | true   |
| shadow   | 设置阴影显示时机，可选值：`always`/`hover` / `never` | string       | always |

