import md from '@auojs/press-markdown';
import { parseFrontmatter } from '@auojs/shared-utils';
import loaderUtils from 'loader-utils';
import qs from 'querystring';
import webpack from 'webpack';
import demoback from './demobock';

demoback(md);

function loader(this: webpack.loader.LoaderContext, source: string) {
  const loaderContext = this;
  const stringifyRequest = (r: string) =>
    loaderUtils.stringifyRequest(loaderContext, r);
  const { resourcePath, resourceQuery } = loaderContext;
  const rawQuery = resourceQuery.slice(1).replace('?', '&');
  const incomingQuery = qs.parse(rawQuery);

  const matter = parseFrontmatter(source.trim());
  const { content } = matter;
  const quote: { [x: string]: string } = {};

  let code = md.render(content);
  code = code.replace(/<\!-- vue (.*?) ([\s\S]*?) -->/g, (match, $1, $2) => {
    quote[$1] = $2;
    return '';
  });

  // 块内组件
  if (
    incomingQuery.md === 'vue' &&
    typeof incomingQuery.mdname === 'string' &&
    quote[incomingQuery.mdname]
  ) {
    return quote[incomingQuery.mdname];
  }

  const codde = `
<template>
  <div>
    ${code}
  </div>
</template>

<script>
${Object.keys(quote)
  .map(
    (key) =>
      `import ${key} from ${stringifyRequest(
        resourcePath + '?md=vue&mdname=' + key
      )}`
  )
  .join(';\n')}

export default {
  components: { ${Object.keys(quote).join(',')} }
};
</script>`;

  return codde;
}

export default loader;
