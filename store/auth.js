import axios from "axios";
import { OK, CREATED, DELETED, FORBIDDEN, INTERNAL_SERVER_ERROR } from "./util";

const state = () => ({
  isLoggedIn: false,
});

const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
};

const mutations = {
  setIsLoggedIn(state) {
    state.isLoggedIn = true;
  },
  setIsLoggedOut(state) {
    state.isLoggedIn = false;
  },
};

const actions = {
  async register(context, data) {
    context.commit("setApiStatus", null);
    const response = await axios.post("/api/register", data);

    if (response.status == CREATED) {
      context.commit("setApiStatus", true);
      context.commit("setUser", response.data.user);
      context.commit("setUsername", response.data.user.name);
      return false;
    }

    context.commit("setApiStatus", false);
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit("setRegisterErrorMessages", response.data.errors);
    } else {
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  async login(context, data) {
    context.commit("setApiStatus", null);
    const response = await axios
      .post("/api/login", data)
      .catch((err) => err.response || err);

    if (response.status == OK) {
      context.commit("setApiStatus", true);
      context.commit("setUser", response.data);
      context.commit("setUsername", response.data.name);
      return false;
    }

    context.commit("setApiStatus", false);
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit("setLoginErrorMessages", response.data.errors);
    } else {
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  async logout(context) {
    const response = await axios.post("/api/logout");
    context.commit("setUser", null);
    context.commit("setUsername", null);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
