export default async ({ store, route, redirect }) => {
  // LPまたはログイン済みの場合何もしない
  if (route.name === "index" || store.getters["auth/isLoggedIn"]) {
    return false;
  }

  // LP以外でログインしていない場合はLPにリダイレクト
  if (!store.getters["auth/isLoggedIn"]) {
    // return redirect("/");
  }
};
