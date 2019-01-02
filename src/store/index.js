import Vue from 'vue'
import Vuex from 'vuex'
import vocabulary from './modules/vocabulary'
import user from './modules/user'
import alerts from './modules/alerts'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    settings: { 
      instance: {
        api: '',
        solr: ''
      }
    }
  },
  mutations: {
    setInstanceApi (state, api) {
      state.settings.instance.api = api
    },
    setInstanceSolr (state, solr) {
      state.settings.instance.solr = solr
    }
  },
  modules: {
    vocabulary,
    user,
    alerts
  },
  strict: debug
})
