# Layout 布局

:::demo 基本结构

> 典型的页面布局。

```vue
<template>
  <div class="components-layout-demo-basic">
    <auo-layout>
      <auo-layout-header>Header</auo-layout-header>
      <auo-layout-content>Content</auo-layout-content>
      <auo-layout-footer>Footer</auo-layout-footer>
    </auo-layout>

    <auo-layout>
      <auo-layout-header>Header</auo-layout-header>
      <auo-layout>
        <auo-layout-sider>Sider</auo-layout-sider>
        <auo-layout-content>Content</auo-layout-content>
      </auo-layout>
      <auo-layout-footer>Footer</auo-layout-footer>
    </auo-layout>

    <auo-layout>
      <auo-layout-header>Header</auo-layout-header>
      <auo-layout>
        <auo-layout-content>Content</auo-layout-content>
        <auo-layout-sider>Sider</auo-layout-sider>
      </auo-layout>
      <auo-layout-footer>Footer</auo-layout-footer>
    </auo-layout>

    <auo-layout>
      <auo-layout-sider>Sider</auo-layout-sider>
      <auo-layout>
        <auo-layout-header>Header</auo-layout-header>
        <auo-layout-content>Content</auo-layout-content>
        <auo-layout-footer>Footer</auo-layout-footer>
      </auo-layout>
    </auo-layout>
  </div>
</template>

<style lang="less" scoped>
  .components-layout-demo-basic {
    text-align: center;

    .auo-layout-header,
    .auo-layout-footer {
      background: #7dbcea;
      color: #fff;
    }

    .auo-layout-footer {
      line-height: 1.5;
    }
    .auo-layout-sider {
      background: #3ba0e9;
      color: #fff;
      line-height: 120px;
    }
    .auo-layout-content {
      background: rgba(16, 142, 233, 1);
      color: #fff;
      min-height: 120px;
      line-height: 120px;
    }
    > .auo-layout {
      margin-bottom: 48px;
    }
    > .auo-layout:last-child {
      margin: 0;
    }
  }
</style>
```

:::

### Layout 

布局容器。

| 参数     | 说明                                                         | 类型    | 默认值 |
| :------- | :----------------------------------------------------------- | :------ | :----- |
| class    | 容器 class                                                   | string  | -      |
| style    | 指定样式                                                     | object  | -      |
| hasSider | 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 | boolean | -      |

> `Layout.Header` `Layout.Footer` `Layout.Content` API 与 `Layout` 相同

### Layout.Header

导航栏。

| 参数 | 说明                                                | 类型   | 默认值 |
| ---- | --------------------------------------------------- | ------ | ------ |
| mode | 导航模式：可选`fixed`、`auto-fixed`或不设置默认模式 | string | -      |



### Layout.Sider

侧边栏。

| 参数                  | 说明                                                         | 类型                                         | 默认值 |
| :-------------------- | :----------------------------------------------------------- | :------------------------------------------- | :----- |
| breakpoint            | 触发响应式布局的[断点](https://www.antdv.com/components/grid#API) | Enum { 'xs', 'sm', 'md', 'lg', 'xl', 'xxl' } | -      |
| class                 | 容器 class                                                   | string                                       | -      |
| collapsed(v-model)    | 当前收起状态                                                 | boolean                                      | -      |
| collapsedWidth        | 收缩宽度，设置为 0 会出现特殊 trigger                        | number                                       | 80     |
| collapsible           | 是否可收起                                                   | boolean                                      | false  |
| defaultCollapsed      | 是否默认收起                                                 | boolean                                      | false  |
| reverseArrow          | 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用            | boolean                                      | false  |
| style                 | 指定样式                                                     | object\|string                               | -      |
| theme                 | 主题颜色                                                     | string: `light` `dark`                       | `dark` |
| trigger               | 自定义 trigger，设置为 null 时隐藏 trigger                   | string\|slot                                 | -      |
| width                 | 宽度                                                         | number\|string                               | 200    |
| zeroWidthTriggerStyle | 指定当 `collapsedWidth` 为 0 时出现的特殊 trigger 的样式     | object                                       | -      |

### 事件

| 事件名称   | 说明                                                         | 回调参数                |
| :--------- | :----------------------------------------------------------- | :---------------------- |
| collapse   | 展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发 | (collapsed, type) => {} |
| breakpoint | 触发响应式布局[断点](https://www.antdv.com/components/grid#api)时的回调 | (broken) => {}          |

#### breakpoint width

```js
{
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}
```