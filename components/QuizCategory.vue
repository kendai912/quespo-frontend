<template>
  <v-card max-width="440" flat>
    <v-container class="ma-0 pa-0">
      <v-row dense>
        <v-col
          v-for="(questionCategory, i) in questionCategoryList"
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
                    :to="
                      '/quizcategory/' + questionCategory.question_category_id
                    "
                  >
                    挑戦する
                  </v-btn>
                  <v-btn
                    class="ml-2"
                    outlined
                    rounded
                    small
                    @click="openMap(questionCategory.address)"
                  >
                    <v-icon class="outlined">near_me</v-icon>
                    行き方
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-2" size="120" tile>
                <v-img :src="questionCategory.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      questionCategoryList: [
        {
          question_category_id: 1,
          title: "鎌倉大仏",
          body: "鎌倉大仏として名高い高尊寺の国宝銅像阿弥陀仏像に関するクイズ",
          num_of_questions: 3,
          address:
            "https://www.google.com/maps/dir/?api=1&destination=鎌倉大仏",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        },
        {
          question_category_id: 2,
          title: "鶴岡八幡宮",
          body: "鎌倉のシンボル的神社である鶴岡八幡宮に関するクイズ",
          num_of_questions: 5,
          address:
            "https://www.google.com/maps/dir/?api=1&destination=鶴岡八幡宮",
          src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        },
      ],
    };
  },
  methods: {
    openMap(address) {
      window.open(address, "_blank");
    },
  },
};
</script>
