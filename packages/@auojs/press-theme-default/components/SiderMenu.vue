<template>
  <auo-menu-item-group v-if="!isString" :title="item.title">
    <MenuItem
      v-for="children in item.children"
      :key="children"
      :item="handleItem(children)"
    />
  </auo-menu-item-group>
  <MenuItem v-else :item="handleItem(item)" />
</template>

<script>
import MenuItem from "./MenuItem";
import { ensureExt } from "../util";

export default {
  components: { MenuItem },
  props: {
    item: [Object, String],
    menu: {
      type: String,
      default: "",
    },
  },

  computed: {
    isString() {
      return typeof this.item === "string";
    },
  },

  methods: {
    seekTitle(p) {
      for (const page of this.siteConfig.pages) {
        if (page.regularPath === ensureExt(p)) {
          return page.title;
        }
      }

      return p;
    },
    handleItem(key) {
      key = this.menu + key;
      return {
        text: this.seekTitle(key),
        link: key,
      };
    },
  },
};
</script>