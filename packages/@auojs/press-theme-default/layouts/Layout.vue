<template>
  <auo-layout>
    <auo-layout-header
      mode="auto-fixed"
      style="border-bottom: 4px solid #1565c0"
    >
      <div class="flex-row">
        <a class="logo" href="/">AuoPress</a>

        <auo-menu
          mode="horizontal"
          theme="dark"
          style="margin-left: 12px; float: left"
          @select="handleMenuSelect"
        >
          <MenuItem v-for="item in nav" :key="item.link" :item="item" />
        </auo-menu>

        <auo-menu
          mode="horizontal"
          theme="dark"
          style="margin-left: 12px; float: right"
        >
          <auo-menu-item key="3">
            GitHub
            <OutboundLink />
          </auo-menu-item>
        </auo-menu>
      </div>
    </auo-layout-header>
    <auo-layout>
      <auo-layout-sider width="256" style="background: #fff" fixed>
        <Sider :menu="siderKey" :items="sider" />
      </auo-layout-sider>
      <auo-layout style="background: #fff">
        <auo-layout-content
          style="
            padding: 20px 40px 150px;
            width: 960px;
            max-width: 960px;
            margin: 0 auto;
          "
        >
          <slot />
        </auo-layout-content>
        <auo-layout-footer>
          本站点专为方便查看 VuePress 中文文档 | MIT Licensed | 源码链接见右上角
          京ICP备15031610号-20
        </auo-layout-footer>
      </auo-layout>
    </auo-layout>
  </auo-layout>
</template>

<script>
import path from "path";
import MenuItem from "../components/MenuItem";
import Sider from "../components/Sider";
import { ensureExt } from "../util";

export default {
  components: { MenuItem, Sider },
  data() {
    return {};
  },

  computed: {
    nav() {
      return this.siteConfig.themeConfig.nav;
    },

    siderKey() {
      const rawSider = this.siteConfig.themeConfig.sider;
      for (const side in rawSider) {
        if (new RegExp(side).test(`${this.$route.path}/`)) {
          return side;
        }
      }
      return;
    },

    sider() {
      const rawSider = this.siteConfig.themeConfig.sider;

      let sides = [];
      if (rawSider instanceof Array) {
        sides = rawSider;
      } else if (typeof rawSider == "object") {
        sides = rawSider[this.siderKey];
      }

      return sides;
    },
  },

  methods: {
    handleMenuSelect(key) {
      this.$router.push(key);
    },
  },
};
</script>

<style lang="less">
.container {
  max-width: 1260px;
}

.flex-row {
  display: block;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  a.anchor {
    font-size: 0.85em;
    float: left;
    margin-left: -0.87em;
    padding-right: 0.23em;
    margin-top: 0.125em;
    opacity: 0;
  }

  &:hover {
    a.anchor {
      opacity: 1;
    }
  }
}
</style>