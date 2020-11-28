// https://github.com/vueComponent/ant-design-vue/blob/next/components/_util/props-util/index.js
import isPlainObject from 'lodash-es/isPlainObject';
import { Comment, Fragment, isVNode, Text } from 'vue';
import classNames from '../classNames';
import isValid from '../isValid';
import { camelize, isOn, resolvePropValue } from '../util';

// function getType(fn) {
//   const match = fn && fn.toString().match(/^\s*function (\w+)/);
//   return match ? match[1] : '';
// }

const splitAttrs = (attrs: any) => {
  const allAttrs = Object.keys(attrs);
  const eventAttrs: any = {};
  const onEvents: any = {};
  const extraAttrs: any = {};
  for (let i = 0, l = allAttrs.length; i < l; i++) {
    const key = allAttrs[i];
    if (isOn(key)) {
      eventAttrs[key[2].toLowerCase() + key.slice(3)] = attrs[key];
      onEvents[key] = attrs[key];
    } else {
      extraAttrs[key] = attrs[key];
    }
  }
  return { onEvents, events: eventAttrs, extraAttrs };
};

const parseStyleText = (cssText = '', camel: any) => {
  const res: any = {};
  const listDelimiter = /;(?![^(]*\))/g;
  const propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiter);
      if (tmp.length > 1) {
        const k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k] = tmp[1].trim();
      }
    }
  });
  return res;
};

const getScopedSlots = (ele: any) => {
  return (ele.data && ele.data.scopedSlots) || {};
};

const getSlots = (ele: any) => {
  let componentOptions = ele.componentOptions || {};
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions || {};
  }
  const children = ele.children || componentOptions.children || [];
  const slots: any = {};
  children.forEach((child: any) => {
    if (!isEmptyElement(child)) {
      const name = (child.data && child.data.slot) || 'default';
      slots[name] = slots[name] || [];
      slots[name].push(child);
    }
  });
  return { ...slots, ...getScopedSlots(ele) };
};

const flattenChildren = (children: any = [], filterempty: boolean = true) => {
  const temp = Array.isArray(children) ? children : [children];
  const res: Array<any> = [];
  temp.forEach((child: any) => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterempty));
    } else if (child && child.type === Fragment) {
      res.push(...flattenChildren(child.children, filterempty));
    } else if (child && isVNode(child)) {
      if (filterempty && !isEmptyElement(child)) {
        res.push(child);
      } else if (!filterempty) {
        res.push(child);
      }
    } else if (isValid(child)) {
      res.push(child);
    }
  });
  return res;
};

const getAllChildren = (ele: any) => {
  let componentOptions = ele.componentOptions || {};
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions || {};
  }
  return ele.children || componentOptions.children || [];
};

const getSlotOptions = () => {
  throw Error('使用 .type 直接取值');
};

const findDOMNode = (instance: any) => {
  let node = instance && (instance.$el || instance);
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
};

const getComponent = (
  instance: any,
  prop: string = 'default',
  options: any = instance,
  execute: boolean = true
) => {
  let com;
  if (instance.$) {
    const temp = instance[prop];
    if (temp !== undefined) {
      return typeof temp === 'function' && execute ? temp(options) : temp;
    } else {
      com = instance.$slots[prop];
      com = execute && com ? com(options) : com;
    }
  }

  if (Array.isArray(com)) {
    com = flattenChildren(com);
    com = com.length === 1 ? com[0] : com;
    com = com.length === 0 ? undefined : com;
  }
  return com;
};

const getPropsData = (ins: any) => {
  const vnode = ins.$ ? ins.$ : ins;
  const res: any = {};
  const originProps = vnode.props || {};
  const props: any = {};
  Object.keys(originProps).forEach((key) => {
    props[camelize(key)] = originProps[key];
  });
  const options = isPlainObject(vnode.type) ? vnode.type.props : {};
  options &&
    Object.keys(options).forEach((k) => {
      const v = resolvePropValue(options, props, k, props[k]);
      if (k in props) {
        // 仅包含 props，不包含默认值
        res[k] = v;
      }
    });
  return { ...props, ...res }; // 合并事件、未声明属性等
};

