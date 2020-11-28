export default {
  "pages": [
    {
      "key": "a-1c27fb66",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/components/alert.md",
      "relativePath": "components/alert.md",
      "regularPath": "/components/alert.html",
      "title": "Alert 警告提示"
    },
    {
      "key": "a-84d731da",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/components/anchor.md",
      "relativePath": "components/anchor.md",
      "regularPath": "/components/anchor.html",
      "title": "Anchor 锚点"
    },
    {
      "key": "a-7e795514",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/components/button.md",
      "relativePath": "components/button.md",
      "regularPath": "/components/button.html",
      "title": "Button 按钮"
    },
    {
      "key": "a-35faccd0",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/components/card.md",
      "relativePath": "components/card.md",
      "regularPath": "/components/card.html",
      "title": "Card 卡片"
    },
    {
      "key": "a-370601ae",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/components/changelog.md",
      "relativePath": "components/changelog.md",
      "regularPath": "/components/changelog.html",
      "title": "更新日志"
    },
    {
      "key": "a-78869d6e",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/components/divider.md",
      "relativePath": "components/divider.md",
      "regularPath": "/components/divider.html",
      "title": "Divider 分割线"
    },
    {
      "key": "a-2d88c2ac",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/components/faq.md",
      "relativePath": "components/faq.md",
      "regularPath": "/components/faq.html",
      "title": "常见问题"
    },
    {
      "key": "a-c96f5fec",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/components/getting-started.md",
      "relativePath": "components/getting-started.md",
      "regularPath": "/components/getting-started.html",
      "title": "快速上手"
    },
    {
      "key": "a-25abf38f",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/components/icon.md",
      "relativePath": "components/icon.md",
      "regularPath": "/components/icon.html",
      "title": "Icon 图标"
    },
    {
      "key": "a-6e265e7e",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/components/layout.md",
      "relativePath": "components/layout.md",
      "regularPath": "/components/layout.html",
      "title": "Layout 布局"
    },
    {
      "key": "a-06b8ae2e",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/components/menu.md",
      "relativePath": "components/menu.md",
      "regularPath": "/components/menu.html",
      "title": "Menu 菜单"
    },
    {
      "key": "a-44db14ca",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/components/message.md",
      "relativePath": "components/message.md",
      "regularPath": "/components/message.html",
      "title": "Message 全局提示"
    },
    {
      "key": "a-248bcd7a",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/components/README.md",
      "relativePath": "components/README.md",
      "regularPath": "/components/",
      "title": "Ant Design of Vue"
    },
    {
      "key": "a-4c84b726",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/components/spin.md",
      "relativePath": "components/spin.md",
      "regularPath": "/components/spin.html",
      "title": "Spin 加载中"
    },
    {
      "key": "a-37c400d0",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/guide/design.md",
      "relativePath": "guide/design.md",
      "regularPath": "/guide/design.html",
      "title": "设计原则"
    },
    {
      "key": "a-265ae7de",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/guide/nav.md",
      "relativePath": "guide/nav.md",
      "regularPath": "/guide/nav.html",
      "title": "导航"
    },
    {
      "key": "a-38e563fb",
      "path": "D:/auojs/press/packages/@auojs/ui/docs/README.md",
      "relativePath": "README.md",
      "regularPath": "/",
      "title": "网站快速成型工具"
    }
  ],
  "title": "Hello VuePress",
  "description": "Just playing around",
  "theme": "@auojs/press-theme-default",
  "themeConfig": {
    "logo": "/assets/img/logo.png",
    "nav": [
      {
        "text": "指南",
        "link": "/guide/design"
      },
      {
        "text": "组件",
        "link": "/components/"
      }
    ],
    "sider": {
      "/guide/": [
        "design",
        "nav"
      ],
      "/components/": [
        "",
        "getting-started",
        "changelog",
        "faq",
        {
          "title": "组件",
          "collapsable": false,
          "children": [
            "button",
            "icon",
            "layout",
            "menu",
            "divider",
            "card",
            "anchor",
            "message",
            "spin",
            "alert"
          ]
        }
      ]
    }
  }
};