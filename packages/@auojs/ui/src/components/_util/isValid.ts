// https://github.com/vueComponent/ant-design-vue/blob/next/components/_util/isValid.ts
const isValid = (value: any): boolean => {
  return value !== undefined && value !== null && value !== '';
};
export default isValid;
