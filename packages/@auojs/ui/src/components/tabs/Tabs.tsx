import { defineComponent, provide } from 'vue';
import GlobalMixin from '../_mixins/global';
import { getSlot } from '../_util/instance';

export default defineComponent({
  name: 'AuoTabs',

  mixins: [GlobalMixin('tabs')],

  emits: ['update:activeKey'],

  props: {
    activeKey: String,
    tabPosition: {
      type: String,
      default: 'top',
      validator: (val: string) => {
        return ['top', 'bottom', 'left', 'right'].indexOf(val) !== -1;
      }
    }
  },

  created() {
    provide('rootContext', this);
  },

  methods: {
    handleTabBarClick(key: string) {
      this.$emit('update:activeKey', key);
    }
  },

  render() {
    const { tabPosition, activeKey, prefixCls, handleTabBarClick } = this;
    const children: any[] | null = getSlot(this);
    let tabBar;
    if (children) {
      tabBar = children.map((item) => {
        const { key, tab } = item.props;

        const barProps = {
          class: {
            [`${prefixCls}-tab`]: true,
            [`${prefixCls}-tab-active`]: activeKey == key
          },
          onClick: () => handleTabBarClick(key)
        };

        return <div {...barProps}>{tab}</div>;
      });
    }

    const contentCls = {
      [`${prefixCls}-${tabPosition}-content`]: true,
      [`${prefixCls}-content`]: true
    };

    return (
      <div class={{ [`${prefixCls}`]: true }}>
        <div class={{ [`${prefixCls}-bar`]: true }}>
          <div class={{ [`${prefixCls}-nav`]: true }}>{tabBar}</div>
        </div>
        <div class={contentCls}>{children}</div>
      </div>
    );
  }
});
