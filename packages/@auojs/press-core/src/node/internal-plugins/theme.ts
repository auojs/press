import AuoPress from '../AuoPress';

export const apply = (cx: AuoPress) => {
  const theme: any = {
    layout: `${cx.injdata.theme}/layouts/Layout`
  };

  const code = `${Object.keys(theme).map(
    (key) => `import ${key} from ${JSON.stringify(theme[key])};\n`
  )}

export {${Object.keys(theme).join(',\n')}};`;

  return { name: 'layout.js', content: code };
};
