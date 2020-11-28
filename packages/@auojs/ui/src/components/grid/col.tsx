import { defineComponent, inject } from 'vue';
import GlobalMixin from '../_mixins/global';

export default defineComponent({
  name: 'AuoCol',
  mixins: [GlobalMixin('col')],
  props: {
    span: {
      type: [String, Number]
    },
    order: {
      type: [String, Number]
    },
    offset: {
      type: [String, Number]
    },
    push: {
      type: [String, Number]
    },
    pull: {
      type: [String, Number]
    },
    xs: {
      type: [Object, String, Number]
    },
    sm: {
      type: [Object, String, Number]
    },
    md: {
      type: [Object, String, Number]
    },
    lg: {
      type: [Object, String, Number]
    },
    xl: {
      type: [Object, String, Number]
    },
    xxl: {
      type: [Object, String, Number]
    },
    flex: {
      type: [String, Number]
    }
  },
  setup() {
    return {
      rowContext: inject('rowContext', null)
    };
  },
  methods: {
    parseFlex(flex: String | Number) {
      if (typeof flex === 'number') {
        return `${flex} ${flex} auto`;
      }
      if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex.toString())) {
        return `0 0 ${flex}`;
      }
      return flex;
    }
  },
  render() {
    const { span, order, offset, push, pull, flex, prefixCls, rowContext, $slots } = this;

    let sizeClassObj: { [x: string]: any } = {};
    ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach((size) => {
      let sizeProps: { [x: string]: any } = {};
      const propSize = (this as any)[size];
      if (typeof propSize === 'number') {
        sizeProps.span = propSize;
      } else if (typeof propSize === 'object') {
        sizeProps = propSize || {};
      }

      sizeClassObj = {
        ...sizeClassObj,
        [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
        [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
        [`${prefixCls}-${size}-offset-${sizeProps.offset}`]:
          sizeProps.offset || sizeProps.offset === 0,
        [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
        [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0
      };
    });

    const classes = {
      [`${prefixCls}`]: true,
      [`${prefixCls}-${span}`]: span !== undefined,
      [`${prefixCls}-order-${order}`]: order,
      [`${prefixCls}-offset-${offset}`]: offset,
      [`${prefixCls}-push-${push}`]: push,
      [`${prefixCls}-pull-${pull}`]: pull,
      ...sizeClassObj
    };

    const divProps: any = {
      class: classes,
      style: {}
    };

    if (rowContext) {
      const gutter = (rowContext as any).getGutter();
      if (gutter) {
        divProps.style = {
          ...(gutter[0] > 0
            ? {
                paddingLeft: `${gutter[0] / 2}px`,
                paddingRight: `${gutter[0] / 2}px`
              }
            : {}),
          ...(gutter[1] > 0
            ? {
                paddingTop: `${gutter[1] / 2}px`,
                paddingBottom: `${gutter[1] / 2}px`
              }
            : {})
        };
      }
    }
    if (flex) {
      divProps.style.flex = this.parseFlex(flex);
    }

    return <div {...divProps}>{$slots.default ? $slots.default() : null}</div>;
  }
});
