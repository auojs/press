import { defineComponent, h } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  render() {
    return h('div', { class: 'layout' }, [
      h('div', { class: 'header' }, 'AuoPress'),
      h('div', { class: 'content' }, h(RouterView)),
      h('div', { class: 'footer' }, 'AuoPress')
    ]);
  }
});
