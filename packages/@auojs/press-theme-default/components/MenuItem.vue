<template>
  <auo-menu-item :key="link">
    {{ item.text }}
  </auo-menu-item>
</template>

<script>
import { ensureExt } from "../util";

export default {
  props: {
    item: Object,
  },

  computed: {
    link() {
      return ensureExt(this.item.link);
    },
  },
};
</script>