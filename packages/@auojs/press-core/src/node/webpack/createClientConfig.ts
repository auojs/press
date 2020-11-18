import path from 'path';
import webpack from 'webpack';
import AuoPress from '../AuoPress';
import { createBaseConfig } from './createBaseConfig';

export function createClientConfig(context: AuoPress) {
  const config: webpack.Configuration = createBaseConfig(context);
  config.entry = {
    app: [path.resolve(__dirname, 'client/clientEntry')]
  };

  return config;
}
