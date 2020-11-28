import { defineComponent } from 'vue';
import Icon from '../icon';
import GlobalMixin from '../_mixins/global';
import { getSlot } from '../_util/instance';

const Button = defineComponent({
  name: 'AuoButton',

  mixins: [GlobalMixin('btn')],

  props: {
    disabled: Boolean,
    ghost: Boolean,
    loading: Boolean,
    block: Boolean,
    htmltype: String,
    icon: String,
    shape: String,
    size: {
      type: String,
      default: 'default',
      validator: (val: string) => {
        return ['small', 'large', 'default'].indexOf(val) !== -1;
      }
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  emits: {
    click: null
  },

  data() {
    return {
      sLoading: this.loading
    };
  },

  watch: {
    loading(val) {
      if (this.sLoading !== val) {
        this.sLoading = val;
      }
    }
  },

  methods: {
    getClasses() {
      const { sLoading, type, prefixCls, $attrs } = this;
      return {
        [`${$attrs.class}`]: $attrs.class,
        [`${prefixCls}`]: true,
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-loading`]: sLoading
      };
    },
    handleClick(_event: Event) {
      const { sLoading } = this.$data;
      if (sLoading) {
        return;
      }

      this.$emit('click', _event);
    }
  },

  render() {
    const { sLoading, handleClick, $attrs } = this;
    const classes = this.getClasses();

    const buttonProps = {
      ...$attrs,
      class: classes,
      onClick: handleClick
    };

    const iconNode = sLoading ? <Icon type='spin' /> : null;

    return (
      <button {...buttonProps}>
        {iconNode}
        {getSlot(this)}
      </button>
    );
  }
});

export default Button;
