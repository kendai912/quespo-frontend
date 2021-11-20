<template>
  <v-app>
    <v-app-bar>
      <v-row justify="center" align="center">
        <v-col> </v-col>
        <v-col>
          <v-toolbar-title v-text="title" class="text-center" />
        </v-col>
        <v-col class="text-right">
          <v-btn nuxt to="/login" outlined> ログイン </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer>
      <v-col class="text-center"
        >created by <a href="http://twitter.com/Kendai">@KamakuraQuest</a>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      miniVariant: false,
      title: "鎌倉クエスト",
    };
  },
};
</script>
