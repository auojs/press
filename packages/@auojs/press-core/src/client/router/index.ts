import { createRouter, createWebHistory } from 'vue-router';
import GlobalLayout from '../components/GlobalLayout';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: '_home',
      component: GlobalLayout,
      redirect: { name: 'Button' },
      children: [
        {
          path: 'button',
          name: 'Button',
          component: () => import('../components/Button')
        }
      ]
    }
  ]
});

export default router;
