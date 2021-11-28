<template>
  <div class="d-flex justify-center pa-0 ma-0">
    <QuestionCategory />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      getQuestionCategories: "questioncategory/getQuestionCategories",
    }),
  },
  created() {
    this.getQuestionCategories();
  },
};
</script>
