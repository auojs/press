# Button 按钮

响应用户点击行为，触发业务逻辑

## 代码示例

:::demo 基本使用

> 这里是描述内容

```vue
<template>
  <div>
    <auo-space>
      <auo-button>Default</auo-button>
      <auo-button type="primary">Primary</auo-button>
      <auo-button type="dashed">Dashed</auo-button>
      <auo-button type="danger">Danger</auo-button>
      <auo-button type="link">Link</auo-button>
    </auo-space>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleClick() {
      alert('sometext');
    }
  }
};
</script>

<style></style>
```

:::

:::demo 加载状态

> 通过添加 `loading` 属性可以让按钮处于加载中状态，后两个按钮在点击时进入加载状态。

```vue
<template>
  <div class="demo">
    <auo-space>
      <auo-button @click="handleClick" :loading="defaultLoading">
        Default
      </auo-button>
      <auo-button type="primary" @click="handlePrimaryClick" :loading="loading">
        Primary
      </auo-button>
      <auo-button type="dashed" loading>Dashed</auo-button>
      <auo-button type="link" loading>Link</auo-button>
      <auo-button type="danger" loading>Danger</auo-button>
    </auo-space>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      defaultLoading: false
    };
  },
  methods: {
    handleClick() {
      this.loading = !this.loading;
    },
    handlePrimaryClick() {
      this.defaultLoading = !this.defaultLoading;
    }
  }
};
</script>
```

:::

## API

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`。

按钮的属性说明如下：

| 参数     | 说明                                                         | 类型                       | 默认值    |
| -------- | ------------------------------------------------------------ | -------------------------- | --------- |
| disabled | 按钮失效状态                                                 | boolean                    | `false`   |
| ghost    | 幽灵属性，使按钮背景透明                                     | boolean                    | `false`   |
| loading  | 设置按钮载入状态                                             | boolean\|{ delay: number } | `false`   |
| block    | 将按钮宽度调整为其父宽度的选项                               | boolean                    | `false`   |
| htmltype | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string                     | `button`  |
| icon     | 设置按钮的图标类型                                           | string                     | -         |
| shape    | 设置按钮形状，可选值为 `circle`、 `round` 或者不设           | string                     | -         |
| size     | 设置按钮大小，可选值为 `small` `large` 或者不设              | string                     | `default` |
| type     | 设置按钮类型，可选值为 `primary` `dashed` `danger` `link` 或者不设 | string                     | `default` |

