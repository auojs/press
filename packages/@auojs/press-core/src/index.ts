import App, { AuoPressConfig } from './node/AuoPress';

async function build(config: AuoPressConfig) {
  console.log(config, 'config');

  const app = new App(config);
  await app.process();
  return app.build();
}

export { build };
