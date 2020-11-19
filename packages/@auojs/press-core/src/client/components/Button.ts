import { defineComponent, h } from 'vue';

export default defineComponent({
  render() {
    return h('button', { class: 'btn' }, '按钮');
  }
});
