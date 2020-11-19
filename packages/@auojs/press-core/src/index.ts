import AuoPress, { AuoPressConfig } from './node/AuoPress';

async function dev(config: AuoPressConfig) {
  const app = new AuoPress(config);
  await app.process();
  return app.dev();
}

async function build(config: AuoPressConfig) {
  const app = new AuoPress(config);
  await app.process();
  return app.build();
}

export { build, dev };
