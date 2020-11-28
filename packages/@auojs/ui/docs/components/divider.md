# Divider 分割线

:::demo 基本使用

> 默认为水平分割线，可在中间加入文字。

```vue
<template>
  <div>
    <auo-divider orientation="left">左边分割</auo-divider>
    <auo-divider orientation="center">居中</auo-divider>
    <auo-divider orientation="right">右边分割</auo-divider>
  </div>
</template>
```

:::



## API 

| 参数        | 说明             | 类型                          | 默认值       |
| :---------- | :--------------- | :---------------------------- | :----------- |
| dashed      | 是否虚线         | Boolean                       | false        |
| orientation | 分割线标题的位置 | enum: `left` `right`          | `center`     |
| type        | 水平还是垂直类型 | enum: `horizontal` `vertical` | `horizontal` |