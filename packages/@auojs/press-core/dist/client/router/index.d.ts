import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { Ref } from 'vue';
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $router: Router;
        $route: Ref<RouteLocationNormalizedLoaded>;
    }
}
declare const router: Router;
export default router;
