<template>
  <section class="layout">
    <header class="layout-header">
      <router-link class="logo" to="/">AuoPress</router-link>
      <div class="links">
        <a href="https:www.baidu.com">GITHUB</a>
        <a href="https:www.baidu.com">GITHUB</a>
        <a href="https:www.baidu.com">GITHUB</a>
        <!-- <router-link>GITHUB</router-link> -->
      </div>
    </header>
    <section class="layout layout-has-sider">
      <aside class="layout-sider"></aside>
      <main class="layout-content">
        <router-view />
      </main>
      <aside class="layout-sider"></aside>
    </section>
  </section>
</template>