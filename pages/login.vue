<template>
  <v-card
    :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
    class="mx-auto fill-width"
    flat
    max-width="640"
  >
    <div class="px-4 py-8">
      <div style="max-width: 344px" class="mx-auto">
        <div v-if="loginError" class="login-error">
          メールアドレスもしくはパスワードが違います
        </div>
        <div>
          <v-btn
            class="fill-width mt-5 text-capitalize caption"
            color="#385184"
            dark
            depressed
            height="48px"
            tile
            nuxt
            to="/api/auth/facebook"
          >
            <img
              class="button-logo-img mr-4"
              src="~/static/f_logo_RGB-White_1024.png"
              style="height: 24px"
            />
            Facebookでログイン
          </v-btn>
        </div>
        <div class="separator">
          <div class="middle-separator">または</div>
        </div>
        <div class="pt-0">
          <div>
            <v-text-field
              v-model="loginForm.email"
              v-on:keydown.enter="login"
              :rules="[emailRules.required, emailRules.regex]"
              autofocus
              dense
              height="48px"
              outlined
              placeholder="メールアドレス"
            ></v-text-field>

            <v-text-field
              v-model="loginForm.password"
              v-on:keydown.enter="login"
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required, passwordRules.regex]"
              :type="passwordShow ? 'text' : 'password'"
              dense
              height="48px"
              name="input-password"
              outlined
              placeholder="パスワード"
              @click:append="passwordShow = !passwordShow"
            ></v-text-field>
          </div>
          <div class="login-btn pb-8">
            <v-btn
              v-on:click="login"
              class="fill-width caption"
              color="#FFCB00"
              depressed
              height="48px"
              tile
            >
              ログイン
            </v-btn>
          </div>
          <v-divider></v-divider>
          <div class="pt-8 pb-4">
            <span>はじめての方はこちら：</span>
            <nuxt-link to="/register">会員登録に移動</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      loginForm: {
        email: null,
        password: null,
      },
      loginError: false,
      emailRules: {
        required: (value) => !!value || "メールアドレスは必須です",
        regex: (value) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          ) || "メールアドレスの形式が違います",
      },
      passwordShow: false,
      passwordRules: {
        required: (value) => !!value || "パスワードは必須です",
        regex: (value) =>
          /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{7,128}$/.test(value) ||
          "半角英小文字大文字数字をそれぞれ1種類以上含む6文字以上128文字以下で入力してください",
      },
    };
  },
  computed: {
    ...mapGetters({
      apiStatus: (state) => state.auth.apiStatus,
    }),
  },
  methods: {
    ...mapActions({
      isLoggedIn: "auth/isLoggedIn",
    }),
    async login() {
      try {
        // authストアのloginアクションを呼び出す
        await this.login(this.loginForm);

        //ログイン出来たらTOPページへ
        if (this.isLoggedIn) {
          this.$router.push("/top");
        } else {
          //メールアドレスもしくはパスワードが違うことを表示
          this.loginError = true;
        }
      } catch (e) {
        console.log(e);
      }
    },
    clearError() {
      this.loginError = false;
    },
  },
  created() {
    this.clearError();
  },
};
</script>
