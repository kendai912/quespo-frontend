<template>
  <v-card
    :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
    class="mx-auto fill-width"
    flat
    max-width="640"
  >
    <div class="px-4 py-8">
      <div style="max-width: 344px" class="mx-auto">
        <div>
          <v-btn
            class="fill-width mt-5 text-capitalize caption"
            color="#385184"
            dark
            depressed
            height="48px"
            tile
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
          <div class="middle_separator">または</div>
        </div>
        <div class="pt-0">
          <div>
            <v-text-field
              v-model="email"
              :rules="[emailRules.required, emailRules.regex]"
              autofocus
              dense
              height="48px"
              outlined
              placeholder="メールアドレス"
            ></v-text-field>

            <v-text-field
              v-model="password"
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
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import myMixin from "../store/util";

export default {
  data() {
    return {
      email: null,
      emailRules: {
        required: (value) => !!value || "メールアドレスは必須です",
        regex: (value) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          ) || "メールアドレスの形式が違います",
      },
      password: null,
      passwordShow: false,
      passwordRules: {
        required: (value) => !!value || "パスワードは必須です",
        regex: (value) =>
          /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{7,128}$/.test(value) ||
          "半角英小文字大文字数字をそれぞれ1種類以上含む6文字以上128文字以下で入力してください",
      },
    };
  },
  mixins: [myMixin],
};
</script>
