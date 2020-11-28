import { defineComponent, provide } from 'vue';
import GlobalMixin from '../_mixins/global';

export default defineComponent({
  name: 'AuoLayout',
  mixins: [GlobalMixin('layout')],
  props: {},
  data() {
    return {
      siders: [],
      headerShow: true
    } as { siders: string[]; headerShow: boolean };
  },
  created() {
    provide('siderHook', {
      addSider: (id: string) => {
        this.siders = [...this.siders, id];
      },
      removeSider: (id: string) => {
        this.siders = this.siders.filter(
          (currentId: string) => currentId !== id
        );
      }
    });

    provide('headerHook', {
      setShow: (show: boolean) => {
        this.headerShow = show;
      }
    });
  },
  render() {
    const { prefixCls, $slots, headerShow } = this;

    const layoutProps = {
      class: {
        [`${prefixCls}`]: true,
        [`${prefixCls}-has-sider`]: this.siders.length > 0,
        [`${prefixCls}-has-header`]: !headerShow
      },
      onScroll: (e: Event) => {}
    };

    return (
      <div {...layoutProps}>{$slots.default ? $slots.default() : null}</div>
    );
  }
});
