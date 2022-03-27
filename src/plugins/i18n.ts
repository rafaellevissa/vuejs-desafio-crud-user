import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "../i18n/en.json";
import pt from "../i18n/pt.json";

Vue.use(VueI18n);

export default new VueI18n({
  locale: "pt",
  messages: {
    en: en,
    pt: pt,
  },
});
