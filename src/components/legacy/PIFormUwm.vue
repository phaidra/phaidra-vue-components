<template>
  <v-container v-if="form">
    <v-card :outlined="!title">
      <v-card-title v-if="title" class="font-weight-light grey white--text">{{ $t(title) }}<template v-if="targetpid">&nbsp;-&nbsp;<span class="text-lowercase">{{ targetpid }}</span></template></v-card-title>
      <v-card-text>
        <v-tabs v-model="activetab" align-with-title>
          <template v-for="(s, i) in this.form">
            <v-tab v-if="(s.xmlname !== 'annotation') && (s.xmlname !== 'etheses')" :key="'tab'+i">
              <span v-t="s.labels[alpha2locale]"></span>
            </v-tab>
          </template>
        </v-tabs>
        <v-tabs-items v-model="activetab">
          <template v-for="(s, i) in this.form">
            <v-tab-item class="pa-3" v-if="(s.xmlname !== 'annotation') && (s.xmlname !== 'etheses')" :key="'tabitem'+i">
              <template v-if="s.children">
                <p-i-uwm-rec :children="s.children" :parent="s" @add-field="addField($event)" @remove-field="removeField($event)"></p-i-uwm-rec>
              </template>
            </v-tab-item>
          </template>
        </v-tabs-items>
      </v-card-text>
      <v-divider v-if="targetpid"></v-divider>
      <v-card-actions v-if="targetpid">
        <v-spacer></v-spacer>
        <v-btn @click="save()" :loading="loading" :disabled="loading" color="primary">{{ $t('Save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import arrays from '../../utils/arrays'
import PIUwmRec from './PIUwmRec'

export default {
  name: 'p-i-form-uwm',
  components: {
    PIUwmRec
  },
  props: {
    form: {
      type: Array
    },
    targetpid: {
      type: String
    },
    title: {
      type: String
    }
  },
  watch: {
    form: function () {
      this.assignIdsAndParentsRec(this.form, 'root', { id: 'root', children: this.form })
    }
  },
  computed: {
    alpha2locale: function () {
      switch (this.$i18n.locale) {
        case 'eng': return 'en'
        case 'deu': return 'de'
        case 'ita': return 'it'
        default: return 'en'
      }
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
      metadatapreview: {},
      parents: {}
    }
  },
  methods: {
    assignIdsAndParentsRec: function (arr, path, parent) {
      let i = 0
      for (let e of arr) {
        i++
        e.id = path + e.xmlname + i
        this.parents[e.id] = parent
        if (e.children) {
          this.assignIdsAndParentsRec(e.children, e.id, e)
        }
      }
    },
    addField: function (node) {
      let f = arrays.duplicate(this.parents[node.id].children, node)
      f.removable = true
      this.assignIdsAndParentsRec(this.form, 'root', { id: 'root', children: this.form })
      this.$emit('load-form', this.form)
    },
    removeField: function (node) {
      arrays.remove(this.parents[node.id].children, node)
      this.$emit('load-form', this.form)
    },
    getMetadata: function () {
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
    }
  },
  mounted: function () {
    this.$store.dispatch('loadLanguages', this.$i18n.locale)
  }
}
</script>
