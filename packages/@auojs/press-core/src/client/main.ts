import AuoUI from '@auojs/ui';
import '@auojs/ui/dist/styles/index.less';
import sitedata from '@internal/sitedata';
import {
  createApp as vueCreateApp,
  createSSRApp as vueCreateSSRApp
} from 'vue';
import App from './App.vue';
import demoblok from './components/demoblok.vue';
import OutboundLink from './components/OutboundLink.vue';
import router from './router';

export async function createApp() {
  const app = vueCreateApp(App);
  app.use(router);
  app.use(AuoUI);

  app.component('demoblok', demoblok);
  app.component('OutboundLink', OutboundLink);

  app.config.globalProperties.siteConfig = sitedata;

  return { app, router };
}

export async function createSSRApp() {
  const app = vueCreateSSRApp(App);
  app.use(router);

  return { app, router };
}
