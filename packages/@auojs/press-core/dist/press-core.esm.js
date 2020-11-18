import path from 'path';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader-v16';

const config = {
    mode: 'development',
    // 入口
    entry: '',
    // 出口
    output: {
        // webpack 如何输出结果的相关选项
        path: path.resolve(__dirname, 'dist'),
        // 所有输出文件的目标路径
        // 必须是绝对路径（使用 Node.js 的 path 模块）
        // string    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
        filename: 'bundle.js',
        // string    // 输出解析文件的目录，url 相对于 HTML 页面
        publicPath: '/assets/',
        // 导出库(exported library)的名称
        library: 'MyLibrary',
        // 通用模块定义    // 导出库(exported library)的类型
        libraryTarget: 'umd'
    },
    // 模块配置
    module: {
        rules: [
            {
                test: /\.jsx?$/
            }
        ]
    },
    // 解析模块选项
    resolve: {},
    devtool: '',
    context: '',
    target: 'web',
    externals: [],
    stats: 'none',
    // devServer: {},
    plugins: []
};
function createBaseConfig(context) {
    const { outDir } = context.config;
    return {
        mode: 'production',
        output: {
            path: outDir,
            filename: 'assets/js/[name].js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['.md', '.js', 'jsx', '.vue', '.json', '.less']
        },
        module: {
            rules: [
                {
                    test: /\.vue?$/,
                    loader: 'vue-loader-v16'
                }
            ]
        },
        plugins: [new VueLoaderPlugin()]
    };
}

function createClientConfig(context) {
    const config = createBaseConfig(context);
    config.entry = {
        app: [path.resolve(__dirname, 'client/clientEntry')]
    };
    return config;
}

function compile(config) {
    return new Promise((resolve, reject) => {
        webpack(config, (err, stats) => {
            if (err) {
                reject(err);
            }
            if (stats.hasErrors()) {
                stats.toJson().errors.forEach((error) => {
                    console.error(error);
                });
                reject(new Error(`Failed to compile with errors.`));
                return;
            }
        });
    });
}
class Build {
    constructor(context) {
        this.context = context;
    }
    async process() {
        this.getWebpackConfig();
    }
    async render() {
        compile(this.webpackConfig);
    }
    getWebpackConfig() {
        this.webpackConfig = createClientConfig(this.context);
        console.log(this.webpackConfig);
    }
}

class AuoPress {
    constructor(config) {
        this.config = config;
        // 配置目录
        if (!this.config.auopressDir) {
            this.config.auopressDir = path.resolve(this.config.sourceDir, '.auopress');
        }
        if (!this.config.outDir) {
            this.config.outDir = path.resolve(this.config.auopressDir, 'dist');
        }
    }
    async process() { }
    async build() {
        this.buildProcess = new Build(this);
        await this.buildProcess.process();
        await this.buildProcess.render();
        return this;
    }
}

async function build(config) {
    console.log(config, 'config');
    const app = new AuoPress(config);
    await app.process();
    return app.build();
}

export { build };
