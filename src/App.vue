<template>
  <vue-extend-layouts path="layouts" />
</template>

<script>
import VueExtendLayouts from "vue-extend-layout";
export default {
  components: { VueExtendLayouts },
  computed: {
    layout() {
      return this.$route.meta.layout || "empty";
    }
  },
  mounted() {
    //проверяем есть ли данные в localStorage
    this.$store.dispatch("login");
  }
};
</script>

