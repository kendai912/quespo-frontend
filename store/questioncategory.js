import {
  OK,
  CREATED,
  DELETED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
} from "./util";

const state = () => ({
  questionCategories: [],
  questionCategory: null,
  questions: [],
});

const getters = {
  questionCategories: (state) => state.questionCategories,
  questionCategory: (state) => state.questionCategory,
  questions: (state) => state.questions,
};

const mutations = {
  setQuestionCategories(state, data) {
    state.questionCategories = data;
  },
  setQuestionCategory(state, data) {
    state.questionCategory = data;
  },
  setQuestions(state, data) {
    state.questions = data;
  },
};

const actions = {
  async indexQuestionCategories(context) {
    const response = await this.$axios
      .get("/api/questioncategories")
      .catch((err) => err.response || err);

    if (response.status == OK) {
      context.commit("setQuestionCategories", response.data.questionCategories);
    } else if (response.status === UNPROCESSABLE_ENTITY) {
      console.log("UNPROCESSABLE_ENTITY");
    } else {
      console.log(response.status);
    }
  },

  async showQuestionCategory(context, questionCategoryId) {
    const response = await this.$axios
      .get("/api/questioncategories/" + questionCategoryId)
      .catch((err) => err.response || err);

    if (response.status == OK) {
      context.commit("setQuestionCategory", response.data.questionCategory);
      context.commit("setQuestions", response.data.questions);
      console.log(response.data.questions);
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
