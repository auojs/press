import { defineComponent } from 'vue';
import feather from 'feather-icons';
import GlobalMixin from '../_mixins/global';

const AuoIcon: { [x: string]: string } = {
  spin: `<svg data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024" focusable="false"><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg>`
};

export default defineComponent({
  name: 'AuoIcon',
  mixins: [GlobalMixin('icon')],
  props: {
    type: {
      type: String,
      required: true,
      validator: (val: string) => {
        return (
          Object.keys(feather.icons).indexOf(val) !== -1 || Object.keys(AuoIcon).indexOf(val) !== -1
        );
      }
    },
    size: {
      type: [String, Number],
      default: 18
    }
  },
  render() {
    const { prefixCls, type, size, $attrs } = this;

    const iconProps = {
      ...$attrs,
      class: {
        [`${prefixCls}`]: true,
        [`${prefixCls}-${type}`]: type
      }
    };

    const svg = feather.icons[type]
      ? feather.icons[type].toSvg({
          width: size,
          height: size
        })
      : AuoIcon[type];

    return <span {...iconProps} v-html={svg} />;
  }
});
