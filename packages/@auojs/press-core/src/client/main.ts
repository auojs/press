import {
  createApp as vueCreateApp,
  createSSRApp as vueCreateSSRApp
} from 'vue';
import App from './App';
import router from './router';

export async function createApp() {
  const app = vueCreateApp(App);
  app.use(router);

  return { app, router };
}

export async function createSSRApp() {
  const app = vueCreateSSRApp(App);
  app.use(router);

  return { app, router };
}
