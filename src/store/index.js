import Vue from 'vue'
import Vuex from 'vuex'
import vocabulary from './modules/vocabulary'
import config from '../config/phaidra-ui'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    config: config
  },
  modules: {
    vocabulary
  },
  strict: debug
})
