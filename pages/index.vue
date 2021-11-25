<template>
  <v-row justify="center">
    <v-col class="text-center">
      <v-card flat>
        <v-card-title class="wrap-text text-subtitle-1 justify-center">
          <span> 鎌倉クエストとは、クイズを通して</span
          ><span>鎌倉の様々な名所の</span><span>隠れた魅力を</span
          ><span>知ることが出来るサービスです</span>
        </v-card-title>

        <v-row class="d-flex justify-center">
          <v-card max-width="300" class="pa-2 ma-4">
            <v-img v-bind:src="hachiko_src"></v-img>
          </v-card>
        </v-row>

        <v-card-actions class="justify-center px-4 py-8">
          <v-btn
            color="primary"
            nuxt
            to="/login"
            max-width="300"
            class="fill-width"
          >
            ログイン
          </v-btn>
        </v-card-actions>

        <v-card-subtitle class="text-subtitle-1 justify-center">
          つかいかた
        </v-card-subtitle>

        <v-card-subtitle class="text-subtitle-1 justify-center">
          ① 現地に行く
        </v-card-subtitle>

        <v-row class="d-flex justify-center">
          <v-card max-width="300" class="pa-2 ma-4" flat>
            <v-img v-bind:src="kamakuramap_src"></v-img>
          </v-card>
        </v-row>

        <v-card-subtitle class="text-subtitle-1 justify-center">
          ② 位置情報を許可する
        </v-card-subtitle>

        <v-row class="d-flex justify-center">
          <v-card max-width="300" class="pa-2 ma-4" flat>
            <v-img v-bind:src="GeolocationAccess_src"></v-img>
          </v-card>
        </v-row>

        <v-card-subtitle class="text-subtitle-1 justify-center">
          ③ 三択クイズに回答する
        </v-card-subtitle>

        <v-row class="d-flex justify-center">
          <v-card max-width="300" class="pa-2 ma-4" flat>
            <v-img v-bind:src="correct_img_src"></v-img>
          </v-card>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      hachiko_src: require("@/assets/image/hachiko.png"),
      kamakuramap_src: require("@/assets/image/kamakuramap.png"),
      GeolocationAccess_src: require("@/assets/image/GeolocationAccess.png"),
      correct_img_src: require("@/assets/image/correct_img.png"),
    };
  },
};
</script>
