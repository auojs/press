import AuoPress from '../AuoPress';

export const apply = (cx: AuoPress) => {
  const code = `export default ${JSON.stringify(cx.injdata, null, 2)};`;
  return { name: 'sitedata.js', content: code };
};
