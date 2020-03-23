import axios from "../../plugins/Api";

export default {
  state: {
    user: null
  },
  getters: {
    getUser: state => state.user
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    }
  },
  actions: {
    async signin({ commit }, { email, password }) {
      return axios()
        .get(`/users?login=${email}`)
        .then(res => {
          if (res.statusText === "OK" && res.data.length > 0) {
            const user = res.data[0];
            if (user.password == password) {
              commit("SET_USER", user);
            } else {
              throw new Error("Не верный логин или пароль");
            }
          } else {
            throw new Error("Не верный логин или пароль");
          }
        });
    }
  }
};
