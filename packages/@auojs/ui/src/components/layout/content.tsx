import { defineComponent } from 'vue';
import GlobalMixin from '../_mixins/global';

export default defineComponent({
  name: 'AuoLayoutContent',
  mixins: [GlobalMixin('layoutContent')],
  render() {
    const { prefixCls, $slots } = this;

    const contentProps = {
      class: {
        [`${prefixCls}`]: true
      }
    };
    return <div {...contentProps}>{$slots.default ? $slots.default() : null}</div>;
  }
});
