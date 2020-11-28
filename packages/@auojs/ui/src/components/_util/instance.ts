import { ComponentPublicInstance, VNode } from 'vue';

const ARGSDEFAULT = {
  NAME: 'default'
};

type Instance = ComponentPublicInstance & { [x: string]: any };

export function getComponent(
  self: Instance,
  name: string = ARGSDEFAULT.NAME,
  options = {}
) {
  const slot = getSlot(self, name, options);
  if (slot) return slot;
  return self[name] ? self[name] : null;
}

export function getSlot(
  self: any,
  name: string = ARGSDEFAULT.NAME,
  options = {}
): VNode[] | null {
  const res = self.$slots[name];
  if (res) {
    return res(options);
  }
  return null;
}
