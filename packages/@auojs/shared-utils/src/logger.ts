import chalk from 'chalk';

interface LoggerOptions {
  logLevel: number;
}

class Logger {
  options: LoggerOptions;

  constructor(options?: LoggerOptions) {
    this.options = Object.assign(
      {
        logLevel: process.argv.includes('--debug') ? 4 : 3
      },
      options
    );
  }

  // level: 4
  debug(...args: any[]) {
    if (this.options.logLevel < 4) {
      return;
    }

    this.status('magenta', 'debug', ...args);
  }

  // level: 2
  warn(...args: any[]) {
    if (this.options.logLevel < 2) {
      return;
    }
    console.warn(chalk.yellow('[警告]'), ...args);
  }

  // level: 1
  error(...args: any[]) {
    if (this.options.logLevel < 1) {
      return;
    }
    process.exitCode = process.exitCode || 1;
    console.error(chalk.red('[错误]'), ...args);
  }

  // level: 3
  status(color: string, label: string, ...args: any[]) {
    if (this.options.logLevel < 3) {
      return;
    }
  }
}

const example = new Logger();

example.warn('系统载入中');
example.error('系统载入错误');

export default example;
