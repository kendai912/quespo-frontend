<template>
  <div class="d-flex justify-center pa-0 ma-0">
    <QuizCategory />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      setIsLoggedIn: "auth/setIsLoggedIn", //あとで消す
    }),
  },
  created() {
    this.setIsLoggedIn(); //あとで消す
  },
};
</script>