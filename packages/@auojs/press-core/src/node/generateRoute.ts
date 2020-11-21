import { fs, path } from '@auojs/shared-utils';
import { RouteRecordRaw, RouterView } from 'vue-router';
import { defineComponent, h } from 'vue';

const routView = defineComponent({
  render() {
    return h('div', { id: 'route' }, h(RouterView));
  }
});

export function generateRoutes(
  dir: string,
  route: string = ''
): RouteRecordRaw[] {
  let routes: RouteRecordRaw[] = [];
  fs.readdirSync(dir).forEach((f: string) => {
    const route_path = path.join(route, f);
    const routeDir = path.resolve(dir, f);
    if (fs.statSync(routeDir).isDirectory()) {
      if (f !== '.auopress') {
        routes = routes.concat(generateRoutes(routeDir, route_path));
      }
    } else {
      routes.push({
        path: route_path,
        name: `v-${f}`,
        component: () => import(routeDir)
      });
    }
  });

  return routes;
}

export function generateRoute(dir: string): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  fs.readdirSync(dir).forEach((f: string) => {
    const routeDir = path.resolve(dir, f);
    // 目录
    if (fs.statSync(routeDir).isDirectory()) {
      if (f !== '.auopress') {
        routes.push({
          path: `/${f}`,
          name: f,
          component: routView,
          children: generateRoute(routeDir)
        });
      }
    } else {
      routes.push({
        path: `/${f}`,
        name: f,
        component: () => import(routeDir)
      });
    }
  });

  return routes;
}
