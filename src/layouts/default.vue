<template>
  <div class="app">
    <b-navbar class="is-primary" wrapper-class="container">
      <template slot="start">
        <div class="level is-flex" v-if="user">
          <b-button
            class="mr-3"
            v-if="user.role == 'writer'"
            type="is-success"
            @click="$router.push({name: 'PostEdit'})"
          >Добавить пост</b-button>
          <div>
            Пользователь: {{user.login}}.
            <br />
            Роль: {{user.role}}
          </div>
        </div>
      </template>
      <template slot="end">
        <b-navbar-item @click="goTo">{{isAuth ? 'Выйти' : 'Войти'}}</b-navbar-item>
      </template>
    </b-navbar>
    <main class="pt-4 is-light">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    isAuth() {
      return this.$store.getters.getIsAuth;
    },
  },
  methods: {
    goTo() {
      if (this.isAuth) {
        this.$store.dispatch("logout");
      }
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style>
.app {
  height: 100vh;
  max-height: 1000px;
}
.pt-2 {
  padding-top: 2em;
}
</style>