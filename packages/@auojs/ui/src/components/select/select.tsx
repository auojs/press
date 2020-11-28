import { defineComponent } from 'vue';
import GlobalMixin from '../_mixins/global';
import { getSlot } from '../_util/instance';

export default defineComponent({
  name: 'AuoSelect',

  mixins: [GlobalMixin('select')],

  render() {
    const { prefixCls, $attrs } = this;

    const selectProps = {
      class: {
        [`${$attrs.class}`]: $attrs.class,
        [`${prefixCls}`]: true
      }
    };
    return <div {...selectProps}>{getSlot(this)}</div>;
  }
});
