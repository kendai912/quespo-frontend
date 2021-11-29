<template>
  <v-card
    :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
    class="mx-auto fill-width"
    flat
    max-width="640"
  >
    <div class="px-4 py-8">
      <div style="max-width: 344px" class="mx-auto">
        <div v-if="registerError" class="login-error">
          既に登録済みのメールアドレスです
        </div>
        <!-- <div>
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
            Facebookで登録
          </v-btn>
        </div>
        <div class="separator">
          <div class="middle-separator">または</div>
        </div> -->
        <div class="pt-0">
          <v-form ref="form">
            <div>
              <v-text-field
                v-model="registerForm.name"
                v-on:keydown.enter="register"
                :rules="[nameRules.required, nameRules.regex]"
                autofocus
                dense
                height="48px"
                outlined
                placeholder="ユーザー名"
              ></v-text-field>

              <v-text-field
                v-model="registerForm.email"
                v-on:keydown.enter="register"
                :rules="[emailRules.required, emailRules.regex]"
                autofocus
                dense
                height="48px"
                outlined
                placeholder="メールアドレス"
              ></v-text-field>

              <v-text-field
                v-model="registerForm.password"
                v-on:keydown.enter="register"
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
                v-on:click="register"
                class="fill-width caption"
                color="#FFCB00"
                depressed
                height="48px"
                tile
              >
                会員登録
              </v-btn>
            </div>
            <v-divider></v-divider>
            <div class="pt-8 pb-4">
              <span>すでにアカウントをお持ちですか？</span>
              <nuxt-link to="/login">ログインに移動</nuxt-link>
            </div>
          </v-form>
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
      registerForm: {
        name: null,
        email: null,
        password: null,
      },
      registerError: false,
      nameRules: {
        required: (value) => !!value || "ユーザー名は必須です",
        regex: (value) => value?.length <= 10 || "10文字以内で入力してください",
      },
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
          /^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z\d]{7,128}$/.test(value) ||
          "半角英字数字をそれぞれ1種類以上含む6文字以上128文字以下で入力してください",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      isLoggedIn: "auth/isLoggedIn",
    }),
    async register() {
      if (this.$refs.form.validate()) {
        try {
          // authストアのregisterアクションを呼び出す
          await this.register(this.registerForm);

          //ログイン出来たらTOPページへ
          if (this.isLoggedIn) {
            this.$router.push("/top");
          } else {
            //登録済みのアカウントであることを表示
            this.registerError = true;
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    clearError() {
      this.registerError = false;
    },
  },
  created() {
    this.clearError();
  },
};
</script>
