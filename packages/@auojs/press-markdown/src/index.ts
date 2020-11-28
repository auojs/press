import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';
import container from './container';
import highlight from './highlight';
import keyWordsAnchor from './key-words-anchor';

const md = new MarkdownIt({
  html: true,
  highlight
});

md.use(anchor, {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '#',
  permalinkClass: 'anchor',
  permalinkSpace: false
});

md.use(keyWordsAnchor, {
  keys: {
    VuePress: 'https://www.vuepress.cn/guide/getting-started.html'
  }
});

md.use(container);

export { MarkdownIt, Token, Renderer, highlight };

export default md;
