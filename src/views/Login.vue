<template>
  <div class="container align-center">
    <div class="column box login-form mt-2">
      <h2 class="title has-text-centered">Авторизация</h2>

      <form @submit.prevent="signin">
        <b-field label="Email" :type="isValid('email')" :message="emailFeadback">
          <b-input v-model.trim="email" type="email" maxlength="60"></b-input>
        </b-field>

        <b-field label="Пароль" :type="isValid('password')" :message="passFeadback">
          <b-input v-model.trim="password" type="password" maxlength="30" password-reveal></b-input>
        </b-field>

        <b-button
          type="is-success"
          native-type="submit"
          expanded
          :disabled="($v.$dirty && $v.$invalid) || loading"
          :loading="loading"
        >Войти</b-button>
      </form>
    </div>
    <div class="has-text-centered">
      <b>
        <i>For test</i>
      </b>
      <div>Writer: writer@mail.com</div>
      <div>Reader: reader@mail.com</div>
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
      email,
    },
    password: {
      required,
      minLength: minLength(2),
    },
  },
  data: () => ({
    email: "writer@mail.com",
    password: "123456",
    loading: false,
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
        ? "Пароль должен состоять минимум из 2 символов"
        : "";
    },
  },
  methods: {
    signin() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.loading = true;

        const requestBody = {
          email: this.email,
          password: this.password,
        };

        this.$store
          .dispatch("signin", requestBody)
          .then(() => {
            this.$router.push("/");
          })
          .catch((error) => {
            this.$buefy.toast.open({
              duration: 5000,
              message: error.message,
              position: "is-bottom",
              type: "is-danger",
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    isValid(type) {
      return this.$v[type].$dirty && this.$v[type].$invalid ? "is-danger" : "";
    },
  },
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
