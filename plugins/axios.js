export default function ({ $axios, app }) {
  $axios.onRequest((config) => {
    config.headers.Authorization = `Bearer ${app.$cookies.get("api_token")}`;

    return config;
  });
}
