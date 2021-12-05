<template>
  <div class="d-flex justify-center pa-0 ma-0">
    <QuestionCategory />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Mixin from "@/plugins/mixin.js";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      latitude: "location/latitude",
      longitude: "location/longitude",
    }),
  },
  mixins: [Mixin],
  methods: {
    ...mapMutations({
      setLocationTimer: "location/setLocationTimer",
    }),
    ...mapActions({
      indexQuestionCategories: "questioncategory/indexQuestionCategories",
    }),
  },
  async created() {
    await this.indexQuestionCategories();

    let self = this;
    this.getCurrentPosition();
    let timer = setInterval(() => {
      self.getCurrentPosition();
    }, 60000);
    this.setLocationTimer(timer);
  },
};
</script>
