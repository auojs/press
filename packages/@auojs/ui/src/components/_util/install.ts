import { App as _App } from 'vue';
export default (_app: any, child: any[] = []) => {
  _app.install = (app: _App) => {
    app.component(_app.name, _app);
    child.forEach((item) => {
      app.component(item.name, item);
    });
  };
  return _app;
};
