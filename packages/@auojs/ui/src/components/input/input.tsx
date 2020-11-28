import { defineComponent } from 'vue';
import GlobalMixin from '../_mixins/global';

export default defineComponent({
  name: 'AuoInput',

  mixins: [GlobalMixin('input')],

  render() {
    const { prefixCls, $attrs } = this;

    const inputProps = {
      ...$attrs,
      class: {
        [`${prefixCls}`]: true
      }
    };

    return <input {...inputProps} />;
  }
});
