<template>
  <div class="container align-center">
    <div class="column box login-form mt-2">
      <h2 class="title has-text-centered">Авторизация</h2>

      <b-field label="Email" :type="isValid('email')" :message="emailFeadback">
        <b-input v-model.trim="email" type="email" maxlength="60"></b-input>
      </b-field>

      <b-field label="Пароль" :type="isValid('password')" :message="passFeadback">
        <b-input v-model.trim="password" type="password" maxlength="30" password-reveal></b-input>
      </b-field>

      <div class="buttons">
        <b-button
          type="is-success"
          expanded
          :disabled="($v.$dirty && $v.$invalid) || loading"
          :loading="loading"
          @click="signin"
        >Войти</b-button>
      </div>
    </div>
    <div class="has-text-centered">
      <div>Writer: user1@gmail.com</div>
      <div>Reader: user2@gmail.com</div>
      <div>password: 123456</div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "Login",
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(2)
    }
  },
  data: () => ({
    email: "user1@gmail.com",
    password: "123456",
    loading: false
  }),
  computed: {
    emailFeadback() {
      if (!this.$v.email.$dirty) return "";
      return !this.$v.email.required
        ? "Введите Email"
        : !this.$v.email.email
        ? "Не корректный Email"
        : "";
    },
    passFeadback() {
      if (!this.$v.password.$dirty) return "";
      return !this.$v.password.required
        ? "Введите пароль"
        : !this.$v.password.minLength
        ? "фыв"
        : "";
    }
  },
  methods: {
    signin() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.loading = true;
        const data = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("signin", data)
          .then(() => {
            this.$router.push("/");
          })
          .catch(error => {
            this.$buefy.toast.open({
              duration: 5000,
              message: error.message,
              position: "is-bottom",
              type: "is-danger"
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    isValid(type) {
      return this.$v[type].$dirty && this.$v[type].$invalid ? "is-danger" : "";
    }
  }
};
</script>

<style>
.mt-2 {
  margin-top: 2em;
}
.login-form {
  width: 400px;
  max-width: 600px;
}
.align-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
