import { defineComponent, PropType } from 'vue';
import GlobalMixin from '../_mixins/global';
import { getSlot } from '../_util/instance';

type TypeType = 'info' | 'success' | 'warning' | 'error';

export default defineComponent({
  name: 'AuoAlert',

  props: {
    type: {
      type: String as PropType<TypeType>,
      default: 'info'
    },

    closable: Boolean,

    showIcon: Boolean
  },

  mixins: [GlobalMixin('alert')],

  render() {
    const { type, prefixCls, $attrs } = this;

    const alertProps = {
      ...$attrs,
      class: {
        [`${$attrs.class}`]: $attrs.class,
        [`${prefixCls}`]: true,
        [`${prefixCls}-${type}`]: type
      }
    };
    return <div {...alertProps}>{getSlot(this)}</div>;
  }
});
