import AuoPress, { Page } from '../AuoPress';

export const apply = (cx: AuoPress) => {
  const pages = cx.injdata.pages;

  const code = `export const routes = [
  ${pages.map((page) => createRoute(page)).join(',\n  ')},
  {
    name: "error",
    path: "/:catchAll(.*)",
    component: ()=> import("@app/components/error.vue")
  }
];\n`;
  return { name: 'routes.js', content: code };
};

export function createRoute(page: Page): string {
  return `{
    name: ${JSON.stringify(page.key)},
    path: ${JSON.stringify(page.regularPath)},
    component: ()=> import(${JSON.stringify(page.path)})
  }`;
}
