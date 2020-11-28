<template>
  <auo-menu @select="handleMenuSelect">
    <SiderMenu
      :menu="menu"
      v-for="(item, index) in items"
      :item="item"
      :key="index"
    />
  </auo-menu>
</template>

<script>
import SiderMenu from "./SiderMenu";
export default {
  components: { SiderMenu },
  props: {
    items: Object,
    menu: {
      type: String,
      default: "",
    },
  },

  methods: {
    handleMenuSelect(key) {
      this.$router.push(key);
    },
  },
};
</script>