import {
  OK,
  CREATED,
  DELETED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
} from "./util";

const state = () => ({
  questionCategories: null,
});

const getters = {
  questionCategories: (state) => state.questionCategories,
};

const mutations = {
  setQuestionCategories(state, data) {
    state.questionCategories = data;
  },
};

const actions = {
  async getQuestionCategories(context) {
    const response = await this.$axios
      .get("/api/test")
      .catch((err) => err.response || err);
    // const response = await this.$axios
    //   .get("/api/questioncategories")
    //   .catch((err) => err.response || err);

    if (response.status == OK) {
      console.log("API: questionCategories success!!");
      // context.commit("setQuestionCategories", response.data.questionCategories);
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
