import { defineComponent, inject } from 'vue';

export default defineComponent({
  data() {
    return {
      key: null,
      rootContext: inject('rootContext', {})
    } as { key: string | number | null; rootContext: any };
  },

  computed: {
    active(): boolean {
      return this.key === this.rootContext.activeKey;
    }
  },

  mounted() {
    const { key } = this.$.vnode;
    this.key = key;
  }
});
