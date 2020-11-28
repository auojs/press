declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@internal/routes' {
  import { RouteRecordRaw } from 'vue-router';
  const routes: RouteRecordRaw[];
  export { routes };
}

declare module '@internal/sitedata' {
  const sitedata: any;
  export default sitedata;
}
