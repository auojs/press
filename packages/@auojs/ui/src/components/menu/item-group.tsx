import { defineComponent } from 'vue';
import GlobalMixin from '../_mixins/global';
import { getSlot, getComponent } from '../_util/instance';

export default defineComponent({
  name: 'AuoMenuItemGroup',

  mixins: [GlobalMixin('menuItemGroup')],

  props: {
    title: String
  },

  render() {
    const { title, prefixCls, $attrs, $slots } = this;

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

    const titleDom = getComponent(this, 'title');

    return (
      <li {...inputProps}>
        <div {...titleProps}>{titleDom}</div>
        <ul class={{ [`${prefixCls}-list`]: true }}>{getSlot(this)}</ul>
      </li>
    );
  }
});
