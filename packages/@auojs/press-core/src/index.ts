import { path } from '@auojs/shared-utils';
import AuoPress from './node/AuoPress';
import { AuoPressConfig } from './node/AuoPress/index';

function createAuoPress(
  config: AuoPressConfig,
  nodeEnv: string = 'production'
) {
  if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = nodeEnv;
  }
  config = Object.assign(config, {
    rootDir: path.resolve(__dirname, '..')
  });

  return new AuoPress(config);
}

async function dev(config: AuoPressConfig) {
  const app = createAuoPress(config, 'development');
  await app.process();
  return app.dev();
}

async function build(config: AuoPressConfig) {
  const app = createAuoPress(config);
  await app.process();
  return app.build();
}

export { build, dev };
