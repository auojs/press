import { defineComponent, PropType } from 'vue';
import GlobalMixin from '../_mixins/global';
import { getSlot } from '../_util/instance';

type PropDirection = 'horizontal ' | 'vertical';
type PropOrientation = 'lefy' | 'center' | 'right';

export default defineComponent({
  name: 'AuoDivider',

  mixins: [GlobalMixin('divider')],

  props: {
    dashed: Boolean,
    direction: {
      type: String as PropType<PropDirection>,
      default: 'horizontal'
    },
    orientation: {
      type: String as PropType<PropOrientation>,
      default: 'center'
    }
  },

  render() {
    const { prefixCls, $attrs, direction, orientation } = this;

    const dividerProps = {
      class: {
        [`${$attrs.class}`]: $attrs.class,
        [`${prefixCls}`]: true,
        [`${prefixCls}-${direction}`]: direction,
        [`${prefixCls}-with-text-${orientation}`]: orientation
      }
    };
    return (
      <div {...dividerProps}>
        <span class={`${prefixCls}-inner-text`}>{getSlot(this)}</span>
      </div>
    );
  }
});
