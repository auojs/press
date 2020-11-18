import { createApp as vueCreateApp } from 'vue';
import App from './app';
import router from './router';

export async function createApp() {
  const app = vueCreateApp(App);
  app.use(router);

  return { app, router };
}
