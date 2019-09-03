import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify/lib'
import VueI18n from 'vue-i18n'
import SvgIcon from 'vue-svgicon'
import eng from './i18n/eng'
import deu from './i18n/deu'
import ita from './i18n/ita'
import App from './App.vue'
import moment from 'moment'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.use(SvgIcon, {
  tagName: 'icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.filter('unixtime', function (value) {
  if (value) {
    return moment.unix(String(value)).format('DD.MM.YYYY hh:mm:ss')
  }
})

Vue.filter('date', function (value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY')
  }
})

Vue.filter('truncate', function (text, length, clamp) {
  clamp = clamp || '...'
  length = length || 30

  if (text.length <= length) return text

  var tcText = text.slice(0, length - clamp.length)
  var last = tcText.length - 1

  while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1

  // Fix for case when text does not have any space
  last = last || length - clamp.length

  tcText = tcText.slice(0, last)

  return tcText + clamp
})

const messages = { eng, deu, ita }
const i18n = new VueI18n({
  locale: 'deu',
  fallbackLocale: 'eng',
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  messages: messages
})

const router = new VueRouter({
  routes: [
    {
      name: 'detail',
      path: '/details',
      component: {
        template: '<div><b>Details</b> not implemented in PVC demo app</div>'
      }
    }
  ]
})

new Vue({
  store,
  i18n,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