const getValueByProp = (ele: any, prop: any) => {
  return getPropsData(ele)[prop];
};

const getAttrs = (ele: any) => {
  let data = ele.data;
  if (ele.$vnode) {
    data = ele.$vnode.data;
  }
  return data ? data.attrs || {} : {};
};

const getKey = (ele: any) => {
  const key = ele.key;
  return key;
};

export function getEvents(ele: any = {}, on: any = true) {
  let props: any = {};
  if (ele.$) {
    props = { ...props, ...ele.$attrs };
  } else {
    props = { ...props, ...ele.props };
  }
  return splitAttrs(props)[on ? 'onEvents' : 'events'];
}

export function getEvent(child: any, event: any) {
  return child.props && child.props[event];
}

// 获取 xxx.native 或者 原生标签 事件
export function getDataEvents(child: any) {
  let events = {};
  if (child.data && child.data.on) {
    events = child.data.on;
  }
  return { ...events };
}

// use getListeners instead this.$listeners
// https://github.com/vueComponent/ant-design-vue/issues/1705
export function getListeners(context: any) {
  return (
    (context.$vnode
      ? context.$vnode.componentOptions.listeners
      : context.$listeners) || {}
  );
}

export function getClass(ele: any) {
  const props = (isVNode(ele) ? ele.props : ele.$attrs) || {};
  const tempCls = props.class || {};
  let cls: any = {};
  if (typeof tempCls === 'string') {
    tempCls.split(' ').forEach((c) => {
      cls[c.trim()] = true;
    });
  } else if (Array.isArray(tempCls)) {
    classNames(tempCls)
      .split(' ')
      .forEach((c: any) => {
        cls[c.trim()] = true;
      });
  } else {
    cls = { ...cls, ...tempCls };
  }
  return cls;
}

export function getStyle(ele: any, camel: any) {
  const props = (isVNode(ele) ? ele.props : ele.$attrs) || {};
  let style = props.style || {};
  if (typeof style === 'string') {
    style = parseStyleText(style, camel);
  } else if (camel && style) {
    // 驼峰化
    const res: any = {};
    Object.keys(style).forEach((k) => (res[camelize(k)] = style[k]));
    return res;
  }
  return style;
}

export function getComponentName(opts: any) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

export function isFragment(c: any) {
  return c.length === 1 && c[0].type === Fragment;
}

export function isEmptyElement(c: any) {
  return (
    c.type === Comment ||
    (c.type === Fragment && c.children.length === 0) ||
    (c.type === Text && c.children.trim() === '')
  );
}

export function isStringElement(c: any) {
  return c && c.type === Text;
}

export function filterEmpty(children = []) {
  const res: any = [];
  children.forEach((child: any) => {
    if (Array.isArray(child)) {
      res.push(...child);
    } else if (child.type === Fragment) {
      res.push(...child.children);
    } else {
      res.push(child);
    }
  });
  return res.filter((c: any) => !isEmptyElement(c));
}

const initDefaultProps = (propTypes: any, defaultProps: any) => {
  Object.keys(defaultProps).forEach((k) => {
    if (propTypes[k]) {
      propTypes[k].def && (propTypes[k] = propTypes[k].def(defaultProps[k]));
    } else {
      throw new Error(`not have ${k} prop`);
    }
  });
  return propTypes;
};

export function mergeProps() {
  const args = [].slice.call(arguments, 0);
  const props: any = {};
  args.forEach((p: any = {}) => {
    for (const [k, v] of Object.entries(p)) {
      props[k] = props[k] || {};
      if (isPlainObject(v)) {
        Object.assign(props[k], v);
      } else {
        props[k] = v;
      }
    }
  });
  return props;
}

function isValidElement(element: any) {
  return element && element.__v_isVNode && typeof element.type !== 'symbol'; // remove text node
}

export {
  splitAttrs,
  getComponent,
  getSlotOptions,
  getPropsData,
  getKey,
  getAttrs,
  getValueByProp,
  parseStyleText,
  initDefaultProps,
  isValidElement,
  camelize,
  getSlots,
  getAllChildren,
  findDOMNode,
  flattenChildren
};
