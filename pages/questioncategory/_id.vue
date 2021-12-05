<template>
  <v-card class="mx-auto" max-width="440" flat>
    <v-window v-model="quiz">
      <v-window-item v-for="(question, i) in questions" :key="`question-${i}`">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-h6 text-center">
              {{ questionCategory[0].title }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-center"
              >{{ i + 1 }} / {{ questions.length }} 問目</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-card-text class="pa-0">
          <v-img
            :src="question_src(question.id)"
            width="100%"
            class="mx-auto"
            contain
          ></v-img>
        </v-card-text>

        <div class="text-h7 text-center pa-4">
          {{ question.question_text }}
        </div>

        <v-card-actions v-show="ready" class="d-flex justify-center">
          <v-container>
            <Hint :hintText="question.hint.hint_text" />
            <v-row class="d-flex justify-center mt-12 mb-4 position-relative">
              <v-btn
                @click="answer(question.id, question.options[0].option_id, i)"
                color="primary"
                height="40"
                width="80%"
                :disabled="
                  question.result !== null ||
                  question.status == 'false_2' ||
                  question.status == 'true'
                "
                >{{ question.options[0].option_text }}</v-btn
              >
              <div
                v-if="
                  question.options[0].outcome &&
                  (question.status == 'false_2' ||
                    question.status == 'true' ||
                    question.result == 'false_2' ||
                    question.result == 'true' ||
                    answeredOption == 0)
                "
                class="maru"
              ></div>
              <div
                v-if="
                  !question.options[0].outcome &&
                  (question.status == 'false_2' ||
                    question.status == 'true' ||
                    question.result == 'false_2' ||
                    question.result == 'true' ||
                    answeredOption == 0)
                "
                class="batsu"
              ></div>
            </v-row>
            <v-row class="d-flex justify-center my-4 position-relative">
              <v-btn
                @click="answer(question.id, question.options[1].option_id, i)"
                color="primary"
                height="40"
                width="80%"
                :disabled="
                  question.result !== null ||
                  question.status == 'false_2' ||
                  question.status == 'true'
                "
                >{{ question.options[1].option_text }}</v-btn
              >
              <div
                v-if="
                  question.options[1].outcome &&
                  (question.status == 'false_2' ||
                    question.status == 'true' ||
                    question.result == 'false_2' ||
                    question.result == 'true' ||
                    answeredOption == 1)
                "
                class="maru"
              ></div>
              <div
                v-if="
                  !question.options[1].outcome &&
                  (question.status == 'false_2' ||
                    question.status == 'true' ||
                    question.result == 'false_2' ||
                    question.result == 'true' ||
                    answeredOption == 1)
                "
                class="batsu"
              ></div>
            </v-row>
            <v-row class="d-flex justify-center my-4 position-relative">
              <v-btn
                @click="answer(question.id, question.options[2].option_id, i)"
                color="primary"
                height="40"
                width="80%"
                :disabled="
                  question.result !== null ||
                  question.status == 'false_2' ||
                  question.status == 'true'
                "
                >{{ question.options[2].option_text }}</v-btn
              >
              <div
                v-if="
                  question.options[2].outcome &&
                  (question.status == 'false_2' ||
                    question.status == 'true' ||
                    question.result == 'false_2' ||
                    question.result == 'true' ||
                    answeredOption == 2)
                "
                class="maru"
              ></div>
              <div
                v-if="
                  !question.options[2].outcome &&
                  (question.status == 'false_2' ||
                    question.status == 'true' ||
                    question.result == 'false_2' ||
                    question.result == 'true' ||
                    answeredOption == 2)
                "
                class="batsu"
              ></div>
            </v-row>
          </v-container>
        </v-card-actions>

        <v-card
          v-if="
            question.status == 'false_2' ||
            question.status == 'true' ||
            question.result
          "
          class="mx-auto text-center"
          max-width="440"
          outlined
          rounded
        >
          <v-img
            v-if="question.status == 'true' || question.result == 'true'"
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
              question.status == 'false_2' ||
              question.status == 'true' ||
              question.result == 'false_2' ||
              question.result == 'true'
            "
            class="text-h7 text-center px-4 pt-0 pb-0 mb-4"
          >
            {{ question.commentary }}
          </div>
          <div v-else class="text-h7 text-center px-4 pt-0 pb-0 mb-4">
            {{ question.hint_text }}
          </div>

          <v-card-actions
            v-if="question.result == 'false_1'"
            class="d-flex justify-center mt-4 mb-8"
          >
            <v-container>
              <v-row class="d-flex justify-center">
                <v-btn @click="retry(i)" color="error"> 再挑戦する </v-btn>
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
          v-for="(question, i) in questions"
          :key="`btn-${i}`"
          v-slot="{ active, toggle }"
        >
          <v-btn :input-value="active" icon @click="toggle">
            <v-icon small>fiber_manual_record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
      <v-btn :disabled="quiz + 1 === questions.length" @click="next">
        次へ
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Mixin from "@/plugins/mixin.js";

export default {
  data() {
    return {
      quiz: 0,
      correct_src: require("@/assets/image/correct.png"),
      wrong_src: require("@/assets/image/wrong.png"),
      answeredOption: null,
      questions: [],
      ready: false,
    };
  },
  computed: {
    ...mapGetters({
      questionCategory: "questioncategory/questionCategory",
      status: "question/status",
      result: "question/result",
      locationTimer: "location/locationTimer",
    }),
    question_src: function () {
      return function (id) {
        let questionId;

        // Heroku用のid変換
        if (process.env.NODE_ENV !== "development") {
          questionId = (id % 10) + 1;
        } else {
          questionId = id;
        }

        return require("@/assets/image/question/question_" +
          questionId +
          ".jpg");
      };
    },
  },
  mixins: [Mixin],
  methods: {
    ...mapMutations({
      clearResult: "question/clearResult",
      setLocationTimer: "location/setLocationTimer",
    }),
    ...mapActions({
      showQuestionCategory: "questioncategory/showQuestionCategory",
      showQuestion: "question/showQuestion",
      getResult: "question/getResult",
    }),
    next() {
      this.quiz = this.quiz + 1 === this.questions.length ? 0 : this.quiz + 1;
    },
    prev() {
      this.quiz = this.quiz - 1 < 0 ? this.$router.push("/top") : this.quiz - 1;
    },
    async answer(question_id, option_id, i) {
      if (
        this.validateLocation(
          this.questionCategory[0].question_area.latitude,
          this.questionCategory[0].question_area.longitude
        )
      ) {
        this.clear();
        await this.getResult({
          option_id: option_id,
          question_id: question_id,
        });

        this.answeredOption = option_id;
        this.questions[i].result = this.result;
        this.questions[i].status = this.result;
      } else {
        this.getCurrentPosition();

        alert(
          "クイズに回答するには位置情報を許可し、スポットの100m以内に近づいてください\n(位置情報の取得に時間がかかることがあります)"
        );

        let self = this;
        clearInterval(this.locationTimer);
        let timer = setInterval(() => {
          self.getCurrentPosition();
        }, 60000);
        this.setLocationTimer(timer);
      }
    },
    retry(i) {
      this.questions[i].status = this.result;
      this.questions[i].result = null;
      this.clear();
    },
    clear() {
      this.answeredOption = null;
      this.clearResult();
    },
  },
  async created() {
    let questionCategoryId = this.$route.params.id;
    await this.showQuestionCategory(questionCategoryId);

    this.questions = JSON.parse(
      JSON.stringify(this.$store.getters["questioncategory/questions"])
    ); // 値渡し

    let self = this;
    this.questions.forEach(async (question, index) => {
      await self.showQuestion(question.id);
      self.$set(question, "status", self.status);
      self.$set(question, "result", null);

      if (index + 1 == self.questions.length) self.ready = true;
    });
  },
  beforeDestroy() {
    this.ready = false;
  },
};
</script>
