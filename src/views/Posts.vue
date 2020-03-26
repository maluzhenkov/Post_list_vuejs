<template>
  <div class="container">
    <template v-if="posts.length > 0">
      <post-list
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :role="role"
        @likePost="likePost"
        @editPost="editPost"
        @deletePost="deletePost"
      />
      <b-pagination
        :total="pagination.totalPosts"
        :current.sync="pagination.currentPage"
        :per-page="pagination.limitPosts"
        order="is-centered"
        :icon-prev="'mdi mdi-chevron-left'"
        :icon-next="'mdi mdi-chevron-right'"
        @change="changePage"
      />
    </template>
    <template v-else>
      <div class="has-text-centered">Не удалось найти посты</div>
    </template>
  </div>
</template>

<script>
import PostList from "@/components/PostList";

export default {
  name: "Posts",
  components: { PostList },
  computed: {
    posts() {
      return this.$store.getters.getPosts;
    },
    pagination() {
      return this.$store.getters.getPagination;
    },
    role() {
      return this.$store.getters.getUserRole;
    }
  },
  methods: {
    changePage(page) {
      this.$store.dispatch("fetchPostList", page).then(() => {
        this.$router.push({ name: "Posts", params: { page } });
      });
    },
    likePost(post) {
      this.$store.dispatch("fetchLikePost", post);
    },
    editPost(post) {
      this.$router.push({ name: "PostEdit", params: { post } });
    },
    deletePost(id) {
      if (confirm("Удалить пост?")) {
        this.$store.dispatch("fetchDeletePost", {
          id,
          page: this.$route.params.page
        });
      }
    }
  },
  mounted() {
    if (!this.$route.params.page) {
      this.$router.push({ name: "Posts", params: { page: 1 } });
    }
    this.$store.dispatch("fetchPostList", this.$route.params.page);
  }
};
</script>
