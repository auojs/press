import { defineComponent, h } from 'vue';
import { RouterView } from 'vue-router';
import dddd from './dddd.vue';

export default defineComponent({
  render() {
    return h('div', { id: 'apps' }, [h(dddd), h(RouterView)]);
  }
});
