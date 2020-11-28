import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import Token from 'markdown-it/lib/token';
import highlight from './highlight';

export default (md: MarkdownIt) => {
  md.use(container, 'demo', {
    validate(params: string) {
      return params.trim().match(/^demo\s+(.*)$/);
    },

    render(tokens: Token[], idx: number) {
      const m = tokens[idx].info.trim().match(/^demo\s+(.*)$/);

      if (tokens[idx].nesting === 1) {
        let hijs;
        for (let index = 1; index < tokens.length - idx; index++) {
          const token = tokens[idx + index];
          if (token.type === 'fence') {
            hijs = highlight(token.content, 'vue');
            break;
          } else if (token.type.indexOf('blockquote') !== -1) {
            token.tag = 'template';
            if (token.type === 'blockquote_open') {
              token.attrSet('v-slot:describe', '');
            }
          }
        }

        return `<demoblok title="${m ? m[1] : ''}">\n
        <template #hijs>${hijs}</template>\n`;
      } else {
        return '</demoblok>\n';
      }
    }
  });
};
