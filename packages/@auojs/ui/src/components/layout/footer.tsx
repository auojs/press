import { defineComponent } from 'vue';
import GlobalMixin from '../_mixins/global';

export default defineComponent({
  name: 'AuoLayoutFooter',
  mixins: [GlobalMixin('layoutFooter')],
  render() {
    const { prefixCls, $slots } = this;

    const footerProps = {
      class: {
        [`${prefixCls}`]: true
      }
    };
    return <div {...footerProps}>{$slots.default ? $slots.default() : null}</div>;
  }
});
