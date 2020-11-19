import fs from 'fs';

function resolveTheme(theme: any) {
  theme = theme;

  // 本地主题
  if (!fs.existsSync(theme)) {
  }
}

export { resolveTheme };
