<template>
  <v-card max-width="440" flat>
    <v-container class="ma-0 pa-0">
      <v-row dense>
        <v-col
          v-for="(questionCategory, i) in questionCategories"
          :key="i"
          cols="12"
        >
          <v-card max-height="180">
            <div class="d-flex flex-no-wrap justify-space-between align-center">
              <div>
                <v-card-title
                  class="text-h5 pr-0"
                  v-text="questionCategory.title"
                ></v-card-title>

                <v-card-subtitle
                  v-text="questionCategory.body"
                  class="pb-0 pr-0 mb-3"
                ></v-card-subtitle>

                <v-card-actions class="d-flex align-center mt-3">
                  <v-btn
                    class="ml-2"
                    outlined
                    rounded
                    small
                    nuxt
                    :to="'/questioncategory/' + questionCategory.id"
                  >
                    挑戦する
                  </v-btn>
                  <v-btn
                    class="ml-2"
                    outlined
                    rounded
                    small
                    @click="
                      openMap(
                        questionCategory.question_area.latitude,
                        questionCategory.question_area.longitude
                      )
                    "
                  >
                    <v-icon class="outlined">near_me</v-icon>
                    行き方
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-2" size="120" tile>
                <v-img :src="question_category_src(i)"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      questionCategories: "questioncategory/questionCategories",
    }),
    question_category_src: function () {
      return function (i) {
        let index = Number(i) + 1;
        return require("@/assets/image/questioncategory/question_category_" +
          index +
          ".jpg");
      };
    },
  },
  methods: {
    openMap(latitude, longitude) {
      window.open(
        "https://www.google.com/maps/dir/?api=1&destination=" +
          latitude +
          "," +
          longitude,
        "_blank"
      );
    },
  },
};
</script>
