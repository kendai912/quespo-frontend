<template>
  <v-row justify="center">
    <v-col class="text-center">
      <v-card flat class="mx-auto fill-width" max-width="640">
        <v-card-title class="wrap-text text-subtitle-1 justify-center">
          <span> クイズを通して</span
          ><span class="font-weight-bold">楽しみながら</span
          ><span>鎌倉の名所・旧跡の</span
          ><span class="font-weight-bold">魅力</span><span>を知ること</span
          ><span>が出来るサービスです</span>
        </v-card-title>

        <v-row class="d-flex justify-center">
          <v-card max-width="300" class="pa-2 ma-4">
            <v-img v-bind:src="daibutsu_src"></v-img>
          </v-card>
        </v-row>

        <v-card-actions class="justify-center px-4 py-8">
          <v-btn
            nuxt
            to="/login"
            max-width="300"
            large
            class="fill-width"
            color="orange"
          >
            ログイン
          </v-btn>
        </v-card-actions>

        <v-alert
          icon="location_on"
          outlined
          dense
          color="primary"
          prominent
          border="left"
        >
          <span>クイズに回答するには、</span
          ><span class="font-weight-bold">位置情報を許可</span
          ><span>し、スポットの</span
          ><span class="font-weight-bold">100m以内</span><span>に近づく</span
          ><span>必要があります</span>
        </v-alert>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      daibutsu_src: require("@/assets/image/daibutsu.png"),
      kamakuramap_src: require("@/assets/image/kamakuramap.png"),
      GeolocationAccess_src: require("@/assets/image/GeolocationAccess.png"),
      correct_img_src: require("@/assets/image/correct_img.png"),
    };
  },
};
</script>
