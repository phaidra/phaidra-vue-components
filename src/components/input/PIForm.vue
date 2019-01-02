<template>
  <v-container grid-list-lg>
    <v-tabs v-model="activetab" align-with-title>
      <v-tab ripple v-if="form.sections.length > 0" ><template v-if="mode==='edit'">{{ loadedPid + ' - ' + $t('edit') }}</template><template v-else >{{ $t('Submit') }}</template> {{ ' ' + $t('metadata') }}</v-tab>
      <v-tab ripple @click="generateJson()">Metadata preview</v-tab>
    </v-tabs>
  
    <v-tabs-items v-model="activetab">
      <v-tab-item class="pa-3" v-if="form.sections.length > 0">

        <v-layout v-for="(s) in this.form.sections" :key="s.id" column wrap class="ma-3">
          
          <v-card >
            <v-card-title class="headline grey white--text">
              <span>{{ $t(s.title) }}</span>
              <v-spacer></v-spacer>
              <v-menu v-if="s.multiplicable" open-on-hover bottom offset-y>
                <v-btn slot="activator" icon dark>
                  <icon name="material-navigation-more-vert" color="white" width="24px" height="24px"></icon>
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
              <v-layout v-for="(f) in s.fields" :key="f.id" row wrap>

                <v-flex offset-xs1 v-if="f.component == 'p-text-field'" >
                  <p-i-text-field             
                    v-bind.sync="f"
                    v-on:input="f.value=$event"
                    v-on:input-language="f.language=$event['@id']"
                    v-on:add="addField(s.fields, f)"
                    v-on:remove="removeField(s.fields, f)"
                  ></p-i-text-field>
                </v-flex>

                <v-flex offset-xs1 v-else-if="f.component == 'p-text-field-suggest'" >
                  <p-i-text-field-suggest
                    v-bind.sync="f"
                    v-on:input="f.value=$event"
                    v-on:input-language="f.language=$event['@id']"
                    v-on:add="addField(s.fields, f)"
                    v-on:remove="removeField(s.fields, f)"
                  ></p-i-text-field-suggest>
                </v-flex>

                <v-flex offset-xs1 v-if="f.component == 'p-title'" >
                  <p-i-title            
                    v-bind.sync="f"
                    v-on:input-title="f.title=$event"
                    v-on:input-subtitle="f.subtitle=$event"
                    v-on:input-language="f.language=$event['@id']"
                    v-on:add="addField(s.fields, f)"
                    v-on:remove="removeField(s.fields, f)"
                    v-on:up="sortFieldUp(s.fields, f)"
                    v-on:down="sortFieldDown(s.fields, f)"
                  ></p-i-title>
                </v-flex>

                <v-flex offset-xs1 xs4 v-else-if="f.component == 'p-select'" >
                  <p-i-select 
                    v-bind.sync="f" 
                    v-on:input="selectInput(f, $event)"
                    v-on:add="addField(s.fields, f)"
                    v-on:remove="removeField(s.fields, f)"
                  ></p-i-select>        
                </v-flex>

                <v-flex offset-xs1 v-else-if="f.component == 'p-entity'" >
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

                <v-flex offset-xs1 v-else-if="f.component == 'p-gbv-suggest-getty'" >
                  <p-i-gbv-suggest-getty
                    v-bind.sync="f" 
                    v-on:input="f.value=$event"
                    v-on:resolve="updatePlace(f, $event)"
                    v-on:add="addField(s.fields, f)"
                    v-on:remove="removeField(s.fields, f)"
                  ></p-i-gbv-suggest-getty>        
                </v-flex>

                <v-flex offset-xs1 v-else-if="f.component == 'p-dimension'" >
                  <p-i-dimension
                    v-bind.sync="f" 
                    v-on:input-value="f.value=$event"
                    v-on:input-unit="f.unitCode=$event['@id']"
                    v-on:add="addField(s.fields, f)"
                    v-on:remove="removeField(s.fields, f)"
                  ></p-i-dimension>        
                </v-flex>

                <v-flex offset-xs1 v-else-if="f.component == 'p-project'" >
                  <p-i-project
                    v-bind.sync="f" 
                    v-on:input-name="f.name=$event"
                    v-on:input-name-language="f.nameLanguage=$event['@id']"
                    v-on:input-description="f.description=$event"
                    v-on:input-description-language="f.descriptionLanguage=$event['@id']"
                    v-on:input-identifier="f.identifier=$event"
                    v-on:input-homepage="f.homepage=$event"
                    v-on:add="addField(s.fields, f)"
                    v-on:remove="removeField(s.fields, f)"
                  ></p-i-project>        
                </v-flex>

                <v-flex offset-xs1 v-else-if="f.component == 'p-funder'" >
                  <p-i-funder
                    v-bind.sync="f" 
                    v-on:input-name="f.name=$event"
                    v-on:input-name-language="f.nameLanguage=$event['@id']"
                    v-on:input-identifier="f.identifier=$event"
                    v-on:add="addField(s.fields, f)"
                    v-on:remove="removeField(s.fields, f)"
                  ></p-i-funder>        
                </v-flex>

                <v-flex offset-xs1 v-else-if="f.component == 'input-file'" >
                  <input type="file" @input="setFilename(f, $event)">
                </v-flex>

              </v-layout>
            </v-card-text>
          </v-card>

        </v-layout>

        <v-layout row wrap class="ma-3">
          <v-spacer></v-spacer>
          <v-btn v-if="mode==='edit'" raised :loading="loading" :disabled="loading" color="primary lighten-2" @click="save()">Save</v-btn>
          <v-btn v-else raised :loading="loading" :disabled="loading" color="primary lighten-2" @click="submit()">Submit</v-btn>
        </v-layout>
  
      </v-tab-item>
      <v-tab-item class="ma-4">
        <vue-json-pretty :data="metadata" ref="prettyprint"></vue-json-pretty>
      </v-tab-item>
    </v-tabs-items>

  </v-container>
 
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import arrays from '@/utils/arrays'
import jsonLd from '@/utils/json-ld'
import PITextField from '@/components/input/PITextField'
import PITextFieldSuggest from '@/components/input/PITextFieldSuggest'
import PITitle from '@/components/input/PITitle'
import PIEntity from '@/components/input/PIEntity'
import PISelect from '@/components/input/PISelect'
import PIGbvSuggestGetty from '@/components/input/PIGbvSuggestGetty'
import PIDimension from '@/components/input/PIDimension'
import PIProject from '@/components/input/PIProject'
import PIFunder from '@/components/input/PIFunder'

