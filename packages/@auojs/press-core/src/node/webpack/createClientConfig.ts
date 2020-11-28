import path from 'path';
import webpack from 'webpack';
import Process from '../AuoPress/Process';
import { createBaseConfig } from './createBaseConfig';

export function createClientConfig(cx: Process) {
  const config: webpack.Configuration = createBaseConfig(cx);
  config.entry = {
    app: [path.resolve(__dirname, '../../client/clientEntry')]
  };

  return config;
}
