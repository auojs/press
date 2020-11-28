import { defineComponent, inject, PropType } from 'vue';
import GlobalMixin from '../_mixins/global';

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

type HeaderMode = 'fixed' | 'auto-fiexd' | '';

export default defineComponent({
  name: 'AuoLayoutHeader',

  mixins: [GlobalMixin('layoutHeader')],

  props: {
    target: {
      type: Object,
      default: getDefaultTarget
    },
    mode: String as PropType<HeaderMode>,
    affix: Boolean
  },

  data() {
    return {
      timeout: 0,
      scrollY: 0,
      fixed: 'show',
      uniqueId: generateId('ant-sider-')
    };
  },

  setup() {
    return {
      headerHook: inject('headerHook', { setShow: (show: boolean) => {} })
    };
  },

  mounted() {
    const { target } = this;
    if (target) {
      this.timeout = setTimeout(() => {
        target.addEventListener('scroll', (e: Event) => {
          this.setScrollY(target.scrollY);
        });
      });
    }
  },

  watch: {
    fixed(val: string) {
      if (this.headerHook.setShow) {
        this.headerHook.setShow(!!val);
      }
    }
  },

  methods: {
    setScrollY(y: number) {
      if (this.scrollY !== y) {
        if (!y) {
          this.fixed = 'show';
        } else if (this.scrollY > y) {
          this.fixed = 'show';
        } else if (this.scrollY > 320 && y > this.scrollY) {
          this.fixed = '';
        }

        this.scrollY = y;
      }
    },

    show() {
      setTimeout(() => {
        this.isShow = true;
      }, 3000);
    }
  },

  render() {
    const { fixed, mode, affix, prefixCls, $slots } = this;

    const headerProps: any = {
      class: {
        [`${prefixCls}`]: true,
        [`${prefixCls}-affix`]: affix,
        [`${prefixCls}-${mode}`]: mode
      }
    };

    if (mode) {
      headerProps[mode] = fixed;
    }

    return (
      <header {...headerProps}>
        {$slots.default ? $slots.default() : null}
      </header>
    );
  }
});
