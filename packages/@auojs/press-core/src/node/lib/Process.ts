import webpack from 'webpack';

export default class Process {
  constructor() {}

  compile(config: webpack.Configuration) {
    return new Promise((resolve, reject) => {
      webpack(config, (err: Error, stats: webpack.Stats) => {
        if (err) reject(err);
        //
      });
    });
  }
}
