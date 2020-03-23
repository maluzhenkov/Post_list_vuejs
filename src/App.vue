<template>
  <div class="app">
    <b-navbar class="is-primary" wrapper-class="container">
      <template slot="end">
        <b-navbar-item tag="router-link" :to="{name: 'Login'}">Логин</b-navbar-item>
      </template>
    </b-navbar>
    <main class="content is-light">
      <router-view />
    </main>
  </div>
</template>

<style>
.root {
  height: 100vh;
  max-height: 1000px;
}
.content {
  height: 100%;
}
</style>