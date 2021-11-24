<template>
  <v-card class="mx-auto" max-width="440" flat>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h6 text-center">
          鎌倉大仏
        </v-list-item-title>
        <v-list-item-subtitle class="text-center"
          >1 / 5 問目</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row class="d-flex justify-center">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          width="100%"
          class="mx-auto"
          contain
        ></v-img>
      </v-row>
    </v-card-text>

    <div class="text-h7 text-center pa-4">
      鎌倉の大仏はなぜ建てられたのでしょうか？
    </div>

    <v-card-actions class="d-flex justify-center">
      <v-container>
        <v-row class="d-flex justify-center">
          <v-btn outlined rounded small> ヒントを見る </v-btn>
        </v-row>
        <v-row class="d-flex justify-center mt-12 mb-4">
          <v-btn color="primary" height="40" width="80%"
            >死者の怨霊を鎮めるため</v-btn
          >
        </v-row>
        <v-row class="d-flex justify-center my-4">
          <v-btn color="primary" height="40" width="80%"
            >観光名所にするため</v-btn
          >
        </v-row>
        <v-row class="d-flex justify-center my-4">
          <v-btn color="primary" height="40" width="80%"
            >天然痘の被害が静まるように祈るため</v-btn
          >
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      questions: [
        {
          question_id: 1,
          question_text: "鎌倉大仏はなぜ建てられたのか？",
          img_file_name_question:
            "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          commentary:
            "鎌倉大仏が建立された頃、付近には死後に出会う十王を奉る閻魔堂があり、浄土信仰に基づく情景を構成する寺院群の一つとして建てられた",
          status: 0,
          created_at: "2021/11/24",
          options: [
            {
              option_id: 1,
              outcome: true,
              option_text: "死者の怨霊を鎮めるため",
            },
            {
              option_id: 2,
              outcome: false,
              option_text: "観光名所にするため",
            },
            {
              option_id: 3,
              outcome: false,
              option_text: "天然痘の被害が静まるように祈るため",
            },
          ],
        },
        {
          question_id: 2,
          question_text: "鶴岡八幡宮の質問文",
          img_file_name_question:
            "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          commentary: "鶴岡八幡宮の解説",
          status: 2,
          created_at: "2021/11/23",
          options: [
            {
              option_id: 1,
              outcome: false,
              option_text: "不正解の選択肢",
            },
            {
              option_id: 2,
              outcome: true,
              option_text: "正解の選択肢",
            },
            {
              option_id: 3,
              outcome: false,
              option_text: "不正解の選択肢",
            },
          ],
        },
      ],
    };
  },
  methods: {},
  created() {},
};
</script>
