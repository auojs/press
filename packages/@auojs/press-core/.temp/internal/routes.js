export const routes = [
  {
    name: "a-1c27fb66",
    path: "/components/alert.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/components/alert.md")
  },
  {
    name: "a-84d731da",
    path: "/components/anchor.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/components/anchor.md")
  },
  {
    name: "a-7e795514",
    path: "/components/button.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/components/button.md")
  },
  {
    name: "a-35faccd0",
    path: "/components/card.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/components/card.md")
  },
  {
    name: "a-370601ae",
    path: "/components/changelog.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/components/changelog.md")
  },
  {
    name: "a-78869d6e",
    path: "/components/divider.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/components/divider.md")
  },
  {
    name: "a-2d88c2ac",
    path: "/components/faq.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/components/faq.md")
  },
  {
    name: "a-c96f5fec",
    path: "/components/getting-started.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/components/getting-started.md")
  },
  {
    name: "a-25abf38f",
    path: "/components/icon.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/components/icon.md")
  },
  {
    name: "a-6e265e7e",
    path: "/components/layout.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/components/layout.md")
  },
  {
    name: "a-06b8ae2e",
    path: "/components/menu.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/components/menu.md")
  },
  {
    name: "a-44db14ca",
    path: "/components/message.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/components/message.md")
  },
  {
    name: "a-248bcd7a",
    path: "/components/",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/components/README.md")
  },
  {
    name: "a-4c84b726",
    path: "/components/spin.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/components/spin.md")
  },
  {
    name: "a-37c400d0",
    path: "/guide/design.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/guide/design.md")
  },
  {
    name: "a-265ae7de",
    path: "/guide/nav.html",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/guide/nav.md")
  },
  {
    name: "a-38e563fb",
    path: "/",
    component: ()=> import("D:/auojs/press/packages/@auojs/ui/docs/README.md")
  },
  {
    name: "error",
    path: "/:catchAll(.*)",
    component: ()=> import("@app/components/error.vue")
  }
];
