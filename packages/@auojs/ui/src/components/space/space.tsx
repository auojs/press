import { defineComponent } from 'vue';
import GlobalMixin from '../_mixins/global';

const spaceSize: { [x: string]: number } = {
  small: 8,
  middle: 16,
  large: 24
};

export default defineComponent({
  name: 'AuoSpace',
  mixins: [GlobalMixin('space')],
  props: {
    align: {
      type: String,
      validator: (val: string) => {
        return ['start', 'end', 'center', 'baseline'].indexOf(val) !== -1;
      }
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: (val: string) => {
        return ['vertical', 'horizontal'].indexOf(val) !== -1;
      }
    },
    size: {
      type: [String, Number],
      default: 'small',
      validator: (val: string | number) => {
        return (
          ['small', 'middle', 'large'].indexOf(val.toString()) !== -1 || typeof val === 'number'
        );
      }
    }
  },
  render() {
    const { align, size, direction, prefixCls, $slots } = this;

    const items = $slots.default && $slots.default();
    const len = items ? items.length : 0;
    const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;

    const someSpaceClass = {
      [prefixCls]: true,
      [`${prefixCls}-${direction}`]: true,
      // [`${prefixCls}-rtl`]: directionConfig === 'rtl',
      [`${prefixCls}-align-${mergedAlign}`]: mergedAlign
    };

    const itemClassName = `${prefixCls}-item`;
    const marginDirection = 'marginRight'; // directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';

    return (
      <div class={someSpaceClass}>
        {items &&
          items.map((child, i) => (
            <div
              class={itemClassName}
              key={`${itemClassName}-${i}`}
              style={
                i === len - 1
                  ? {}
                  : {
                      [direction === 'vertical' ? 'marginBottom' : marginDirection]:
                        typeof size === 'string' ? `${spaceSize[size]}px` : `${size}px`
                    }
              }
            >
              {child}
            </div>
          ))}
      </div>
    );
  }
});
