<template>
  <div>
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
      setIsLoggedIn: "auth/setIsLoggedIn",
    }),
  },
  created() {
    this.setIsLoggedIn();
  },
};
</script>
