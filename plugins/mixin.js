export default {
  data() {
    return {
      options: {
        enableHighAccuracy: false,
        timeout: 600000,
        maximumAge: 0,
      },
    };
  },

  methods: {
    getCurrentPosition() {
      navigator.geolocation.getCurrentPosition(
        this.success,
        this.error,
        this.options
      );
    },

    success(position) {
      // 現在地の緯度・軽度を設定する
      let lat = position.coords.latitude; //緯度を取得して定数latに代入
      let lon = position.coords.longitude; //経度を取得して定数lngに代入

      // storeにセット
      this.$store.commit("location/setLatitude", lat);
      this.$store.commit("location/setLongitude", lon);
    },

    error(error, reject) {
      switch (error.code) {
        case 1: // PERMISSION_DENIED
          alert("クイズに回答するには位置情報の利用を許可してください");
          break;
        case 2: // POSITION_UNAVAILABLE
          alert("現在位置が取得できませんでした");
          break;
        case 3: // TIMEOUT
          alert("タイムアウトになりました");
          break;
        default:
          alert("現在位置が取得できませんでした");
          break;
      }
    },

    getDistance(lat1, lng1, lat2, lng2) {
      function radians(deg) {
        return (deg * Math.PI) / 180;
      }

      // 地球の半径6378.14kmから計算(mで算出)
      return (
        6378.14 *
        1000 *
        Math.acos(
          Math.cos(radians(lat1)) *
            Math.cos(radians(lat2)) *
            Math.cos(radians(lng2) - radians(lng1)) +
            Math.sin(radians(lat1)) * Math.sin(radians(lat2))
        )
      );
    },

    validateLocation(spotLatitude, spotLongitude) {
      let distance = this.getDistance(
        this.$store.getters["location/latitude"],
        this.$store.getters["location/longitude"],
        spotLatitude,
        spotLongitude
      );

      // 300m以内で回答可能
      // if (distance <= 300) {
        return true;
      // } else {
      //   return false;
      // }
    },
  },
};
