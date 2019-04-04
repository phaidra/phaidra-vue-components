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
                          :form="editform"
                          :targetpid="this.pid"
                          v-on:object-saved="objectSaved($event)"
                          v-on:load-form="form = $event"
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
import jsonLd from '@/utils/json-ld'

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
        sections: []
      },
      pid: '',
      solrbaseurl: 'https://app01.cc.univie.ac.at:8983/solr/phaidra_sandbox',
      apibaseurl: 'https://services.phaidra-sandbox.univie.ac.at/api',
      credentials: {
        username: '',
        password: ''
      },
      version: version,
      contentmodel: 'https://pid.phaidra.org/vocabulary/8MY0-BQDQ',
      contentmodels: [
        { 
          text: 'Data', 
          value: 'https://pid.phaidra.org/vocabulary/7AVS-Y482',
        }, 
        { 
          text: 'Picture', 
          value: 'https://pid.phaidra.org/vocabulary/44TN-P1S0' 
        }, 
        { 
          text: 'Audio', 
          value: 'https://pid.phaidra.org/vocabulary/8YB5-1M0J' 
        }, 
        { 
          text: 'Video', 
          value: 'https://pid.phaidra.org/vocabulary/B0Y6-GYT8' 
        }, 
        { 
          text: 'Document',
           value: 'https://pid.phaidra.org/vocabulary/69ZZ-2KGX' 
        }, 
        { 
          text: 'Container',
           value: 'https://pid.phaidra.org/vocabulary/8MY0-BQDQ' 
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
    loadMetadata: function (pid) {
      this.loadedMetadata = []
      var self = this
      var url = self.$store.state.settings.instance.api + '/object/' + pid + '/metadata?mode=resolved'
      var promise = fetch(url, {
        method: 'GET',
        mode: 'cors'
      })
      .then(function (response) { return response.json() })
      .then(function (json) {
        if (json.metadata['JSON-LD']) {
          return json.metadata['JSON-LD']
        }
      })
      .catch(function (error) {
        console.log(error)
      })
      return promise
    },
    loadDisplay: function() {
      this.displayjsonld = {}
      let self = this
      this.loadMetadata(self.pid).then(function (jsonld) { 
        self.displayjsonld = jsonld 
      })
    },
    loadEdit: function() {
      let self = this
      this.loadMetadata(self.pid).then(function (jsonld) { 
        self.editform = jsonLd.json2form(jsonld)
      })
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
    },
    createSimpleForm: function (index) {
      this.form = {
        sections: [
          {
            title: 'Movie metadata',
            id: 1,
            fields: []
          }
        ]
      }
      let rt = fields.getField('resource-type')
      rt.value = 'https://pid.phaidra.org/vocabulary/8MY0-BQDQ'
      this.form.sections[0].fields.push(rt)

      let tit = fields.getField('title')
      tit.titleLabel = 'Original title'
      this.form.sections[0].fields.push(tit)

      let paralelltitle = fields.getField('title')
      paralelltitle.type = 'bf:ParallelTitle'
      this.form.sections[0].fields.push(paralelltitle)

      let ser = fields.getField('series')
      ser.label = 'Series title'
      ser.hideVolume = true
      ser.hideIssue = true
      ser.hideIssued = true
      ser.hideIssn = true
      ser.hideIdentifier = true
      this.form.sections[0].fields.push(ser)

      let actor = fields.getField('role')
      actor.role = 'role:act'
      this.form.sections[0].fields.push(actor)

      let director = fields.getField('role')
      director.role = 'role:drt'
      this.form.sections[0].fields.push(director)

      let screenplay = fields.getField('role')
      screenplay.role = 'role:aus'
      this.form.sections[0].fields.push(screenplay)

      let camera = fields.getField('role')
      camera.role = 'role:cng'
      this.form.sections[0].fields.push(camera)

      let music = fields.getField('role')
      music.role = 'role:msd'
      this.form.sections[0].fields.push(music)

      let production = fields.getField('role')
      production.role = 'role:pro'
      this.form.sections[0].fields.push(production)

      let productioncomp = fields.getField('role')
      productioncomp.type = 'schema:Organisation'
      productioncomp.role = 'role:prn'
      productioncomp.showname = true
      productioncomp.hideRole = true
      productioncomp.institutionLabel = 'Production company'
      this.form.sections[0].fields.push(productioncomp)

      let prodplace = fields.getField('role')
      prodplace.type = 'schema:Organisation'
      prodplace.role = 'role:prp'
      prodplace.institutionLabel = 'Production country'
      prodplace.showname = true
      prodplace.hideRole = true
      this.form.sections[0].fields.push(prodplace)

      let prodyear = fields.getField('date-edtf')
      prodyear.type = 'rdau:P60071'
      prodyear.hideType = true
      prodyear.dateLabel = 'Production year'
      this.form.sections[0].fields.push(prodyear)

      let dur = fields.getField('duration')
      dur.hideHours = true,
      dur.hideSeconds = true,
      this.form.sections[0].fields.push(dur)

      this.form.sections[0].fields.push(fields.getField('language'))

      this.form.sections[0].fields.push(fields.getField('subtitle-language'))

      let desc = fields.getField('description')
      desc.label = 'Content description'
      this.form.sections[0].fields.push(desc)

      let adp = fields.getField('movieadaptation') 
      adp.role = 'role:aut'
      this.form.sections[0].fields.push(adp)

      let genre = fields.getField('genre')
      genre.vocabulary = 'moviegenre'
      this.form.sections[0].fields.push(genre)

      this.form.sections[0].fields.push(fields.getField('keyword'))

     let dceformat = fields.getField('dce-format-vocab')
      dceformat.vocabulary = 'dceformat'
      this.form.sections[0].fields.push(dceformat)

      let tech = fields.getField('technique-vocab')
      tech.vocabulary = 'technique'
      tech.value = 'https://pid.phaidra.org/vocabulary/K818-FSM5'
      this.form.sections[0].fields.push(tech)

      let tech2 = fields.getField('technique-vocab')
      tech2.vocabulary = 'technique'
      tech2.value = 'https://pid.phaidra.org/vocabulary/1K09-VXQ4'
      this.form.sections[0].fields.push(tech2)

      this.form.sections[0].fields.push(fields.getField('supplementary-content'))

      this.form.sections[0].fields.push(fields.getField('award'))

      let aud = fields.getField('audience-vocab')
      aud.vocabulary = 'audience'
      this.form.sections[0].fields.push(aud)

      let regcode = fields.getField('regional-encoding')
      regcode.vocabulary = 'regionalencoding'
      this.form.sections[0].fields.push(regcode)

      this.form.sections[0].fields.push(fields.getField('note'))

      let physloc = fields.getField('physical-location-select-text')
      physloc.vocabulary = 'pool'
      this.form.sections[0].fields.push(physloc)

      this.form.sections[0].fields.push(fields.getField('shelf-mark'))
    },
    createContainerForm: function (index) {
      this.createSimpleForm()

      let section = {
        title: 'File',
        id: 4,
        type: 'member',
        multiplicable: true,
        fields: []
      }
      var rt = fields.getField('resource-type')
      rt.value = this.contentmodel
      section.fields.push(rt)
      section.fields.push(fields.getField('file'))
      section.fields.push(fields.getField('title'))
      section.fields.push(fields.getField('description'))
      var mt = fields.getField('mime-type')
      mt.value = 'image/jpeg'
      mt.required = true
      section.fields.push(mt)
      section.fields.push(fields.getField('digitization-note'))
      section.fields.push(fields.getField('role'))
      section.fields.push(fields.getField('license'))
      section.fields.push(fields.getField('rights'))

      this.form.sections.push(section)
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

    this.createSimpleForm()
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
