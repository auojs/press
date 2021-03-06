// https://github.com/vueComponent/ant-design-vue/blob/next/components/_util/util.js
export const isFunction = (val: any) => typeof val === 'function';

export const isArray = Array.isArray;
export const isString = (val: any) => typeof val === 'string';
export const isSymbol = (val: any) => typeof val === 'symbol';
export const isObject = (val: any) => val !== null && typeof val === 'object';
const onRE = /^on[^a-z]/;
const isOn = (key: any) => onRE.test(key);

const cacheStringFunction = (fn: any) => {
  const cache = Object.create(null);
  return (str: any) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str: any) => {
  return str.replace(camelizeRE, (_: any, c: any) => (c ? c.toUpperCase() : ''));
});

const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str: any) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

const capitalize = cacheStringFunction((str: any) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val: any, key: any) => hasOwnProperty.call(val, key);

// change from vue sourcecode
function resolvePropValue(options: any, props: any, key: any, value: any) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, 'default');
    // default values
    if (hasDefault && value === undefined) {
      const defaultValue = opt.default;
      value = opt.type !== Function && isFunction(defaultValue) ? defaultValue() : defaultValue;
    }
    // boolean casting
    if (opt[0 /* shouldCast */]) {
      if (!hasOwn(props, key) && !hasDefault) {
        value = false;
      } else if (opt[1 /* shouldCastTrue */] && (value === '' || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}

export function getDataAndAriaProps(props: any) {
  return Object.keys(props).reduce((memo: any, key: any) => {
    if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
      memo[key] = props[key];
    }
    return memo;
  }, {});
}

export { isOn, cacheStringFunction, camelize, hyphenate, capitalize, resolvePropValue };
