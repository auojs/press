import { defineComponent, inject } from 'vue';
import GlobalMixin from '../_mixins/global';
import { getSlot } from '../_util/instance';

export default defineComponent({
  name: 'AuoMenuItem',

  mixins: [GlobalMixin('menuItem')],

  props: {
    disabled: Boolean
  },

  data() {
    return {
      key: null
    } as { key: string | number | null };
  },

  computed: {
    active(): boolean {
      return this.key == this.rootMenu.activeKey;
    }
  },

  setup() {
    return {
      rootMenu: inject('rootMenu', {} as any)
    };
  },

  mounted() {
    const { key } = this.$.vnode;
    this.key = key;

    this.rootMenu.addItem(this);
  },

  beforeUnmount() {},

  methods: {
    handleClick() {
      this.rootMenu.handleItemClick(this.key);
    }
  },

  render() {
    const { handleClick, active, disabled, prefixCls, $attrs } = this;

    const inputProps = {
      ...$attrs,
      class: {
        [`${prefixCls}`]: true,
        [`${prefixCls}-active`]: active
      },
      onClick: handleClick
    };

    if (disabled) {
      inputProps.disabled = '';
    }

    return <li {...inputProps}>{getSlot(this)}</li>;
  }
});
