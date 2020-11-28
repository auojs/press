import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@internal/routes';

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;
