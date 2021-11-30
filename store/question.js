import {
  OK,
  CREATED,
  DELETED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
} from "./util";

const state = () => ({
  result: null,
});

const getters = {
  result: (state) => state.result,
};

const mutations = {
  setResult(state, data) {
    state.result = data;
  },
  clearResult(state) {
    state.result = null;
  },
};

const actions = {
  async getResult(context, optionId) {
    let params = {
      optionId: optionId,
    };

    const response = await this.$axios
      .post("/api/question/answer", params)
      .catch((err) => err.response || err);

    if (response.status == OK) {
      context.commit("setResult", response.data.result);
    } else if (response.status === UNPROCESSABLE_ENTITY) {
      console.log("UNPROCESSABLE_ENTITY");
    } else {
      console.log(response.status);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
