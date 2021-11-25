<template>
  <v-card class="mx-auto" max-width="440" flat>
    <v-window v-model="quiz">
      <v-window-item
        v-for="(question, i) in questionCategory.questions"
        :key="`question-${i}`"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-center">
              {{ questionCategory.title }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-center"
              >{{ i + 1 }} /
              {{ questionCategory.questions.length }} 問目</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-card-text class="pa-0">
          <v-img
            :src="question.img_file_name_question"
            width="100%"
            class="mx-auto"
            contain
          ></v-img>
        </v-card-text>

        <div class="text-h7 text-center pa-4">
          {{ question.question_text }}
        </div>

        <v-card-actions class="d-flex justify-center">
          <v-container>
            <Hint :hintText="question.hint_text" />
            <v-row class="d-flex justify-center mt-12 mb-4 position-relative">
              <v-btn
                @click="answer(0)"
                color="primary"
                height="40"
                width="80%"
                :disabled="result !== null"
                >{{ question.options[0].option_text }}</v-btn
              >
              <div
                v-if="
                  question.options[0].outcome &&
                  (question.status == 2 ||
                    question.status == 3 ||
                    result == 2 ||
                    result == 3 ||
                    answeredOption == 0)
                "
                class="maru"
              ></div>
              <div
                v-if="
                  !question.options[0].outcome &&
                  (question.status == 2 ||
                    question.status == 3 ||
                    result == 2 ||
                    result == 3 ||
                    answeredOption == 0)
                "
                class="batsu"
              ></div>
            </v-row>
            <v-row class="d-flex justify-center my-4 position-relative">
              <v-btn
                @click="answer(1)"
                color="primary"
                height="40"
                width="80%"
                :disabled="result !== null"
                >{{ question.options[1].option_text }}</v-btn
              >
              <div
                v-if="
                  question.options[1].outcome &&
                  (question.status == 2 ||
                    question.status == 3 ||
                    result == 2 ||
                    result == 3 ||
                    answeredOption == 1)
                "
                class="maru"
              ></div>
              <div
                v-if="
                  !question.options[1].outcome &&
                  (question.status == 2 ||
                    question.status == 3 ||
                    result == 2 ||
                    result == 3 ||
                    answeredOption == 1)
                "
                class="batsu"
              ></div>
            </v-row>
            <v-row class="d-flex justify-center my-4 position-relative">
              <v-btn
                @click="answer(2)"
                color="primary"
                height="40"
                width="80%"
                :disabled="result !== null"
                >{{ question.options[2].option_text }}</v-btn
              >
              <div
                v-if="
                  question.options[2].outcome &&
                  (question.status == 2 ||
                    question.status == 3 ||
                    result == 2 ||
                    result == 3 ||
                    answeredOption == 2)
                "
                class="maru"
              ></div>
              <div
                v-if="
                  !question.options[2].outcome &&
                  (question.status == 2 ||
                    question.status == 3 ||
                    result == 2 ||
                    result == 3 ||
                    answeredOption == 2)
                "
                class="batsu"
              ></div>
            </v-row>
          </v-container>
        </v-card-actions>

        <v-card
          v-if="question.status == 2 || question.status == 3 || result"
          class="mx-auto text-center"
          max-width="440"
          outlined
          rounded
        >
          <v-img
            v-if="question.status == 3 || result == 3"
            :src="correct_src"
            width="60%"
            class="mx-auto"
            contain
          ></v-img>
          <v-img
            v-else
            :src="wrong_src"
            width="60%"
            class="mx-auto"
            contain
          ></v-img>

          <div
            v-if="
              question.status == 2 ||
              question.status == 3 ||
              result == 2 ||
              result == 3
            "
            class="text-h7 text-center px-4 pt-0 pb-0 mb-4"
          >
            {{ question.commentary }}
          </div>
          <div v-else class="text-h7 text-center px-4 pt-0 pb-0 mb-4">
            {{ question.hint_text }}
          </div>

          <v-card-actions
            v-if="result == 1"
            class="d-flex justify-center mt-4 mb-8"
          >
            <v-container>
              <v-row class="d-flex justify-center">
                <v-btn @click="retry" color="error"> 再挑戦する </v-btn>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions class="justify-space-between mt-8">
      <v-btn @click="prev"> 戻る </v-btn>
      <v-item-group v-model="quiz" class="text-center" mandatory>
        <v-item
          v-for="i in questionCategory.questions.length"
          :key="`btn-${i}`"
          v-slot="{ active, toggle }"
        >
          <v-btn :input-value="active" icon @click="toggle">
            <v-icon small>fiber_manual_record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
      <v-btn
        :disabled="quiz + 1 === questionCategory.questions.length"
        @click="next"
      >
        次へ
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      quiz: 0,
      correct_src: require("@/assets/image/correct.png"),
      wrong_src: require("@/assets/image/wrong.png"),
      answeredOption: null,
      result: null,
      questionCategory: {
        question_category_id: 1,
        title: "鎌倉大仏",
        body: "鎌倉大仏として名高い高尊寺の国宝銅像阿弥陀仏像に関するクイズ",
        num_of_questions: 3,
        address: "https://www.google.com/maps/dir/?api=1&destination=鎌倉大仏",
        img_file_name_question_category:
          "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        questions: [
          {
            question_id: 1,
            question_text: "鎌倉大仏はなぜ建てられたのか？",
            img_file_name_question:
              "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
            hint_text: "クイズ１のヒントの文言",
            commentary:
              "鎌倉大仏が建立された頃、付近には死後に出会う十王を奉る閻魔堂があり、浄土信仰に基づく情景を構成する寺院群の一つとして建てられた",
            status: null,
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
            hint_text: "クイズ２のヒントの文言",
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
          {
            question_id: 3,
            question_text: "問３の質問文",
            img_file_name_question:
              "https://cdn.vuetifyjs.com/images/cards/cooking.png",
            hint_text: "クイズ３のヒントの文言",
            commentary: "問３の解説",
            status: 1,
            created_at: "2021/11/30",
            options: [
              {
                option_id: 1,
                outcome: false,
                option_text: "不正解の選択肢",
              },
              {
                option_id: 2,
                outcome: false,
                option_text: "不正解の選択肢",
              },
              {
                option_id: 3,
                outcome: true,
                option_text: "正解の選択肢",
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    next() {
      this.quiz =
        this.quiz + 1 === this.questionCategory.questions.length
          ? 0
          : this.quiz + 1;
    },
    prev() {
      this.quiz = this.quiz - 1 < 0 ? this.$router.push("/top") : this.quiz - 1;
    },
    answer(optionId) {
      this.clearResult();

      this.answeredOption = optionId;
      this.questionCategory.questions[0].status = null; // 更新されたstatusが返ってくる
      this.result = 1; // 更新されたstatusが返ってくる
    },
    retry() {
      this.questionCategory.questions[0].status = this.result;
      this.clearResult();
    },
    clearResult() {
      this.answeredOption = null;
      this.result = null;
    },
  },
  created() {
    this.answer(1); // あとで消す
  },
};
</script>
