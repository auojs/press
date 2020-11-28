import { defineComponent } from 'vue';
import GlobalMixin from '../_mixins/global';
import { getSlot } from '../_util/instance';

export default defineComponent({
  name: 'AuoAffix',

  mixins: [GlobalMixin('affix')],

  render() {
    const { prefixCls, $attrs } = this;

    const affixProps = {
      class: {
        [`${$attrs.class}`]: $attrs.class,
        [`${prefixCls}`]: true
      }
    };
    return <div {...affixProps}>{getSlot(this)}</div>;
  }
});
