import { defineComponent, inject } from 'vue';
import GlobalMixin from '../_mixins/global';

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

export default defineComponent({
  name: 'AuoLayoutSider',
  mixins: [GlobalMixin('layoutSider')],
  props: {
    width: {
      type: [Number, String],
      default: 200
    },
    fixed: Boolean
  },
  data() {
    return {
      uniqueId: generateId('ant-sider-')
    };
  },
  setup() {
    return {
      siderHook: inject('siderHook', { addSider: (id: string) => {} })
    };
  },
  mounted() {
    if (this.siderHook.addSider) {
      this.siderHook.addSider(this.uniqueId);
    }
  },
  render() {
    const { width, prefixCls, $slots, fixed } = this;

    const siderWidth = width + 'px';

    const siderProps = {
      class: {
        [`${prefixCls}`]: true,
        [`${prefixCls}-fixed`]: fixed
      },
      style: {
        flex: `0 0 ${siderWidth}`,
        maxWidth: siderWidth, // Fix width transition bug in IE11
        minWidth: siderWidth, // https://github.com/ant-design/ant-design/issues/6349
        width: siderWidth
      }
    };

    return (
      <div {...siderProps}>{$slots.default ? $slots.default() : null}</div>
    );
  }
});
