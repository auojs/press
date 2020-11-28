# Icon 图标

提供了一套常用的图标集合。

## 图标列表

```vue
<template>
  <ul class="all-icon-list">
    <li v-for="key in iconkeys" :key="key">
      <div class="icon">
        <auo-icon :type="key" :size="size" />
      </div>
      <span>{{ key }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import feather from "feather-icons";

export default defineComponent({
  data() {
    return {
      size: 32,
      iconkeys: Object.keys(feather.icons),
    };
  },
});
</script>

<style lang="less" scoped>
ul.all-icon-list {
  margin: 10px 0;
  padding: 0 0 0 20px;
  font-size: 14px;
  color: #5e6d82;
  line-height: 2em;
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border: 1px solid #eaeefb;
  border-radius: 4px;
  font-family: icomoon !important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  li {
    float: left;
    width: 16.66%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
    margin: 0;
    padding: 0;
    list-style: none;

    &:after {
      content: "";
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }

    .icon {
      display: block;
      font-size: 32px;
      margin-bottom: 15px;
      color: #606266;
      transition: color 0.15s linear;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    span:not(.auo-icon) {
      font-size: 14px;
      color: #99a9bf;
      transition: color 0.15s linear;
      display: inline-block;
      padding: 0 3px;
      height: 1em;
      padding-top: 20px;
    }
  }
}
</style>
```

