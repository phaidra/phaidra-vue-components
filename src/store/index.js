import Vue from 'vue'
import Vuex from 'vuex'
import vocabulary from './modules/vocabulary'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    instanceconfig: {
      api: '',
      solr: ''
    },
    appconfig: {
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

    login ({ commit, state }, credentials) {
      return new Promise((resolve, reject) => {
        commit('initStore')

        fetch(state.instanceconfig.api + '/signin', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
          }
        })
          .then(function (response) { return response.json() })
          .then(function (json) {
            if (json.alerts && json.alerts.length > 0) {
              commit('setAlerts', json.alerts)
            }
            if (json.status === 200) {
              commit('setToken', json['XSRF-TOKEN'])
            // document.cookie = 'X-XSRF-TOKEN=' + json['XSRF-TOKEN']
            }
          })
          .catch(function (error) {
            console.log(error) // eslint-disable-line no-console
            reject(error)
          })
      })
    },
    logout ({ commit, state }) {
      return new Promise((resolve) => {
        fetch(state.instanceconfig.api + '/signout', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'X-XSRF-TOKEN': state.token
          }
        })
          .then(function (response) { return response.json() })
          .then(function (json) {
            commit('initStore')
            if (json.alerts && json.alerts.length > 0) {
              commit('setAlerts', json.alerts)
            }
            resolve()
          })
          .catch(function (error) {
            console.log(error) // eslint-disable-line no-console
            commit('initStore')
            resolve()
          })
      })
    }
  },
  modules: {
    vocabulary
  },
  strict: debug
})
