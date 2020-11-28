const cache: { [x: string]: string } = {};

const getKebabCase = (str: string, partition: string = '-') => {
  str = str.replace(str[0], str[0].toLowerCase());
  const ret = cache[str];
  if (ret) {
    return ret;
  } else {
    return (cache[str] = str.replace(/[A-Z]/g, (i) => {
      return partition + i.toLowerCase();
    }));
  }
};

/**
 *
 * @param suffix 前缀
 * @param prefix 后缀
 * @param attach 参数
 * @param partition 间隔
 */
export function createCls(
  suffix: string | undefined,
  prefix: string | string[] = '',
  attach: string | string[] = '',
  partition: string = '-'
) {
  const ret = [];
  const att = [];

  if (suffix) {
    ret.push(getKebabCase(suffix, partition));
  }

  if (prefix) {
    if (typeof prefix === 'string') {
      ret.push(getKebabCase(prefix, partition));
    } else {
      prefix.map((fix) => {
        ret.push(getKebabCase(fix, partition));
      });
    }
  }

  if (attach) {
    if (typeof attach === 'string') {
      att.push(getKebabCase(attach, partition));
    } else {
      attach.map((fix) => {
        att.push(getKebabCase(fix, partition));
      });
    }
  }

  const rtl = ret.join(partition).toLowerCase();

  if (att.length > 0) {
    att.unshift(rtl);
    return att.join('__').toLowerCase();
  }

  return rtl;
}
