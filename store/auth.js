import axios from "axios";
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
  setIsLoggedIn(state) {
    state.isLoggedIn = true;
  },
  setIsLoggedOut(state) {
    state.isLoggedIn = false;
  },
};

const actions = {
  async registerAuth(context, data) {
    const response = await axios
      .post("/api/register", data)
      .catch((err) => err.response || err);

    if (response.status == CREATED) {
      context.commit("setIsLoggedIn");
    } else if (response.status === UNPROCESSABLE_ENTITY) {
      console.log("UNPROCESSABLE_ENTITY");
    } else {
      console.log(response.status);
    }
  },
  async loginAuth(context, data) {
    const response = await axios
      .post("/api/login", data)
      .catch((err) => err.response || err);

    if (response.status == OK) {
      context.commit("setIsLoggedIn");
    } else if (response.status === UNPROCESSABLE_ENTITY) {
      console.log("UNPROCESSABLE_ENTITY");
    } else {
      console.log(response.status);
    }
  },
  async logoutAuth(context) {
    const response = await axios
      .post("/api/logout")
      .catch((err) => err.response || err);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
