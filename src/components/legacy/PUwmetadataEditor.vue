<template>
  <v-container v-if="form">
    <v-card>
      <v-card-title class="font-weight-light grey white--text">{{ $t('Metadata') }}<template v-if="targetpid">&nbsp;-&nbsp;<span class="text-lowercase">{{ targetpid }}</span></template></v-card-title>
      <v-card-text>
        <v-tabs v-model="activetab" align-with-title>
          <template v-for="(s, i) in this.form"> 
            <v-tab v-if="(s.xmlname !== 'annotation') && (s.xmlname !== 'etheses')" :key="'tab'+i">
              <span v-t="s.xmlname"></span>
            </v-tab>
          </template>
        </v-tabs>
        <v-tabs-items v-model="activetab">
          <template v-for="(s, i) in this.form"> 
            <v-tab-item class="pa-3" v-if="(s.xmlname !== 'annotation') && (s.xmlname !== 'etheses')" :key="'tabitem'+i">
              <template v-if="s.children">
                <p-uwm-field-renderer :children="s.children"></p-uwm-field-renderer>
              </template>
            </v-tab-item>
          </template>
        </v-tabs-items>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="save()" dark color="primary">{{ $t('Save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import arrays from '../../utils/arrays'
import PUwmFieldRenderer from './PUwmFieldRenderer'

export default {
  name: 'p-uwmetadata-editor',
  components: {
    PUwmFieldRenderer
  },
  props: {
    form: {
      type: Array
    },
    targetpid: {
      type: String
    }
  },
  data () {
    return {
      activetab: null,
      loadedMetadata: [],
      loading: false,
      fab: false,
      addfieldselection: [],
      templatedialog: '',
      templatename: '',
      previewMember: '',
      searchfieldsinput: '',
      metadatapreview: {}
    }
  },
  methods: {
    getMetadata: function () {
      let json
      let md = { metadata: { 'uwmetadata': this.form } }
      return md
    },
    save: async function () {
      this.loading = true
      var httpFormData = new FormData()
      httpFormData.append('metadata', JSON.stringify(this.getMetadata()))
      try {
        let response = await this.$http.request({
          method: 'POST',
          url: this.$store.state.instanceconfig.api + '/object/' + this.targetpid + '/metadata',
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-XSRF-TOKEN': this.$store.state.user.token
          },
          data: httpFormData
        })
        if (response.data.alerts && response.data.alerts.length > 0) {
          if (response.data.status === 401) {
            response.data.alerts.push({ type: 'danger', msg: 'Please log in' })
          }
          this.$store.commit('setAlerts', response.data.alerts)
        }
        if (response.data.status === 200) {
          if (response.data.pid) {
            this.$emit('object-saved', this.targetpid)
          }
        }
      } catch (error) {
        console.log(error)
        this.$store.commit('setAlerts', [{ type: 'danger', msg: error }])
      } finally {
        this.$vuetify.goTo(0)
        this.loading = false
      }
    },
    addField: function (arr, f) {
      var newField = arrays.duplicate(arr, f)
      if (newField) {
        newField.id = (new Date()).getTime()
        newField.firstname = ''
        newField.lastname = ''
        newField.identifierText = ''
        newField.removable = true
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
    organizationSelectInput: function (f, event) {
      f.organization = ''
      f.organizationSelectedName = []
      if (event) {
        f.organization = event['@id']
        var preflabels = event['skos:prefLabel']
        Object.entries(preflabels).forEach(([key, value]) => {
          f.organizationSelectedName.push({ '@value': value, '@language': key })
        })
      }
    },
  },
  mounted: function () {
    this.$store.dispatch('loadLanguages', this.$i18n.locale)
  }
}
</script>

