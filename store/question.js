import {
  OK,
  CREATED,
  DELETED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
} from "./util";

const state = () => ({
  status: null,
  result: null,
});

const getters = {
  status: (state) => state.status,
  result: (state) => state.result,
};

const mutations = {
  setStatus(state, data) {
    state.status = data;
  },
  clearStatus(state) {
    state.status = null;
  },
  setResult(state, data) {
    state.result = data;
  },
  clearResult(state) {
    state.result = null;
  },
};

const actions = {
  async showQuestion(context, question_id) {
    const response = await this.$axios
      .get(
        "/api/questions/" +
          question_id
      )
      .catch((err) => err.response || err);

    if (response.status == OK) {
      context.commit("setStatus", response.data.question.status);
    } else if (response.status === UNPROCESSABLE_ENTITY) {
      console.log("UNPROCESSABLE_ENTITY");
    } else {
      console.log(response.status);
    }
  },
  async getResult(context, input) {
    let params = {
      question_id: input.question_id,
      option_id: input.option_id,
    };

    const response = await this.$axios
      .post(
        "/api/question/answer",
        params
      )
      .catch((err) => err.response || err);

    if (response.status == CREATED) {
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
