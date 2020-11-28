import { fs, path, hash, fileToPath } from '@auojs/shared-utils';

export function generateRoutes(dir: string, route: string = ''): any {
  let routes: any[] = [];
  fs.readdirSync(dir).forEach((f: string) => {
    const regularPath = route ? `${route}/${f}` : f;

    const routeDir = path.resolve(dir, f);
    if (fs.statSync(routeDir).isDirectory()) {
      if (f !== '.auopress') {
        routes = routes.concat(generateRoutes(routeDir, regularPath));
      }
    } else {
      routes.push({
        path: fileToPath(regularPath),
        name: `auo-${hash(regularPath)}`,
        filePath: routeDir
      });
    }
  });

  return routes;
}
