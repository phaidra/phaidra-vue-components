<template>
  <div id="app">
    <v-app>
      <v-container fluid grid-list-lg>
        <h4 class="text-lg-right subheading mb-3">Phaidra Vue Components {{version}}</h4>
        <v-alert v-for="(alert, i) in alerts" :type="(alert.type === 'danger' ? 'error' : alert.type)" :value="true" v-if="alert.msg" transition="slide-y-transition" :key="i">
          <v-layout>{{alert.msg}}<v-spacer></v-spacer><icon name="material-navigation-close" color="grey lighten-1" @click.native="dismiss(alert)"></icon></v-layout>
        </v-alert>
        <v-layout row>  
          <v-flex xs4>
            <v-text-field :value="apibaseurl" :label="'API'"></v-text-field>
          </v-flex>
          <v-flex xs2> 
            <v-text-field v-model="credentials.username" :label="'Username'" ></v-text-field>
          </v-flex>
          <v-flex xs2>
            <v-text-field 
              v-model="credentials.password" 
              :label="'Password'" 
              :append-icon="psvis ? 'visibility' : 'visibility_off'"
              @click:append="toggleVisibility"
              :type="psvis ? 'password' : 'text'"
            ></v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-btn raised single-line color="primary lighten-2" class="mt-3" @click="login()">Login</v-btn>
          </v-flex>
          <v-flex v-if="user" xs2>
            <h3 class="font-weight-light pt-4">Logged in as [{{ user }}]</h3>
          </v-flex>

        </v-layout> 
        <v-layout justify-center>
          <v-flex xs6>
            <v-card>
              <v-toolbar flat>
                <v-toolbar-title>Display</v-toolbar-title>
                <v-divider class="mx-3" inset vertical></v-divider>
                <v-text-field v-model="pid" :placeholder="'o:123456789'"></v-text-field>
                <v-spacer></v-spacer>
                <v-btn raised single-line class="right" color="primary lighten-2" @click="load()">Load</v-btn>
              </v-toolbar>
              <v-card-text>
                <p-d-jsonld :pid="pid" ref="display"></p-d-jsonld>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6>            
            <v-card>
              <v-toolbar flat>
                <v-toolbar-title>Submit</v-toolbar-title>
                <v-divider class="mx-3" inset vertical></v-divider>
                <v-select
                  :items="contentmodels"
                  v-model="contentmodel"
                  label="Object type"
                  single-line
                ></v-select>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <p-i-form :definition="form" :contentmodel="contentmodel" v-on:created="created($event)"></p-i-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import PIForm from '@/components/input/PIForm'
import PDJsonld from '@/components/display/PDJsonld'
import '@/compiled-icons/material-navigation-close'
import {version} from '../package.json';

export default {
  name: 'app',
  components: {
    PIForm,
    PDJsonld
  },
  computed: {
    user: function() {
      return this.$store.state.user.lastname ? this.$store.state.user.firstname + ' ' + this.$store.state.user.lastname : null
    },
    alerts: function () {
      return this.$store.state.alerts.alerts
    }
  },
  data () {
    return {
      form: {
        sections: [
          {
            title: 'General metadata',
            id: 1,
            fields: []
          },
          {
            title: 'Digitized object',
            type: 'phaidra:DigitizedObject',
            id: 2,
            fields: []
          },
          {
            title: 'Subject',
            type: 'phaidra:Subject',
            id: 3,
            multiplicable: true,
            fields: []
          }
        ]
      },
      pid: '',
      apibaseurl: 'https://services.phaidra-sandbox.univie.ac.at/api',
      credentials: {
        username: '',
        password: ''
      },
      version: version,
      contentmodel: 'unknown',
      contentmodels: [ { text: 'Data', value: 'unknown' }, { text: 'Picture', value: 'picture' } ],
      psvis: true
    }
  },
  methods: {
    load: function() {
      this.$refs.display.loadMetadata(this.pid)
    },
    login: function () {
      this.$store.dispatch('login', this.credentials)
    },
    logout: function () {
      this.$store.dispatch('logout')
    },
    created: function (event) {
      this.pid = event
      this.$store.commit('setAlerts', [{ type: 'success', msg: 'Object ' + this.pid + ' created' }])
      this.load()
    },
    toggleVisibility: function () {
      this.psvis = !this.psvis
    },    
    dismiss: function (alert) {
      this.$store.commit('clearAlert', alert)
    }
  },
  mounted: function () {
    this.$store.commit('setInstanceApi', this.apibaseurl)

    this.form.sections[0].fields.push(this.$store.getters.getField('file'))
    this.form.sections[0].fields.push(this.$store.getters.getField('resource-type'))
    this.form.sections[0].fields.push(this.$store.getters.getField('title'))
    this.form.sections[0].fields.push(this.$store.getters.getField('description'))
    this.form.sections[0].fields.push(this.$store.getters.getField('role'))
    this.form.sections[0].fields.push(this.$store.getters.getField('license'))

    this.form.sections[1].fields.push(this.$store.getters.getField('title'))
    this.form.sections[1].fields.push(this.$store.getters.getField('description'))
    
    this.form.sections[2].fields.push(this.$store.getters.getField('title'))
    this.form.sections[2].fields.push(this.$store.getters.getField('description'))
  }
}
</script>

<style>
#app {
  font-family: "Roboto", sans-serif, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.right {
  float: right;
}
</style>
