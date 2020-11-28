import { defineComponent } from 'vue';
import GlobalMixin from '../_mixins/global';
import { getComponent } from '../_util/props-util';

export default defineComponent({
  name: 'AuoCard',
  mixins: [GlobalMixin('card')],
  props: {
    title: {
      type: String
    },
    extra: {
      type: String
    },
    bordered: {
      type: Boolean,
      default: true
    },
    hoverale: {
      type: Boolean
    }
  },

  methods: {
    getClasses() {
      const { bordered, prefixCls, $attrs } = this;

      return {
        [`${$attrs.class}`]: $attrs.class,
        [`${prefixCls}`]: true,
        [`${prefixCls}-bordered`]: bordered
      };
    }
  },

  render() {
    const { prefixCls, $slots } = this;
    const classes = this.getClasses();

    const cardProps = {
      class: classes
    };
    const children = $slots.default ? $slots.default() : null;

    let head;
    const titleDom = getComponent(this, 'title');
    const extraDom = getComponent(this, 'extra');
    if (titleDom || extraDom) {
      head = (
        <div class={`${prefixCls}-head`}>
          <div class={`${prefixCls}-head-wrapper`}>
            {titleDom && (
              <div class={`${prefixCls}-head-title`}>{titleDom}</div>
            )}
            {extraDom && <div class={`${prefixCls}-extra`}>{extraDom}</div>}
          </div>
        </div>
      );
    }

    const body = <div class={`${prefixCls}-body`}>{children}</div>;

    return (
      <div {...cardProps}>
        {head}
        {children ? body : null}
      </div>
    );
  }
});
