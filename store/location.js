import {
  OK,
  CREATED,
  DELETED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
} from "./util";

const state = () => ({
  latitude: null,
  longitude: null,
  locationTimer: null,
});

const getters = {
  latitude: (state) => state.latitude,
  longitude: (state) => state.longitude,
  locationTimer: (state) => state.locationTimer,
};

const mutations = {
  setLatitude(state, data) {
    state.latitude = data;
  },
  setLongitude(state, data) {
    state.longitude = data;
  },
  setLocationTimer(state, data) {
    state.locationTimer = data;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
