import { defineComponent, h } from 'vue';

export default defineComponent({
  render() {
    return h('div', { attrs: { id: 'app' } }, [
      h('RouterView', { ref: 'layout' })
    ]);
  }
});
