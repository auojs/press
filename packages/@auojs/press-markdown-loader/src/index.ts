import md from '@auojs/press-markdown';

function loader(source: string) {
  const code = md.render(source);
  return code;
}

export default loader;
