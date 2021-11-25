<template>
  <v-row justify="center">
    <v-dialog v-model="showHint" max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" outlined rounded small>
          ヒントを見る
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h7">
          ヒント
        </v-card-title>
        <v-card-text class="text--primary">{{ this.hintText }}</v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn text @click="showHint = false">
            クイズに戻る
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  props: {
    hintText: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showHint: false,
    };
  },
};
</script>
