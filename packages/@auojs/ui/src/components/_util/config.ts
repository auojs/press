export const config: { [x: string]: any } = {};

export const setConfig = (key: string, value: any) => {
  if (config[key] !== value) config[key] = value;
};

export const getConfig = (key: string) => {
  return config[key];
};
