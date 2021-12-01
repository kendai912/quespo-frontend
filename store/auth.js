import {
  OK,
  CREATED,
  DELETED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
} from "./util";

const state = () => ({
  isLoggedIn: false,
});

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
};

const mutations = {
  setApiToken(state, data) {
    this.$cookies.set("api_token", data, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  },
  removeApiToken(state) {
    this.$cookies.remove("api_token");
  },
  setIsLoggedIn(state) {
    state.isLoggedIn = true;
  },
  setIsLoggedOut(state) {
    state.isLoggedIn = false;
  },
};

const actions = {
  async registerAuth(context, data) {
    const response = await this.$axios
      .post("https://frozen-woodland-06584.herokuapp.com/api/register", data)
      .catch((err) => err.response || err);

    if (response.status == CREATED) {
      context.commit("setApiToken", response.data.token);
      context.commit("setIsLoggedIn");
    } else if (response.status === UNPROCESSABLE_ENTITY) {
      console.log("UNPROCESSABLE_ENTITY");
    } else {
      console.log(response.status);
    }
  },
  async loginAuth(context, data) {
    const response = await this.$axios
      .post("https://frozen-woodland-06584.herokuapp.com/api/login", data)
      .catch((err) => err.response || err);

    if (response.status == OK) {
      context.commit("setApiToken", response.data.token);
      context.commit("setIsLoggedIn");
    } else if (response.status === UNPROCESSABLE_ENTITY) {
      console.log("UNPROCESSABLE_ENTITY");
    } else {
      console.log(response.status);
    }
  },
  async logoutAuth(context) {
    const response = await this.$axios
      .post("https://frozen-woodland-06584.herokuapp.com/api/logout")
      .catch((err) => err.response || err);
    context.commit("removeApiToken");
    context.commit("setIsLoggedOut");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
