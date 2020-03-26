<template>
  <v-container>
    <v-row v-for="(ch, i) in children" :key="ch.xmlname+i">
      <template v-if="skip(ch)"></template>
      <template v-else-if="ch.input_type === 'static'">
        <v-col cols="12" md="2" class="pdlabel primary--text text-md-right">{{ $t(nodePath(ch)) }}</v-col>
        <v-col cols="12" md="10">{{ ch.ui_value }}</v-col>
      </template>
      <template v-else-if="ch.input_type === 'input_text'">
        <template v-if="ch.datatype === 'ClassificationSource'" cols="12">
          <v-col cols="12" md="2" class="pdlabel primary--text text-md-right">{{ $t(nodePath(ch)) }}</v-col>
          <v-col cols="12" md="10">{{ ch.ui_value }}</v-col>
        </template>
        <template v-else-if="ch.datatype === 'Taxon'">
          <v-col cols="12" md="2" class="pdlabel primary--text text-md-right">{{ $t(nodePath(ch)) }}</v-col>
          <v-col cols="12" md="10">{{ ch.ui_value }}</v-col>
        </template>
        <template v-else>
          <v-col cols="12" md="2" class="pdlabel primary--text text-md-right">{{ $t(nodePath(ch)) }}<template v-if="getLangAttr(ch)"> ({{getLangAttr(ch)}})</template></v-col>
          <v-col cols="12" md="10">{{ ch.ui_value }}</v-col>
        </template>
      </template>
      <template v-else-if="ch.input_type === 'select'">
        <template v-if="ch.xmlname === 'language'">
          <v-col cols="12" md="2" class="pdlabel primary--text text-md-right">{{ $t(nodePath(ch)) }}</v-col>
          <v-col cols="12" md="10">{{ getLangLabel(ch.ui_value) }}</v-col>
        </template>
        <template v-else>
        <v-col cols="12" md="2" class="pdlabel primary--text text-md-right">{{ $t(nodePath(ch)) }}</v-col>
        <v-col cols="12" md="10" v-if="ch.labels">{{ ch.labels[alpha2locale] }}</v-col>
        </template>
      </template>
      <template v-else-if="ch.input_type === 'node'">
        <template v-if="ch.xmlname === 'identifiers'">
          <v-col cols="12" md="2" class="pdlabel primary--text text-md-right">{{ getChildLabel(ch, 'resource') }}</v-col>
          <v-col cols="12" md="10">{{ getChildValue(ch, 'identifier') }}</v-col>
        </template>
        <template v-else-if="ch.xmlname === 'contribute'">
          <v-col cols="12" md="2" class="pdlabel primary--text text-md-right">{{ getChildLabel(ch, 'role') }}</v-col>
          <v-col cols="12" md="10">
            <v-row no-gutters v-for="(entity, i) in getEntities(ch)" :key="'en'+i">
              <v-col cols="12">{{ getChildValue(entity, 'firstname') }} {{ getChildValue(entity, 'lastname') }} {{ getChildValue(entity, 'institution') }}</v-col>
            </v-row>
          </v-col>
        </template>
        <v-card v-else flat class="ma-3" :width="'100%'">
          <v-card-title class="font-weight-light">
            <span>{{ $t(nodePath(ch)) }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <template v-if="ch.children">
              <p-d-uwm-rec :children="ch.children" :path="nodePath(ch)"></p-d-uwm-rec>
            </template>
          </v-card-text>
        </v-card>
      </template>
      <v-alert v-else dense type="error" :value="true">Unknown field type {{ch.xmlname}} {{ch.input_type}}</v-alert>
      <template v-if="ch.xmlname === 'curriculum'">
        <span>{{ studyName(ch) }}</span>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import uwmlangs from '../../utils/uwmlangs'
import Vue from 'vue'
import qs from 'qs'
import PIDuration from '../input/PIDuration'
import arrays from '../../utils/arrays'
import lang3to2map from '../../utils/lang3to2map'
import { validationrules } from '../../mixins/validationrules'

export default {
  name: 'p-d-uwm-rec',
  mixins: [ validationrules ],
  components: {
    PIDuration
  },
  props: {
    children: {
      type: Array
    },
    path: {
      type: String,
      default: 'uwm'
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
      loading: false,
      orgLoading: false,
      splLoading: false,
      clsLoading: false
    }
  },
  methods: {
    getLangLabel: function (code) {
      if (uwmlangs[code]) {
        if (uwmlangs[code][this.alpha2locale]) {
          return uwmlangs[code][this.alpha2locale]
        }
      }
      return code
    },
    getEntities: function (node) {
      let entities = []
      for (let ch of node.children) {
        if (ch.xmlname === 'entity') {
          if (ch.attributes) {
            for (let a of ch.attributes) {
              if (a.xmlname === 'data_order') {
                ch.data_order = a.ui_value 
              }
            }
          }
          entities.push(ch)
        }
      }
      entities.sort(function (a, b) {
        return a.data_order - b.data_order
      })
      return entities
    },
    getChildLabel: function (id, xmlname) {
      if (id.children) {
        for (let ch of id.children) {
          if (ch.xmlname === xmlname) {
            if (ch.labels) {
              return ch.labels[this.alpha2locale]
            }
          }
        }
      }
    },
    getChildValue: function (id, xmlname) {
      if (id.children) {
        for (let ch of id.children) {
          if (ch.xmlname === xmlname) {
            return ch.ui_value
          }
        }
      }
    },
    getLangAttr: function (ch) {
      if (ch.attributes) {
        if (ch.attributes.length > 0) {
          for (let a of ch.attributes) {
            if (a.xmlname === 'lang') {
              return a.ui_value
            }
          }
        }
      }
    },
    nodePath: function (ch) {
      return this.path ? this.path + '_' + ch.xmlname : ch.xmlname
    },
    skip: function (node) {
      if (node.hidden) {
        return true
      } else {
        switch (node.xmlns) {
          case 'http://phaidra.univie.ac.at/XML/metadata/lom/V1.0':
            switch (node.xmlname) {
              case 'identifier':
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
          case 'http://phaidra.univie.ac.at/XML/metadata/extended/V1.0':
            switch (node.xmlname) {
              case 'metadataqualitycheck':
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
