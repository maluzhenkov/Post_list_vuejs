import axios from "../../plugins/Api";

export default {
  state: {
    posts: [],
    pagination: {
      currentPage: 1,
      limitPosts: 10,
      totalPosts: 0
    },
    errors: []
  },
  getters: {
    getPosts: state => state.posts,
    getPagination: state => state.pagination
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_TOTAL_POSTS(state, count) {
      state.pagination.totalPosts = +count;
    },
    UPDATE_PAGE(state, page) {
      state.pagination.currentPage = +page;
    },
    UPDATE_POST_LIKE(state, post) {
      const index = state.posts.findIndex(item => item.id === post.id);
      state.posts[index].likes = post.likes;
    },
    SET_ERRORS(state, msg) {
      state.errors.push(msg);
    }
  },
  actions: {
    async fetchPostList({ commit, getters }, page = 1) {
      const { limitPosts } = getters.getPagination;
      return axios()
        .get(`/posts?_page=${page}&_limit=${limitPosts}`)
        .then(res => {
          if (res.statusText === "OK") {
            commit("SET_POSTS", res.data);
            commit("SET_TOTAL_POSTS", res.headers["x-total-count"]);
            commit("UPDATE_PAGE", page);
          }
        });
    },
    async fetchLikePost({ commit }, { id, likes }) {
      likes++;
      return axios()
        .patch(`/posts/${id}`, { likes })
        .then(res => {
          if (res.statusText === "OK") {
            commit("UPDATE_POST_LIKE", res.data);
          }
        });
    },
    async fetchUpdatePost({ commit }, { id, title, description }) {
      const updateAt = new Date().toISOString();
      return axios()
        .patch(`/posts/${id}`, { title, description, updateAt })
        .catch(err => {
          commit("SET_ERRORS", err.message);
        });
    },
    async fetchDeletePost({ commit, dispatch }, { id, page }) {
      return axios()
        .delete(`/posts/${id}`)
        .then(res => {
          if (res.statusText === "OK") {
            dispatch("fetchPostList", page);
          }
        })
        .catch(err => {
          commit("SET_ERRORS", err.message);
        });
    }
  }
};