export default {
  name: 'p-i-form',
  components: {
    PITextField,
    PITextFieldSuggest,
    PITitle,
    PIEntity,
    PISelect,
    PIGbvSuggestGetty,
    PIDimension,
    PIProject,
    PIFunder,
    VueJsonPretty
  },
  data () {
    return {
      activetab: null,
      jsonlds: {},
      metadata: {},
      loadedMetadata: [],
      form: this.submitform,
      loading: false,
      loadedPid: ''
    }
  },
  props: {
    mode: {
      type: String,
      required: true
    },
    submitform: {
      type: Object
    },
    contentmodel: {
      type: String,
      default: 'unknown'
    },
    pid: {
      type: String
    }
  },
  methods: {
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
          self.form = self.json2form(json.metadata['JSON-LD'])
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
      fetch(self.$store.state.settings.instance.api + '/' + this.contentmodel + '/create', {
        method: 'POST',
        mode: 'cors',
        headers: {
          //'Authorization': 'Basic ' + base64.encode(self.$store.state.settings.instance.adminuser + ':' + self.$store.state.settings.instance.adminpass),
          'X-XSRF-TOKEN': this.$store.state.user.token
        },
        body: httpFormData
      })
      .then(response => response.json())
      .then(function (response, json) {
        if (json.alerts && json.alerts.length > 0) {
          self.$store.commit('setAlerts', json.alerts)
        }
        self.loading = false
        if (response.status === 200){
          if (json.pid) {
            self.$emit('object-created', json.pid)
          }
        }
        self.$vuetify.goTo(0)
      })
      .catch(function (error) {
        self.$store.commit('setAlerts', [{ type: 'danger', msg: error }])
        //console.error('Error:', error)
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
      fetch(self.$store.state.settings.instance.api + '/' + this.loadedPid + '/metadata', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'X-XSRF-TOKEN': this.$store.state.user.token
        },
        body: httpFormData
      })
      .then(response => response.json())
      .then(function (response, json) {
        if (json.alerts && json.alerts.length > 0) {
          self.$store.commit('setAlerts', json.alerts)
        }
        self.loading = false
        if (response.status === 200){
          self.$emit('object-saved', self.loadedPid)
        }
        self.$vuetify.goTo(0)
      })
      .catch(function (error) {
        self.$store.commit('setAlerts', [{ type: 'danger', msg: error }])
        //console.error('Error:', error)
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
      f.value = event['@id']
      f['skos:prefLabel'] = event['skos:prefLabel']
    },
    roleInput: function (f, event) {
      f.role = event['@id']
      f['skos:prefLabel'] = event['skos:prefLabel']
    },
    setFilename: function (f, event) {
      f.value = event.target.files[0].name
      f.file = event.target.files[0]
    }
  },
  mounted: function () {
    if (this.mode === 'edit' && this.pid) {
      this.loadMetadata(this.pid)
    }
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>
