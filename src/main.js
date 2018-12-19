import Vue from 'vue'
import './plugins/vuetify'
import store from './store'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import eng from './i18n/eng'
import deu from './i18n/deu'
import ita from './i18n/ita'
import * as svgicon from 'vue-svgicon'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueI18n)

Vue.use(svgicon, {
  tagName: 'icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

const messages = { eng, deu, ita }
const i18n = new VueI18n({
  locale: 'deu',
  messages
})

new Vue({
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
