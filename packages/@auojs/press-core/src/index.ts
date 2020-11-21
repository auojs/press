import AuoPress, { AuoPressConfig } from './node/AuoPress';

async function dev(config: AuoPressConfig) {
  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'development';
  }
  const app = new AuoPress(config);
  await app.process();
  return app.dev();
}

async function build(config: AuoPressConfig) {
  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'production';
  }
  const app = new AuoPress(config);
  await app.process();
  return app.build();
}

export { build, dev };
