<template>
  <v-container>
    <v-row v-for="(ch, i) in children" :key="ch.xmlname+i">
      <template v-if="skip(ch)"></template>
      <template v-else-if="ch.input_type === 'static'">
        <v-col>
          <v-text-field
            v-model="ch.ui_value"
            :label="ch.labels[alpha2locale]"
            :readonly="true"
            outlined
          ></v-text-field>
        </v-col>
      </template>
      <template v-else-if="ch.input_type === 'input_text'">
        <v-col cols="12">
          <v-text-field
            v-model="ch.ui_value"
            :label="ch.labels[alpha2locale]"
            outlined
            :readonly="readOnly(ch)"
          ></v-text-field>
        </v-col>
      </template>
      <template v-else-if="ch.input_type === 'input_text_lang'">
        <v-col cols="12" md="10">
          <v-text-field
            v-model="ch.ui_value"
            :label="ch.labels[alpha2locale]"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            v-model="ch.value_lang"
            :items="languages"
            :label="$t('Language')"
            outlined
          >
          </v-select>
        </v-col>
      </template>
      <template v-else-if="ch.input_type === 'input_textarea_lang'">
        <v-col cols="12" md="10">
          <v-textarea
            v-model="ch.ui_value"
            :label="ch.labels[alpha2locale]"
            outlined
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            v-model="ch.value_lang"
            :items="languages"
            :label="$t('Language')"
            outlined
          >
          </v-select>
        </v-col>
      </template>
      <template v-else-if="ch.input_type === 'select'">
        <v-col cols="12">
          <v-select
            v-model="ch.ui_value"
            :items="ch.vocabularies[0].terms"
            :item-value="'uri'"
            :label="ch.labels[alpha2locale]"
            @change="selectHandler(ch, $event)"
            outlined
          >
            <template v-slot:item="{ item, index }">
              <span>{{ item.labels[alpha2locale] }}</span>
            </template>
            <template v-slot:selection="{ item, index }">
              <span>{{ item.labels[alpha2locale] }}</span>
            </template>
          </v-select>
        </v-col>
      </template>
      <template v-else-if="ch.input_type === 'language_select'">
        <v-col cols="12">
          <v-select
            v-model="ch.ui_value"
            :items="languages"
            :label="ch.labels[alpha2locale]"
            outlined
          >
          </v-select>
        </v-col>
      </template>
      <template v-else-if="ch.input_type === 'input_datetime'">
        <v-col cols="12">
          <v-text-field
            v-model="ch.ui_value"
            :label="ch.labels[alpha2locale]"
            :hint="'Format YYYY-MM-DD'"
            :rules="[validationrules.date]"
            outlined
          ></v-text-field>
        </v-col>
      </template>
      <template v-else-if="ch.input_type === 'input_duration'">
        <v-col cols="12">
          <p-i-duration
            :value="ch.ui_value"
            v-on:input="ch.ui_value=$event"
            :label="ch.labels[alpha2locale]"
            :input-style="'outlined'"
          ></p-i-duration>
        </v-col>
      </template>
      <template v-else-if="ch.input_type === 'select_yesno'">
        <v-col cols="12">
          <v-checkbox
            v-model="ch.ui_value"
            :false-value="'no'"
            :true-value="'yes'"
            :label="ch.labels[alpha2locale]"
          ></v-checkbox>
        </v-col>
      </template>
      <template v-else-if="ch.input_type === 'node'">
        <v-card class="ma-3" :width="'100%'">
          <v-card-title class="font-weight-light grey white--text">{{ ch.labels[alpha2locale] }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <template v-if="ch.children">
              <p-uwm-field-renderer :children="ch.children" :parent="ch"></p-uwm-field-renderer>
            </template>
          </v-card-text>
          <v-divider v-if="ch.xmlname === 'curriculum'"></v-divider>
          <v-card-actions v-if="ch.xmlname === 'curriculum'">
            <span>{{ studyName(ch) }}</span>
          </v-card-actions>
        </v-card>
      </template>
      <v-alert v-else dense type="error" :value="true">Unknown field type {{ch.xmlname}} {{ch.input_type}}</v-alert>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import qs from 'qs'
import PIDuration from '../input/PIDuration'
import arrays from '../../utils/arrays'
import lang3to2map from '../../utils/lang3to2map'
import { validationrules } from '../../mixins/validationrules'

export default {
  name: 'p-uwm-field-renderer',
  mixins: [ validationrules ],
  components: {
    PIDuration
  },
  props: {
    parent: {
      type: Object
    },
    children: {
      type: Array
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
    },
    languages: function () {
      let arr = []
      for (let term of this.$store.state.vocabulary.vocabularies['lang'].terms) {
        if (lang3to2map[term['@id']]) {
          arr.push({
            text: term['skos:prefLabel'][this.$i18n.locale],
            value: lang3to2map[term['@id']]
          })
        }
      }
      return arr
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    studyName: function (node) {
      if (node.study_name[this.alpha2locale]) {
        return node.study_name[this.alpha2locale]
      } else {
        Object.entries(node.study_name).forEach(([key, value]) => {
          return value
        })
      }
    },
    getStudyNameHashId: function (node) {
      let hashId = ''
      for (let ch of node.children) {
        if (ch.xmlname === 'spl') {
          let spl = ch.ui_value.replace('http://phaidra.univie.ac.at/XML/metadata/lom/V1.0/organization/voc_spl/', '')
          hashId = hashId === '' ? spl : hashId + '_' + spl
        }
        if (ch.xmlname === 'kennzahl') {
          let kennzahl = ch.ui_value.replace('http://phaidra.univie.ac.at/XML/metadata/lom/V1.0/organization/voc_kennzahl/', '')
          hashId = hashId === '' ? kennzahl : hashId + '_' + kennzahl
        }
      }
      return hashId
    },
    getStudyName: async function (node) {
      let spl = '' 
      let ids = []
      let hashId = ''
      for (let ch of node.children) {
        if (ch.xmlname === 'spl') {
          spl = ch.ui_value.replace('http://phaidra.univie.ac.at/XML/metadata/lom/V1.0/organization/voc_spl/', '')
          hashId = hashId === '' ? spl : hashId + '_' + spl
        }
        if (ch.xmlname === 'kennzahl') {
          let kennzahl = ch.ui_value.replace('http://phaidra.univie.ac.at/XML/metadata/lom/V1.0/organization/voc_kennzahl/', '')
          ids.push(kennzahl)
          hashId = hashId === '' ? kennzahl : hashId + '_' + kennzahl
        }
      }
      let response = await this.$http.request({
        method: 'GET',
        url: this.$store.state.instanceconfig.api + '/directory/get_study_name',
        params: {
          spl: spl,
          ids: ids
        },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      })
      node.study_name = response.data.study_name
    },
    selectHandler: async function (node, event) {
      if (node.xmlname === 'faculty') {
        let response = await this.$http.request({
          method: 'GET',
          url: this.$store.state.instanceconfig.api + '/directory/get_org_units',
          params: {
            parent_id: node.ui_value.replace('http://phaidra.univie.ac.at/XML/metadata/lom/V1.0/organization/voc_faculty/', ''),
            values_namespace: 'http://phaidra.univie.ac.at/XML/metadata/lom/V1.0/organization/voc_department/'
          }
        })
        for (let ch of this.children) {
          if (ch.xmlname === 'department') {
            ch.ui_value = ''
            ch.vocabularies[0].terms = response.data.terms
          }
        }
      }
      if (node.xmlname === 'spl') {
        let spl = node.ui_value.replace('http://phaidra.univie.ac.at/XML/metadata/lom/V1.0/organization/voc_spl/', '')
        let response = await this.$http.request({
          method: 'GET',
          url: this.$store.state.instanceconfig.api + '/directory/get_study',
          params: {
            spl: spl,
            values_namespace: 'http://phaidra.univie.ac.at/XML/metadata/lom/V1.0/organization/voc_kennzahl/'
          }
        })
        for (let ch of this.children) {
          // set up first kennzahl
          if (ch.xmlname === 'kennzahl') {
            ch.ui_value = ''
            ch.vocabularies[0].terms = response.data.terms
            break
          }
        }
        // remove all other kennzahls
        this.children.length = 2
        this.getStudyName(this.parent)
      }
      if (node.xmlname === 'kennzahl') {
        let trimLength = 0
        let spl = ''
        let ids = []
        let i = 0
        let nodeClone = {}
        for (let ch of this.children) {
          i++
          if (ch.xmlname === 'spl') {
            spl = ch.ui_value.replace('http://phaidra.univie.ac.at/XML/metadata/lom/V1.0/organization/voc_spl/', '')
          } else {
            ids.push(ch.ui_value.replace('http://phaidra.univie.ac.at/XML/metadata/lom/V1.0/organization/voc_kennzahl/', ''))
            if (ch.ui_value === event) {
              trimLength = i
              nodeClone = JSON.parse(JSON.stringify(ch))
              break
            }
          }
        }
        this.children.length = trimLength
        let response = await this.$http.request({
          method: 'GET',
          url: this.$store.state.instanceconfig.api + '/directory/get_study',
          params: {
            spl: spl,
            ids: ids,
            values_namespace: 'http://phaidra.univie.ac.at/XML/metadata/lom/V1.0/organization/voc_kennzahl/'
          },
          paramsSerializer: params => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
          }
        })
        if (response.data.terms.length > 0) {
          nodeClone.ui_value = ''
          nodeClone.data_order = parseInt(nodeClone.data_order) + 1
          nodeClone.vocabularies[0].terms = response.data.terms
          this.children.push(nodeClone)
        }
        this.getStudyName(this.parent)
      }
    },
    skip: function (node) {
      if (node.hidden) {
        return true
      } else {
        switch (node.xmlns) {
          case 'http://phaidra.univie.ac.at/XML/metadata/lom/V1.0':
            switch (node.xmlname) {
              case 'version':
              case 'status':
              case 'requirement':
              case 'cost':
              case 'copyright':
              case 'purpose':
                return true
              default:
                return false 
            }
          case 'http://phaidra.univie.ac.at/XML/metadata/lom/V1.0/entity':
            switch (node.xmlname) {
              case 'type':
                return true
              default:
                return false 
            }
          case 'http://phaidra.univie.ac.at/XML/metadata/provenience/V1.0/entity':
            switch (node.xmlname) {
              case 'type':
                return true
              default:
                return false 
            }
          case 'http://phaidra.univie.ac.at/XML/metadata/lom/V1.0/classification':
            switch (node.xmlname) {
              case 'description':
              case 'keyword':
                return true
              default:
                return false 
            }
          default:
            return false
        }
      }
    },
    readOnly: function (node) {
      if (node.disabled) {
        return true
      } else {
        switch (node.xmlns) {
          case 'http://phaidra.univie.ac.at/XML/metadata/lom/V1.0':
            switch (node.xmlname) {
              case 'location':
              case 'size':
                return true
              default:
                return false 
            }
          default:
            return false
        }
      }
    }
  }
}
</script>
