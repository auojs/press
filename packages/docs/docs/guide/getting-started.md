# 快速上手

本文会帮助你从头搭建一个简单的 AuoPress 文档。如果你想在一个现有的项目中使用 AuoPress 管理文档，从步骤 3 开始。

1. 创建并进入一个新目录

```sh
mkdir vuepress-starter && cd vuepress-starter
```

2. 使用你喜欢的包管理器进行初始化

```sh
yarn init # npm init
```

3. 将 VuePress 安装为本地依赖

我们已经不再推荐全局安装 VuePress

```sh
yarn add -D vuepress # npm install -D vuepress
```

4. 创建你的第一篇文档

```sh
mkdir docs && echo '# Hello VuePress' > docs/README.md
```

5. 在 package.json 中添加一些 scripts

这一步骤是可选的，但我们推荐你完成它。在下文中，我们会默认这些 scripts 已经被添加。

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

6. 在本地启动服务器
