module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  theme: '@auojs/press-theme-default',
  themeConfig: {
    logo: '/assets/img/logo.png',
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '指南',
        link: '/guide/'
      }
    ],
    sider: {
      '/guide/': ['', 'getting-started']
    } // Array|Object
  }
};
