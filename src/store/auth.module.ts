import router from "@/router";
import Vue from "vue";
import AuthService from "../services/auth.service";

type AuthState = {
  token: string;
  isAuthenticated: boolean;
  submitting: boolean;
};

const state = {
  token: "",
  isAuthenticated: false,
  submitting: false,
} as AuthState;

const getters = {
  isAuthenticated(state: AuthState) {
    return state.isAuthenticated;
  },
};

const actions = {
  async login(context: any, payload: any) {
    context.commit("setSubmitting");

    return AuthService.login(payload)
      .then(({ data }) => {
        const auth = {
          token: data.access_token,
          isAuthenticated: true,
          errors: null,
        };

        context.commit("setAuth", auth);
        router.push("/dashboard");
      })
      .catch((error) => {
        const message = String(error.response.data?.message);

        Vue.notify({
          type: "error",
          title: "Error!",
          text: message,
        });
      })
      .finally(() => context.commit("setSubmitting"));
  },
  logout(context: any) {
    context.commit("removeAuth");
    router.push("/");
  },
  async signup(context: any, payload: any) {
    context.commit("setSubmitting");

    return AuthService.signup(payload)
      .then(({ data }) => {
        Vue.notify({
          type: "success",
          title: "Success!",
          text: "The user was registered successfully!",
        });

        router.push("/dashboard");
      })
      .catch((error) => {
        const message = error.response.data.message;

        Vue.notify({
          type: "error",
          title: "Error!",
          text: message,
        });
      })
      .finally(() => context.commit("setSubmitting"));
  },
};

const mutations = {
  setSubmitting(state: AuthState) {
    state.submitting = !state.submitting;
  },
  setAuth(state: AuthState, auth: AuthState) {
    state.isAuthenticated = auth.isAuthenticated;
    state.token = auth.token;
  },
  removeAuth(state: AuthState) {
    state.isAuthenticated = false;
    state.token = "";
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
