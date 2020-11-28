import { MarkdownIt, Renderer, Token } from '@auojs/press-markdown';

export default (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence;

  if (fence) {
    md.renderer.rules.fence = (
      tokens: Token[],
      idx: number,
      options: MarkdownIt.Options,
      env: any,
      self: Renderer
    ) => {
      const rawCode = fence(tokens, idx, options, env, self);
      const lang = tokens[idx].info;
      if (lang !== 'vue') return rawCode;
      const name = `demobock${idx}`;
      return `<${name}/>
      <!-- vue ${name} ${tokens[idx].content} -->`;
    };
  }
};
