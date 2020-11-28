import { defineComponent, App as _App } from 'vue';
import { createCls } from '../_util/prefixCls';
import { getConfig } from './../_util/config';

export default (name: string) => {
  return defineComponent({
    inheritAttrs: false,
    data() {
      return {
        prefixCls: createCls(getConfig('prefixCls'), name)
      };
    }
  });
};

// export const LoadingClickMixn = () => {
//   return defineComponent({
//     methods: {
//       handleLoadingClick(_event: Event) {
//         this.$emit('click', _event);
//       }
//     }
//   });
// };
