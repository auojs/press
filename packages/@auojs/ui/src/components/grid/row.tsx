import { defineComponent, provide, reactive } from 'vue';
import GlobalMixin from '../_mixins/global';

const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export default defineComponent({
  name: 'AuoRow',
  mixins: [GlobalMixin('row')],
  props: {
    gutter: {
      type: [Object, Number, String, Array]
    },
    type: {
      type: String,
      validator: (val: string) => {
        return ['flex'].indexOf(val) !== -1;
      }
    },
    align: {
      type: String,
      validator: (val: string) => {
        return ['top', 'middle', 'bottom', 'stretch'].indexOf(val) !== -1;
      }
    },
    justify: {
      type: String,
      validator: (val: string) => {
        return ['start', 'end', 'center', 'space-around', 'space-between'].indexOf(val) !== -1;
      }
    }
  },
  data() {
    return {
      screens: {}
    } as { screens: { [x: string]: any } };
  },
  methods: {
    getGutter() {
      const results = [0, 0];
      const { gutter, screens } = this;
      const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, 0];
      normalizedGutter.forEach((g, index) => {
        if (typeof g === 'object') {
          for (let i = 0; i < responsiveArray.length; i++) {
            const breakpoint = responsiveArray[i];
            if (screens[breakpoint] && g[breakpoint] !== undefined) {
              results[index] = g[breakpoint];
              break;
            }
          }
        } else {
          results[index] = g || 0;
        }
      });
      return results;
    }
  },
  render() {
    const { type, justify, align, prefixCls, $slots } = this;

    const gutter = this.getGutter();

    const classes = {
      [prefixCls]: !type,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${type}-${justify}`]: type && justify,
      [`${prefixCls}-${type}-${align}`]: type && align
    };
    const rowStyle = {
      ...(gutter[0] > 0
        ? {
            marginLeft: `${gutter[0] / -2}px`,
            marginRight: `${gutter[0] / -2}px`
          }
        : {}),
      ...(gutter[1] > 0
        ? {
            marginTop: `${gutter[1] / -2}px`,
            marginBottom: `${gutter[1] / -2}px`
          }
        : {})
    };

    return (
      <div class={classes} style={rowStyle}>
        {$slots.default ? $slots.default() : null}
      </div>
    );
  }
});
