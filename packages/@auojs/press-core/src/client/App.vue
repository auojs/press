<template>
  <layout>
    <div class="content">
      <router-view />
    </div>
  </layout>
</template>

<script>
import { layout } from "@internal/layout";

export default {
  components: { layout },
};
</script>

<style lang="less">
@import "./style/index.less";
</style>