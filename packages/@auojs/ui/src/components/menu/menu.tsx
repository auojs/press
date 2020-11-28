import { defineComponent, provide } from 'vue';
import GlobalMixin from '../_mixins/global';
import { getSlot } from '../_util/instance';

export default defineComponent({
  name: 'AuoMenu',

  mixins: [GlobalMixin('menu')],

  emits: ['select'],

  props: {
    mode: {
      type: String,
      default: 'vertical'
    },
    defaultActiveKey: [String, Number],
    theme: {
      type: String,
      default: 'light',
      validator: (val: string) => {
        return ['light', 'dark'].indexOf(val) !== -1;
      }
    }
  },

  data() {
    const items: { [x: string]: any } = {};

    return {
      items,
      activeKey: this.defaultActiveKey
    };
  },

  watch: {
    defaultActiveKey(val) {
      if (this.activeKey != val) {
        this.activeKey = val;
      }
    }
  },

  created() {
    provide('rootMenu', this);
  },

  mounted() {
    if (!this.activeKey) {
      const key = Object.keys(this.items)[0];
      this.activeKey = this.items[key] ? this.items[key].key : 0;
    }
  },

  methods: {
    updateKeys() {
      // const { $slots, activeKey } = this;
    },

    handleItemClick(index: any) {
      this.activeKey = index;
      this.$emit('select', index);
    },

    addItem(item: any) {
      this.items[item.key] = item;
    },

    removeItem(item: any) {
      delete this.items[item.key];
    }
  },

  render() {
    const { mode, prefixCls, $attrs, theme } = this;

    const { className } = $attrs;
    const inputProps = {
      class: {
        [`${className}`]: className,
        [`${prefixCls}`]: true,
        [`${prefixCls}-${mode}`]: mode,
        [`${prefixCls}-${theme}`]: theme !== 'light'
      }
    };

    return <ul {...inputProps}>{getSlot(this)}</ul>;
  }
});
