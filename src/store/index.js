import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import vocabulary from './modules/vocabulary'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    instanceconfig: {
      api: '',
      solr: '',
      baseurl: ''
    },
    appconfig: {
      search: {
        selectionlimit: 5000
      },
      apis: {
        doi: {
          baseurl: 'doi.org',
          accept: 'application/vnd.citationstyles.csl+json'
        },
        sherparomeo: {
          url: 'http://www.sherpa.ac.uk/romeo/api29.php',
          key: 'V9cjsv6PTJE'
        }
      },
      suggesters: {}
    },
    user: {
      token: ''
    },
    alerts: []
  },
  mutations: {
    setAlerts (state, alerts) {
      state.alerts = alerts
    },
    clearAlert (state, alert) {
      state.alerts = state.alerts.filter(e => e !== alert)
    },
    clearUser (state) {
      Vue.set(state.user, 'token', '')
    },
    setToken (state, token) {
      Vue.set(state.user, 'token', token)
    },
    initStore (state) {
      Vue.set(state.user, 'token', '')
      state.alerts = []
    },
    setInstanceApi (state, api) {
      Vue.set(state.instanceconfig, 'api', api)
    },
    setInstanceSolr (state, solr) {
      Vue.set(state.instanceconfig, 'solr', solr)
    },
    setInstancePhaidra (state, baseurl) {
      Vue.set(state.instanceconfig, 'baseurl', baseurl)
    },
    setSuggester (state, data) {
      Vue.set(state.appconfig.suggesters, data.suggester, data.url)
    }
  },
  actions: {

    async login ({ commit, state }, credentials) {
      commit('initStore')
      try {
        let response = await axios.request({
          method: 'GET',
          url: state.instanceconfig.api + '/signin',
          headers: {
            'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
          }
        })
        if (response.data.alerts && response.data.alerts.length > 0) {
          commit('setAlerts', response.data.alerts)
        }
        if (response.data.status === 200) {
          commit('setToken', response.data['XSRF-TOKEN'])
          document.cookie = 'X-XSRF-TOKEN=' + response.data['XSRF-TOKEN']
        }
      } catch (error) {
        console.log(error)
        commit('setAlerts', [{ type: 'danger', msg: error }])
      }
    },
    async logout ({ commit, state }) {
      try {
        let response = await axios.request({
          method: 'GET',
          url: state.instanceconfig.api + '/signout',
          headers: {
            'X-XSRF-TOKEN': state.token
          }
        })
        commit('initStore')
        if (response.data.alerts && response.data.alerts.length > 0) {
          commit('setAlerts', response.data.alerts)
        }
      } catch (error) {
        console.log(error)
        commit('setAlerts', [{ type: 'danger', msg: error }])
      } finally {
        commit('initStore')
      }
    }
  },
  modules: {
    vocabulary
  },
  strict: debug
})
