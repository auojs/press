// https://github.com/vueComponent/ant-design-vue/blob/next/components/_util/classNames.ts
import { isArray, isObject, isString } from './util';
function classNames(...args: any[]): any {
  const classes = [];
  for (const arg of args) {
    const value = arg;
    if (!value) continue;
    if (isString(value)) {
      classes.push(value);
    } else if (isArray(value)) {
      for (const v of value) {
        const inner = classNames(v);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          classes.push(name);
        }
      }
    }
  }

  return classes.join(' ');
}

export default classNames;
