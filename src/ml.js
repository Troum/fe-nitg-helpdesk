import Vue from 'vue';
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage';
import russian from "./static/russian";
import english from "./static/english";

Vue.use(MLInstaller);

export default new MLCreate({
  initial: 'ru',
  save: process.env.NODE_ENV === 'production',
  languages: [
      new MLanguage('ru').create(russian),
      new MLanguage('en').create(english),
  ]
})
