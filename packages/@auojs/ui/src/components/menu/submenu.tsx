import { defineComponent } from 'vue';
import GlobalMixin from '../_mixins/global';
import { getSlot } from '../_util/instance';

export default defineComponent({
  name: 'AuoSubmenu',

  mixins: [GlobalMixin('MenuSubmenu')],

  props: {
    title: String
  },

  render() {
    const { title, prefixCls, $attrs } = this;

    const inputProps = {
      ...$attrs,
      class: {
        [`${prefixCls}`]: true
      }
    };

    const titleProps = {
      class: {
        [`${prefixCls}-title`]: true
      }
    };

    return (
      <li {...inputProps}>
        <div {...titleProps}>{title}</div>
        <ul>{getSlot(this)}</ul>
      </li>
    );
  }
});
