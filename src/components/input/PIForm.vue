<template>
  <v-container grid-list-lg v-if="form && form.sections">
    <v-tabs v-model="activetab" align-with-title>
      <v-tab ripple><template v-if="loadedPid"><span class="text-lowercase">{{ loadedPid }}</span>&nbsp;-&nbsp;<span>{{ $t('edit') }}</span></template><template v-else >{{ $t('Submit') }}</template>&nbsp;{{ $t('metadata') }}</v-tab>
      <v-tab ripple @click="generateJson()">{{ $t('Metadata preview') }}</v-tab>
      <v-tab v-if="templating" ripple @click="loadTemplates()">{{ $t('Templates') }}</v-tab>
    </v-tabs>
  
    <v-tabs-items v-model="activetab">
      <v-tab-item class="pa-3" v-if="form">

        <v-layout v-for="(s) in this.form.sections" :key="s.id" column wrap class="ma-3">
          
          <v-card >
            <v-card-title class="headline grey white--text">
              <span>{{ $t(s.title) }}</span>
              <v-spacer></v-spacer>
              <v-menu v-if="s.multiplicable" open-on-hover bottom offset-y>
                <v-btn slot="activator" icon dark>
                  <v-icon dark>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile @click="addSection(s)">
                    <v-list-tile-title>{{ $t('Duplicate') }}</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="removeSection(s)">
                    <v-list-tile-title>{{ $t('Remove') }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="mt-4">
              <v-layout column wrap>
                <template v-for="(f) in s.fields">
                  <v-flex offset-xs1 v-if="f.component === 'p-text-field'" :key="f.id">
                    <p-i-text-field             
                      v-bind.sync="f"
                      v-on:input="f.value=$event"
                      v-on:input-language="setSelected(f, 'language', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-text-field>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-text-field-suggest'" :key="f.id">
                    <p-i-text-field-suggest
                      v-bind.sync="f"
                      v-on:input="f.value=$event"
                      v-on:input-language="setSelected(f, 'language', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-text-field-suggest>
                  </v-flex>

                  <v-flex offset-xs1 v-if="f.component === 'p-title'" :key="f.id">
                    <p-i-title            
                      v-bind.sync="f"
                      v-on:input-title="f.title=$event"
                      v-on:input-subtitle="f.subtitle=$event"
                      v-on:input-language="setSelected(f, 'language', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                      v-on:up="sortFieldUp(s.fields, f)"
                      v-on:down="sortFieldDown(s.fields, f)"
                    ></p-i-title>
                  </v-flex>

                  <v-flex offset-xs1 xs4 v-else-if="f.component === 'p-select'" :key="f.id">
                    <p-i-select 
                      v-bind.sync="f" 
                      v-on:input="selectInput(f, $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-select>        
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-date-edtf'" :key="f.id">
                    <p-i-date-edtf
                      v-bind.sync="f" 
                      v-on:input-date="f.value=$event"
                      v-on:input-date-type="setSelected(f, 'type', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-date-edtf>        
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-entity'" :key="f.id">
                    <p-i-entity
                      v-bind.sync="f"
                      v-on:input-firstname="f.firstname=$event"
                      v-on:input-lastname="f.lastname=$event"
                      v-on:input-institution="f.institution=$event"
                      v-on:input-identifier="f.identifier=$event"
                      v-on:input-role="roleInput(f, $event)"
                      v-on:input-date="f.date=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                      v-on:up="sortFieldUp(s.fields, f)"
                      v-on:down="sortFieldDown(s.fields, f)"
                    ></p-i-entity>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-spatial-getty'" :key="f.id">
                    <p-i-spatial-getty
                      v-bind.sync="f" 
                      v-on:input="f.value=$event"
                      v-on:input-place-type="setSelected(f, 'type', $event)"
                      v-on:resolve="updatePlace(f, $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-spatial-getty>        
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-spatial-text'" :key="f.id">
                    <p-i-spatial-text
                      v-bind.sync="f" 
                      v-on:input="f.value=$event"
                      v-on:input-place-type="setSelected(f, 'type', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-spatial-text>        
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-dimension'" :key="f.id">
                    <p-i-dimension
                      v-bind.sync="f" 
                      v-on:input-value="f.value=$event"
                      v-on:input-unit="setSelected(f, 'unitCode', $event)"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-dimension>        
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-project'" :key="f.id">
                    <p-i-project
                      v-bind.sync="f" 
                      v-on:input-name="f.name=$event"
                      v-on:input-name-language="setSelected(f, 'nameLanguage', $event)"
                      v-on:input-description="f.description=$event"
                      v-on:input-description-language="setSelected(f, 'descriptionLanguage', $event)"
                      v-on:input-identifier="f.identifier=$event"
                      v-on:input-homepage="f.homepage=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-project>        
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-funder'" :key="f.id">
                    <p-i-funder
                      v-bind.sync="f" 
                      v-on:input-name="f.name=$event"
                      v-on:input-name-language="setSelected(f, 'nameLanguage', $event)"
                      v-on:input-identifier="f.identifier=$event"
                      v-on:add="addField(s.fields, f)"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-funder>        
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-filename-readonly'" :key="f.id">
                    <p-i-filename-readonly v-bind.sync="f"></p-i-filename-readonly>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-unknown-readonly'" :key="f.id">
                    <p-i-unknown-readonly v-bind.sync="f"></p-i-unknown-readonly>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-vocab-ext-readonly'" :key="f.id">
                    <p-i-vocab-ext-readonly 
                      v-bind.sync="f"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-vocab-ext-readonly>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'p-spatial-getty-readonly'" :key="f.id">
                    <p-i-spatial-getty-readonly 
                      v-bind.sync="f"
                      v-on:remove="removeField(s.fields, f)"
                    ></p-i-spatial-getty-readonly>
                  </v-flex>

                  <v-flex offset-xs1 v-else-if="f.component === 'input-file'" :key="f.id">
                    <input type="file" @input="setFilename(f, $event)">
                  </v-flex>

                </template>

                <v-flex v-if="addbutton" offset-xs1 class="pb-4">
                  <v-dialog v-model="s['adddialogue']" fullscreen>
                    <v-btn slot="activator" fab depressed small color="grey lighten-3">
                      <v-icon color="grey darken-1">add</v-icon>
                    </v-btn>
                    <v-card>
                      <v-card-title class="headline grey lighten-2" primary-title>{{ $t('Add metadata fields to section ') + s.id }}</v-card-title>
                      <v-card-text>
                        <v-autocomplete
                          v-model="addfieldselection"
                          :items="metadatafields"
                          :filter="addFieldAutocompleteFilter"
                          :label="$t('Select metadata fields')"
                          chips
                          multiple
                          small-chips
                          return-object
                          :menu-props="{'closeOnClick':true, 'closeOnContentClick':true, 'maxHeight':500}"
                        >
                          <template slot="selection" slot-scope="data">
                            <v-chip :selected="data.selected" close class="chip--select-multi" @input="removeFieldChip(data.item)">
                              {{ data.item.fieldname }}
                            </v-chip>
                          </template>
                          <template slot="item" slot-scope="data">
                            <template v-if="typeof data.item !== 'object'">
                              <v-list-tile-content v-text="data.item"></v-list-tile-content>
                            </template>
                            <template v-else>
                              <v-list-tile-content>
                                <v-list-tile-title v-html="data.item.fieldname"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="data.item.definition"></v-list-tile-sub-title>
                              </v-list-tile-content>
                            </template>
                          </template>
                        </v-autocomplete>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" dark @click="s['adddialogue'] = false">{{ $t('Cancel') }}</v-btn>
                        <v-btn color="primary" @click="addFields(s)">{{ $t('Add') }}</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-flex>
              </v-layout>
            </v-card-text>

          </v-card>

        </v-layout>

        <v-layout align-center justify-end row class="ma-3">
          <v-dialog v-if="templating" v-model="templatedialog" width="500">
            <v-btn class="mr-3" slot="activator" dark raised :loading="loading" :disabled="loading" color="grey">{{ $t('Save as template') }}</v-btn>
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>{{ $t('Save as template') }}</v-card-title>
              <v-card-text>
                <v-text-field v-model="templatename" :label="$t('Template name')" ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="loading" :disabled="loading" color="grey" dark @click="templatedialog= false">{{ $t('Cancel') }}</v-btn>
                <v-btn :loading="loading" :disabled="loading" color="primary" @click="saveAsTemplate()">{{ $t('Save') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn v-if="loadedPid" raised :loading="loading" :disabled="loading" color="primary" @click="save()">{{ $t('Save') }}</v-btn>
          <v-btn v-else raised :loading="loading" :disabled="loading" color="primary" @click="submit()">{{ $t('Submit') }}</v-btn>
        </v-layout>
  
      </v-tab-item>
      <v-tab-item class="ma-4">
        <vue-json-pretty :data="metadata" ref="prettyprint"></vue-json-pretty>
      </v-tab-item>
      <v-tab-item class="ma-4">
        <p-t-list ref="templates" v-on:load-template="loadTemplate($event)"></p-t-list>
      </v-tab-item>
    </v-tabs-items>

  </v-container>
 
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import arrays from '../../utils/arrays'
import jsonLd from '../../utils/json-ld'
import fields from '../../utils/fields'
import PITextField from './PITextField'
import PITextFieldSuggest from './PITextFieldSuggest'
import PITitle from './PITitle'
import PIEntity from './PIEntity'
import PIDateEdtf from './PIDateEdtf'
import PISelect from './PISelect'
import PISpatialGetty from './PISpatialGetty'
import PISpatialText from './PISpatialText'
import PIDimension from './PIDimension'
import PIProject from './PIProject'
import PIFunder from './PIFunder'
import PIFilenameReadonly from './PIFilenameReadonly'
import PISpatialGettyReadonly from './PISpatialGettyReadonly'
import PIVocabExtReadonly from './PIVocabExtReadonly'
import PIUnknownReadonly from './PIUnknownReadonly'
import PTList from '../templates/PTList'

export default {
  name: 'p-i-form',
  components: {
    PITextField,
    PITextFieldSuggest,
    PITitle,
    PIEntity,
    PIDateEdtf,
    PISelect,
    PISpatialGetty,
    PISpatialText,
    PIDimension,
    PIProject,
    PIFunder,
    PIFilenameReadonly,
    PIVocabExtReadonly,
    PISpatialGettyReadonly,
    PIUnknownReadonly,
    VueJsonPretty,
    PTList
  },
  data () {
    return {
      activetab: null,
      jsonlds: {},
      metadata: {},
      loadedMetadata: [],
      editform: {},
      loading: false,
      loadedPid: '',
      fab: false,
      addfieldselection: [],
      templatedialog: '',
      templatename: '',
      metadatafields: fields.getEditableFields() 
    }
  },
  props: {
    form: {
      type: Object,
      default: {
        sections: []
      }
    },
    contentmodel: {
      type: String,
      default: 'unknown'
    },
    pid: {
      type: String
    },
    addbutton: {
      type: Boolean,
      default: true
    },
    templating: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    loadTemplates: function () {
      this.$refs.templates.loadTemplates()
    },
    loadTemplate: function (form) {
      this.$emit('load-form', form)
      this.activetab = 0
    },
    saveAsTemplate: function () {
      var self = this
      var httpFormData = new FormData()
      this.loading = true
      httpFormData.append('name', this.templatename)
      httpFormData.append('form', JSON.stringify(this.form))
      var url = self.$store.state.settings.instance.api + '/jsonld/template/add'
      var promise = fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'X-XSRF-TOKEN': this.$store.state.user.token
        },
        body: httpFormData
      })
      .then(function (response) { return response.json() })
      .then(function (json) {
        if (json.alerts && json.alerts.length > 0) {
          self.$store.commit('setAlerts', json.alerts)
        }
        self.loading = false
        self.templatedialog = false
      })
      .catch(function (error) {
        //console.log(error)
      })
      return promise
    },
    loadMetadata: function (pid) {
      this.loadedPid = pid
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
          self.$emit('load-form', self.json2form(json.metadata['JSON-LD']))
        }
      })
      .catch(function (error) {
        //console.log(error)
      })
      return promise
    },
    json2form: function (jsonld) {
      return jsonLd.json2form(jsonld)
    },
    getObjectType: function(contentmodel) {
      switch (contentmodel) {
        case 'https://pid.phaidra.org/vocabulary/resourcetype/HMJ4-EW36':
          return 'picture'
        case 'https://pid.phaidra.org/vocabulary/resourcetype/MXND-R5ZY':
          return 'audio'
        case 'https://pid.phaidra.org/vocabulary/resourcetype/S7JC-WBBH':
          return 'video'
        case 'https://pid.phaidra.org/vocabulary/resourcetype/B4CB-FN5F':
          return 'document'
        default:
          return 'data'
      }
    },
    submit: function () {
      var self = this
      this.loading = true
      this.generateJson()
      var httpFormData = new FormData()
      httpFormData.append('metadata', JSON.stringify(this.metadata))
      if (this.contentmodel === 'container') {
        for (var i = 0; i < this.form.sections.length; i++) {
          var s = this.form.sections[i]
          if (s.type === 'member') {
            for (var j = 0; j < s.fields.length; j++) {
              if (s.fields[j].component === 'input-file') {
                if (s.fields[j].file !== '') {
                  httpFormData.append('member_' + s.id, s.fields[j].file)
                }
              }
            }
          }
        }
      } else {
         for (i = 0; i < this.form.sections.length; i++) {
          s = this.form.sections[i]
          for (j = 0; j < s.fields.length; j++) {
            if (s.fields[j].component === 'input-file') {
              if (s.fields[j].file !== '') {
                httpFormData.append('file', s.fields[j].file)
              }
            }
          }
        }
      }
      fetch(self.$store.state.settings.instance.api + '/' + this.getObjectType(this.contentmodel) + '/create', {
        method: 'POST',
        mode: 'cors',
        headers: {
          //'Authorization': 'Basic ' + base64.encode(self.$store.state.settings.instance.adminuser + ':' + self.$store.state.settings.instance.adminpass),
          'X-XSRF-TOKEN': this.$store.state.user.token
        },
        body: httpFormData
      })
      .then(response => response.json())
      .then(function (json) {
        if (json.alerts && json.alerts.length > 0) {
          self.$store.commit('setAlerts', json.alerts)
        }
        self.loading = false
        if (json.status === 200){
          if (json.pid) {
            self.$emit('object-created', json.pid)
          }
        }
        self.$vuetify.goTo(0)
      })
      .catch(function (error) {
        self.$store.commit('setAlerts', [{ type: 'danger', msg: error }])
        self.loading = false
        self.$vuetify.goTo(0)
      })
    },
    save: function () {
      var self = this
      this.loading = true
      this.generateJson()
      var httpFormData = new FormData()
      httpFormData.append('metadata', JSON.stringify(this.metadata))      
      fetch(self.$store.state.settings.instance.api + '/object/' + this.loadedPid + '/metadata', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'X-XSRF-TOKEN': this.$store.state.user.token
        },
        body: httpFormData
      })
      .then(response => response.json())
      .then(function (json) {
        if (json.alerts && json.alerts.length > 0) {
          if (json.status === 401) {
            json.alerts.push({ type: 'danger', msg: 'Please log in' })
          }
          self.$store.commit('setAlerts', json.alerts)
        }
        self.loading = false
        if (json.status === 200){
          self.$emit('object-saved', self.loadedPid)
        }
        self.$vuetify.goTo(0)
      })
      .catch(function (error) {
        self.$store.commit('setAlerts', [{ type: 'danger', msg: error }])
        self.loading = false
        self.$vuetify.goTo(0)
      })
    },
    generateJson: function () {
      if (this.contentmodel === 'container') {
        this.jsonlds = jsonLd.containerForm2json(this.form)
      } else {
        this.jsonlds = jsonLd.form2json(this.form)
      }
      this.metadata = { metadata: { 'json-ld': this.jsonlds } }
      this.$refs.prettyprint.$forceUpdate()
    },
    addField: function (arr, f) {
      var newField = arrays.duplicate(arr, f)
      if (newField) {
        newField.id = (new Date()).getTime()
        newField.value = ''
        newField.language = ''
      }
    },
    removeField: function (arr, f) {
      arrays.remove(arr, f)
    },
    setSelected: function (f, property, event) {
      if (event) {
        f[property] = event['@id']
      }
    },
    sortFieldUp: function (arr, f) {
      var i = arr.indexOf(f)
      if (arr[i - 1]) {
        if (arr[i - 1].ordergroup === f.ordergroup) {
          arrays.moveUp(arr, f)
        }
      }
    },
    sortFieldDown: function (arr, f) {
      var i = arr.indexOf(f)
      if (arr[i + 1]) {
        if (arr[i + 1].ordergroup === f.ordergroup) {
          arrays.moveDown(arr, f)
        }
      }
    },
    addSection: function (s) {
      var ns = arrays.duplicate(this.form.sections, s)
      ns.id = (new Date()).getTime()
      for (var i = 0; i < ns.fields.length; i++) {
        var id = (new Date()).getTime()
        if (i > 0) {
          id = ns.fields[i - 1].id + 1
        }
        ns.fields[i].id = id
        ns.fields[i].value = ''
        ns.fields[i].language = ''
      }
    },
    removeSection: function (s) {
      arrays.remove(this.form.sections, s)
    },
    updatePlace: function (f, event) {
      f['skos:prefLabel'] = event['skos:prefLabel']
      f['rdfs:label'] = event['rdfs:label']
      f.coordinates = event.coordinates
    },
    selectInput: function (f, event) {
      if (event) {
        f.value = event['@id']
        var labels = event['skos:prefLabel']
        f['skos:prefLabel'] = []
        Object.entries(labels).forEach(([key, value]) => {
          f['skos:prefLabel'].push({ '@value': value, '@language': key })
        })
      } else {
        f.value = ''
        f['skos:prefLabel'] = []
      }
    },
    roleInput: function (f, event) {
      f.role = event['@id']
      f['skos:prefLabel'] = event['skos:prefLabel']
    },
    setFilename: function (f, event) {
      f.value = event.target.files[0].name
      f.file = event.target.files[0]
    },
    addFieldAutocompleteFilter: function (item, queryText) {
      const lab = this.$t(item['fieldname']).toLowerCase()
      const query = queryText.toLowerCase()
      return lab.indexOf(query) > -1
    },
    removeFieldChip (item) {
      const index = this.addfieldselection.indexOf(item)
      if (index >= 0) this.addfieldselection.splice(index, 1)
    },
    addFields (section) {
      for (var i = 0; i < this.addfieldselection.length; i++) {
        section.fields.push(fields.getField(this.addfieldselection[i].id))
      }
      this.addfieldselection = []
      section['adddialogue'] = false
    }
  },
  mounted: function () {
    if (this.pid) {
      this.loadMetadata(this.pid)
    }
    this.$store.dispatch('loadLanguages')
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>
