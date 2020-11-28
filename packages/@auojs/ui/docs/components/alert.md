# Alert 警告提示

## 概述

静态地呈现一些警告信息，可手动关闭。

:::demo 基础用法

> 基本使用方法，有四种样式可以选择`info`、`success`、`warning`、`error`。

```vue
<template>
	<div>
    <auo-alert>An info prompt</auo-alert>
    <auo-alert type="success">Info Text</auo-alert>
    <auo-alert type="warning">Warning Text</auo-alert>
    <auo-alert type="error">Error Text</auo-alert>
  </div>
</template>
```

:::