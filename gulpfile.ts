import { buildGulp } from './build/build';
import { devGulp } from './build/dev';
import { loopTargets } from './build/lib/utils';

const gulpTask = (callback: Function) => {
  return (cb: any) => {
    loopTargets(callback);
    cb();
  };
};

export const build = gulpTask(buildGulp);
export const dev = gulpTask(devGulp);
