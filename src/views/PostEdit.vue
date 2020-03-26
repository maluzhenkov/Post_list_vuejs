<template>
  <div class="container">
    <div class="buttons gdeBlyatHelperClassVetomEbuchemBulma">
      <b-button icon-left="mdi mdi-arrow-left" @click="cansel">Отмена</b-button>
      <b-button icon-left="mdi mdi-content-save" type="is-success" @click="updatePost">Сохранить</b-button>
    </div>
    <b-field label="Заголовок" :type="isValid('title')" :message="titleFeadback">
      <b-input size="is-medium" v-model.trim="post.title" />
    </b-field>
    <b-field label="Описание" :type="isValid('description')" :message="descriptionFeadback">
      <b-input v-model.trim="post.description" type="textarea" />
    </b-field>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "PostsEdit",
  validations: {
    post: {
      title: {
        required
      },
      description: {
        required
      }
    }
  },
  data: () => ({
    post: null
  }),
  computed: {
    titleFeadback() {
      if (!this.$v.post.title.$dirty) return "";
      return !this.$v.post.title.required ? "Поле не должно быть пустым" : "";
    },
    descriptionFeadback() {
      if (!this.$v.post.description.$dirty) return "";
      return !this.$v.post.description.required
        ? "Поле не должно быть пустым"
        : "";
    }
  },
  methods: {
    cansel() {
      this.$router.go(-1);
    },
    updatePost() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch("fetchUpdatePost", this.post).then(() => {
          this.$router.go(-1);
        });
      }
    },
    isValid(type) {
      return this.$v.post[type].$dirty && this.$v.post[type].$invalid
        ? "is-danger"
        : "";
    }
  },
  created() {
    this.post = this.$route.params.post;
  }
};
</script>

<style>
.gdeBlyatHelperClassVetomEbuchemBulma {
  display: flex;
  justify-content: flex-end;
}
</style>