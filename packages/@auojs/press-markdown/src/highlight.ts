import prism from 'prismjs';

require('prismjs/components/prism-jsx');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-tsx');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-json');

require('prismjs/plugins/line-highlight/prism-line-highlight');

function wrap(code: string, lang: string) {
  if (lang === 'text') {
    code = code;
  }
  return `<pre v-pre class="language-${lang}" data-line="5"><code>${code}</code></pre>`;
}

function getLangCodeFromExtension(extension: string) {
  const extensionMap: { [x: string]: string } = {
    vue: 'markup',
    html: 'markup',
    md: 'markdown',
    rb: 'ruby',
    ts: 'typescript',
    py: 'python',
    sh: 'bash',
    yml: 'yaml',
    styl: 'stylus',
    kt: 'kotlin',
    rs: 'rust'
  };

  return extensionMap[extension] || extension;
}

function loader(str: string, lang: string) {
  if (!lang) {
    return wrap(str, 'text');
  }
  lang = lang.toLowerCase();
  const rawLang = lang;

  lang = getLangCodeFromExtension(lang);

  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang);
    return wrap(code, rawLang);
  }
  return wrap(str, 'text');
}

export default loader;
