module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  theme: '@auojs/press-theme-default',
  themeConfig: {
    logo: '/assets/img/logo.png',
    nav: [
      {
        text: '指南',
        link: '/guide/design'
      },
      {
        text: '组件',
        link: '/components/'
      }
    ],
    sider: {
      '/guide/': ['design', 'nav'],
      '/components/': [
        '',
        'getting-started',
        'changelog',
        'faq',
        {
          title: '组件',
          collapsable: false,
          children: [
            'button',
            'icon',
            'layout',
            'menu',
            'divider',
            'card',
            'anchor',
            'message',
            'spin',
            'alert'
          ]
        }
      ]
    } // Array|Object
  }
};
