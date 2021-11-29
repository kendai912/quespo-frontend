<template>
  <v-app>
    <v-app-bar app absolute>
      <v-row justify="center" align="center">
        <v-col> </v-col>
        <v-col>
          <v-toolbar-title
            v-text="title"
            @click="$router.push('/top')"
            class="text-center"
            style="cursor: pointer"
          />
        </v-col>
        <v-col class="d-flex justify-end">
          <AuthIcon v-if="!isLoggedIn" @click.native="login"
            ><template v-slot:authIcon>login</template
            ><template v-slot:authName>ログイン</template></AuthIcon
          >
          <AuthIcon v-else @click.native="logout"
            ><template v-slot:authIcon>logout</template
            ><template v-slot:authName>ログアウト</template></AuthIcon
          >
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
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      miniVariant: false,
      title: "鎌倉クエスト",
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
    }),
  },
  methods: {
    ...mapActions({
      logoutAuth: "auth/logoutAuth",
    }),
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.logoutAuth();
    },
  },
};
</script>
