import {
  RouteLocationNormalizedLoaded,
  Router,
  createRouter,
  createWebHistory
} from 'vue-router';
import { Ref } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $router: Router;
    $route: Ref<RouteLocationNormalizedLoaded>;
  }
}

// RouteRecordRaw

const router = createRouter({
  history: createWebHistory(),
  routes: []
});

export default router;
