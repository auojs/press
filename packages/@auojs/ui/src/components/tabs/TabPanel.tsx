import { defineComponent, inject } from 'vue';
import GlobalMixin from '../_mixins/global';
import ActiveMixin from '../_mixins/active';
import { getSlot } from '../_util/instance';

export default defineComponent({
  name: 'AuoTabPane',

  mixins: [GlobalMixin('tabsTabpane'), ActiveMixin],

  props: {
    tab: String
  },

  render() {
    const { active, prefixCls } = this;

    const paneProps = {
      class: {
        [`${prefixCls}`]: true,
        [`${prefixCls}-active`]: active,
        [`${prefixCls}-inactive`]: !active
      }
    };

    return <div {...paneProps}>{getSlot(this)}</div>;
  }
});
