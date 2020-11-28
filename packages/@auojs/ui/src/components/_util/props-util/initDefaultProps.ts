// https://github.com/vueComponent/ant-design-vue/blob/next/components/_util/props-util/initDefaultProps.ts
// import { PropType } from 'vue';
import { VueTypeValidableDef } from 'vue-types';

const initDefaultProps = <T>(types: T, defaultProps: any): T => {
  // const propTypes: T = { ...types } as T;
  const propTypes: any = { ...types };
  Object.keys(defaultProps).forEach((k) => {
    const prop = propTypes[k] as VueTypeValidableDef;
    if (prop) {
      prop.default = defaultProps[k];
    } else {
      throw new Error(`not have ${k} prop`);
    }
  });
  return propTypes;
};

export default initDefaultProps;
