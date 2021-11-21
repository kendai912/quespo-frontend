<template>
  <v-app>
    <v-app-bar app absolute>
      <v-row justify="center" align="center">
        <v-col> </v-col>
        <v-col>
          <v-toolbar-title v-text="title" class="text-center" />
        </v-col>
        <v-col class="text-right">
          <v-btn v-if="!isLogin" nuxt to="/login" outlined> ログイン </v-btn>
          <v-btn v-else nuxt to="/logout" outlined> ログアウト </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app absolute>
      <v-col class="text-center"
        >created by <a href="http://twitter.com/Kendai">@KamakuraQuest</a>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      miniVariant: false,
      title: "鎌倉クエスト",
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "auth/isLoggedIn",
    }),
  },
  watch: {},
};
</script>
