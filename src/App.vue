<template>
  <div id="app">
    <v-app>
      <v-container justify-center grid-list-lg>
        <v-layout column>  
          
          <h4 class="text-lg-right subheading mb-3">Phaidra Vue Components {{version}}</h4>
        
          <v-flex xs4>
            <v-alert v-for="(alert, i) in alerts" :type="(alert.type === 'danger' ? 'error' : alert.type)" :value="true" transition="slide-y-transition" :key="i">
              <v-layout row><v-flex class="pa-3">{{alert.msg}}</v-flex><v-spacer></v-spacer><v-btn icon @click.native="dismiss(alert)"><v-icon>close</v-icon></v-btn></v-layout>
            </v-alert>
          </v-flex>

          <v-layout row>  
            <v-flex xs3>
              <v-text-field v-model="solrbaseurl" :label="'solr'"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-text-field v-model="apibaseurl" :label="'phaidra-api'"></v-text-field>
            </v-flex>
            <template v-if="token">
              <v-flex xs6>
                <h3 class="font-weight-light pt-4">Logged in [{{ token }}]</h3>
              </v-flex>
              <v-flex xs1>
                <v-btn raised single-line color="primary lighten-2" class="mt-3" @click="logout()">Logout</v-btn>
              </v-flex>
            </template>
            <template v-else>
              <v-flex xs2> 
                <v-text-field v-model="credentials.username" :label="'username'" ></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field 
                  v-model="credentials.password" 
                  :label="'password'" 
                  :append-icon="psvis ? 'visibility' : 'visibility_off'"
                  @click:append="toggleVisibility"
                  :type="psvis ? 'password' : 'text'"
                ></v-text-field>
              </v-flex>
              <v-flex xs1>
                <v-btn raised single-line color="primary lighten-2" class="mt-3" @click="login()">Login</v-btn>
              </v-flex>
            </template>
          </v-layout> 

          <v-layout row> 
            <v-flex xs2>
              <v-navigation-drawer permanent>
                <v-toolbar flat>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-title class="title">{{ $t('Examples') }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-toolbar>
                <v-divider></v-divider>
                <v-list>
                  <v-item-group v-model="window" class="shrink mr-4" mandatory tag="v-flex">
                    <v-item>
                      <div slot-scope="{ active, toggle }">
                        <v-list-tile @click="toggle">
                          <v-list-tile-content>
                            <v-list-tile-title>{{ $t('Display') }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </div>
                    </v-item>
                    <v-item>
                      <div slot-scope="{ active, toggle }">
                        <v-list-tile @click="toggle">
                          <v-list-tile-content>
                            <v-list-tile-title>{{ $t('Edit') }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </div>
                    </v-item>
                    <v-item>
                      <div slot-scope="{ active, toggle }">
                        <v-list-tile @click="toggle">
                          <v-list-tile-content>
                            <v-list-tile-title>{{ $t('Submit') }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </div>
                    </v-item>
                  </v-item-group>
                </v-list>
              </v-navigation-drawer>
            </v-flex>

            <v-flex>
              <v-window v-model="window">
                <v-window-item>
                  <v-flex>
                    <v-card>
                      <v-toolbar flat>
                        <v-toolbar-title>Display</v-toolbar-title>
                        <v-divider class="mx-3" inset vertical></v-divider>
                        <v-text-field v-model="pid" :placeholder="'o:123456789'"></v-text-field>
                        <v-spacer></v-spacer>
                        <v-btn raised single-line class="right" color="primary lighten-2" @click="loadDisplay()">Load</v-btn>
                      </v-toolbar>
                      <v-card-text>
                        <p-d-jsonld 
                          ref="display"
                          :pid="pid"
                          :jsonld="displayjsonld"
                          v-on:load-jsonld="displayjsonld = $event"
                        ></p-d-jsonld>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-window-item>
                <v-window-item>
                  <v-flex>
                    <v-card>
                      <v-toolbar flat>
                        <v-toolbar-title>Edit</v-toolbar-title>
                        <v-divider class="mx-3" inset vertical></v-divider>
                        <v-text-field v-model="pid" :placeholder="'o:123456789'"></v-text-field>
                        <v-spacer></v-spacer>
                        <v-btn raised single-line class="right" color="primary lighten-2" @click="loadEdit()">Load</v-btn>
                      </v-toolbar>
                      <v-card-text>
                        <p-i-form 
                          ref="edit"
                          :form="editform"
                          v-on:load-form="editform = $event"
                          v-on:object-saved="objectSaved($event)"
                        ></p-i-form>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-window-item>
                <v-window-item>
                  <v-flex>
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
                        <p-i-form
                          :form="form"
                          :contentmodel="contentmodel" 
                          v-on:object-created="objectCreated($event)"
                          v-on:load-form="form = $event"
                        ></p-i-form>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-window-item>
              </v-window>
            </v-flex>

          </v-layout>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import PIForm from '@/components/input/PIForm'
import PDJsonld from '@/components/display/PDJsonld'
import {version} from '../package.json'
import fields from '@/utils/fields'

export default {
  name: 'app',
  components: {
    PIForm,
    PDJsonld
  },
  computed: {
    token: function() {
      return this.$store.state.user.token
    },
    alerts: function () {
      return this.$store.state.alerts.alerts
    }
  },
  data () {
    return {
      window: 2,
      displayjsonld: {},
      editform: {},
      form: {
        sections: [
          {
            title: 'General metadata',
            id: 1,
            fields: []
          },
          {
            title: 'Digitized object',
            type: 'phaidra:Subject',
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
      solrbaseurl: 'https://app01.cc.univie.ac.at:8983/solr/phaidra_sandbox',
      apibaseurl: 'https://services.phaidra-sandbox.univie.ac.at/api',
      credentials: {
        username: '',
        password: ''
      },
      version: version,
      contentmodel: 'https://pid.phaidra.org/vocabulary/resourcetype/HMJ4-EW36',
      contentmodels: [
        { 
          text: 'Data', 
          value: 'https://pid.phaidra.org/vocabulary/resourcetype/VR5J-0CBC',
        }, 
        { 
          text: 'Picture', 
          value: 'https://pid.phaidra.org/vocabulary/resourcetype/HMJ4-EW36' 
        }, 
        { 
          text: 'Audio', 
          value: 'https://pid.phaidra.org/vocabulary/resourcetype/MXND-R5ZY' 
        }, 
        { 
          text: 'Video', 
          value: 'https://pid.phaidra.org/vocabulary/resourcetype/S7JC-WBBH' 
        }, 
        { 
          text: 'Document',
           value: 'https://pid.phaidra.org/vocabulary/resourcetype/B4CB-FN5F' 
        }, 
        { 
          text: 'Container',
           value: 'https://pid.phaidra.org/vocabulary/resourcetype/HS9G-WDM9' 
        }
      ],
      psvis: true
    }
  },
  watch: {
    contentmodel: function (val) {
      for (var i = 0; i < this.form.sections.length; i++) {
        for (var j = 0; j < this.form.sections[i].fields.length; j++) {
          if (this.form.sections[i].fields[j].predicate === 'dcterms:type') {
            this.form.sections[i].fields[j].value = this.contentmodel
          }
        }
      }
    }
  },
  methods: {
    loadDisplay: function() {
      this.$refs.display.loadMetadata(this.pid)
    },
    loadEdit: function() {
      this.editform = {}
      this.$refs.edit.loadMetadata(this.pid)
    },
    login: function () {
      this.$store.dispatch('login', this.credentials)
    },
    logout: function () {
      this.$store.dispatch('logout')
      document.cookie = 'X-XSRF-TOKEN='
    },
    objectCreated: function (event) {
      this.$store.commit('setAlerts', [{ type: 'success', msg: 'Object ' + event + ' created' }])
    },
    objectSaved: function (event) {
      this.$store.commit('setAlerts', [{ type: 'success', msg: 'Metadata for object ' + event + ' saved' }])
    },
    toggleVisibility: function () {
      this.psvis = !this.psvis
    },    
    dismiss: function (alert) {
      this.$store.commit('clearAlert', alert)
    },
    getCookie: function (name) {
      var value = "; " + document.cookie
      var parts = value.split("; " + name + "=")
      if (parts.length == 2) {
        var val = parts.pop().split(";").shift()
        return val === ' ' ? null : val
      }
    }
  },
  mounted: function () {
    var token = this.getCookie('X-XSRF-TOKEN')
    if (token) {
      // TODO init userdata if setting token from cookie
      this.$store.commit('setToken', token)
    }

    this.$store.commit('setInstanceApi', this.apibaseurl)
    this.$store.commit('setInstanceSolr', this.solrbaseurl)
    this.$store.commit('setSuggester', { suggester: 'getty', url: 'https://ws.gbv.de/suggest/getty/' })
    this.$store.commit('setSuggester', { suggester: 'gnd', url: 'https://ws.gbv.de/suggest/gnd/' })

    var rt = fields.getField('resource-type')
    if (this.contentmodel) {
      rt.value = this.contentmodel
    }
    this.form.sections[0].fields.push(rt)
    this.form.sections[0].fields.push(fields.getField('file'))
    this.form.sections[0].fields.push(fields.getField('genre'))
    this.form.sections[0].fields.push(fields.getField('title'))
    var translatedtitle = fields.getField('title')
    translatedtitle.type = 'bf:ParallelTitle'
    this.form.sections[0].fields.push(translatedtitle)
    this.form.sections[0].fields.push(fields.getField('language'))
    this.form.sections[0].fields.push(fields.getField('description'))
    this.form.sections[0].fields.push(fields.getField('is-in-series'))
    this.form.sections[0].fields.push(fields.getField('date-edtf'))
    this.form.sections[0].fields.push(fields.getField('number-of-pages'))
    var gnd = fields.getField('gnd-subject')
    gnd.exactvoc = 'EthnographicName'
    gnd.label = 'Ethnografikum (GND)'
    this.form.sections[0].fields.push(gnd)
    this.form.sections[0].fields.push(fields.getField('keyword'))
    var subject = fields.getField('subject')
    subject.vocabulary = 'basisklassifikation'
    this.form.sections[0].fields.push(subject)
    this.form.sections[0].fields.push(fields.getField('study-plan'))
    var proj = fields.getField('project')
    proj.multiplicable = true
    this.form.sections[0].fields.push(proj)
    this.form.sections[0].fields.push(fields.getField('funder'))
    var r = fields.getField('role')
    r.role = 'role:coadvisor'
    this.form.sections[0].fields.push(r)
    var r2 = fields.getField('role')
    r2.showname = true
    this.form.sections[0].fields.push(r2)
    this.form.sections[0].fields.push(fields.getField('license'))

    this.form.sections[1].fields.push(fields.getField('title'))
    this.form.sections[1].fields.push(fields.getField('description'))
    this.form.sections[1].fields.push(fields.getField('inscription'))
    var accessiondate = fields.getField('date-edtf')
    accessiondate.type = 'phaidra:dateAccessioned'
    this.form.sections[1].fields.push(accessiondate)
    this.form.sections[1].fields.push(fields.getField('technique-vocab'))
    this.form.sections[1].fields.push(fields.getField('technique-text'))
    this.form.sections[1].fields.push(fields.getField('material-vocab'))
    this.form.sections[1].fields.push(fields.getField('material-text'))
    this.form.sections[1].fields.push(fields.getField('height'))
    this.form.sections[1].fields.push(fields.getField('shelf-mark'))
    this.form.sections[1].fields.push(fields.getField('digitization-note'))
    this.form.sections[1].fields.push(fields.getField('reproduction-note'))
    
    this.form.sections[2].fields.push(fields.getField('title'))
    this.form.sections[2].fields.push(fields.getField('description'))
    this.form.sections[2].fields.push(fields.getField('temporal-coverage'))
    this.form.sections[2].fields.push(fields.getField('spatial-getty'))
    this.form.sections[2].fields.push(fields.getField('spatial-text'))
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
