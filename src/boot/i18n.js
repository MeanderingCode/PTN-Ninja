import VueI18n from "vue-i18n";
import messages from "src/i18n";

export default async ({ app, Vue }) => {
  Vue.use(VueI18n);

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: navigator.language.toLowerCase(),
    fallbackLocale: "en-us",
    messages
  });

  Vue.moment.updateLocale("en", messages["en-us"].date);
  Vue.moment.locale(app.i18n.locale);
};
