import axios from "../../plugins/Api";

export default {
  state: {
    user: null,
    isAuth: false,
  },
  getters: {
    getUser: (state) => state.user,
    getIsAuth: (state) => state.isAuth,
    getUserRole: (state) => state.user?.role,
  },
  mutations: {
    SET_USER: (state, user) => {
      state.isAuth = false;
      if (user) {
        state.isAuth = true;
        state.user = user;
      }
    },
  },
  actions: {
    async signin({ commit }, { email, password }) {
      const errMsg = "Не верный логин или пароль";
      return axios()
        .get(`/users?login=${email}`)
        .then((res) => {
          if (res.statusText === "OK" && res.data.length > 0) {
            const user = res.data[0];
            if (user.password == password) {
              delete user.password;
              commit("SET_USER", user);

              //set user in localStorage
              user.enterDate = new Date().toISOString();
              localStorage.setItem(
                process.env.VUE_APP_LH_USER,
                JSON.stringify(user)
              );
            } else {
              throw new Error(errMsg);
            }
          } else {
            throw new Error(errMsg);
          }
        });
    },
    login({ commit }) {
      const user = JSON.parse(
        localStorage.getItem(process.env.VUE_APP_LH_USER) || null
      );
      if (user) {
        const enterDate = new Date(user.enterDate);
        const currentDate = new Date();
        //Если с прошлого захода прошло больше 3х дней
        if (currentDate - enterDate > 86400000) {
          localStorage.removeItem(process.env.VUE_APP_LH_USER);
          return;
        }
        commit("SET_USER", user);
      }
    },
    logout({ commit }) {
      localStorage.removeItem(process.env.VUE_APP_LH_USER);
      commit("SET_USER", null);
    },
  },
};
