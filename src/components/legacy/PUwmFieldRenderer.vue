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
              <p-uwm-field-renderer :children="ch.children"></p-uwm-field-renderer>
            </template>
          </v-card-text>
        </v-card>
      </template>
      <v-alert v-else dense type="error" :value="true">Unknown field type {{ch.xmlname}} {{ch.input_type}}</v-alert>
    </v-row>
  </v-container>
</template>

<script>
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
