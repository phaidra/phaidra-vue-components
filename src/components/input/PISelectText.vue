<template>
  <v-layout row>
    <v-flex xs3>
      <v-autocomplete
        :value="getTerm(vocabulary, selectvalue)"
        :required="required"
        v-on:input="updateLocation('select', $event)"
        :rules="required ? [ v => !!v || 'Required'] : []"
        :items="vocabularies[vocabulary].terms"
        :filter="autocompleteFilter"
        hide-no-data
        :label="$t(label)"
        box
        return-object
        clearable
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-tile-content two-line>
            <v-list-tile-title  v-html="`${getLocalizedTermLabel(vocabulary, item['@id'])}`"></v-list-tile-title>
            <v-list-tile-sub-title  v-html="`${item['@id']}`"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-tile-content>
            <v-list-tile-title v-html="`${getLocalizedTermLabel(vocabulary, item['@id'])}`"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </v-autocomplete>
    </v-flex>
    <v-flex xs4>
      <v-text-field
        :value="textvalue"
        v-on:input="updateLocation('text', $event)"
        :label="$t(label)"
        :required="required"
        :rules="required ? [ v => !!v || 'Required'] : []"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs3 v-if="multilingual">
      <v-autocomplete
        :value="getTerm('lang', language)"
        v-on:input="$emit('input-language', $event )"
        :items="vocabularies['lang'].terms"
        :filter="autocompleteFilter"
        hide-no-data
        :label="$t('Language')"
        box
        return-object
        clearable
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-tile-content two-line>
            <v-list-tile-title  v-html="`${getLocalizedTermLabel('lang', item['@id'])}`"></v-list-tile-title>
            <v-list-tile-sub-title  v-html="`${item['@id']}`"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-tile-content>
            <v-list-tile-title v-html="`${getLocalizedTermLabel('lang', item['@id'])}`"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </v-autocomplete>
    </v-flex>
    <v-flex xs1 v-if="actions.length">
      <v-menu open-on-hover bottom offset-y>
        <v-btn slot="activator" icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
            <v-list-tile-title>{{ action.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-select-text',
  mixins: [vocabulary, fieldproperties],
  props: {
    textvalue: {
      type: String
    },
    language: {
      type: String
    },
    selectvalue: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    selectlabel: {
      type: String,
      required: true
    },
    selectdisabled: {
      type: Boolean,
      default: false
    },
    vocabulary: {
      type: String,
      required: true
    },
    required: {
      type: Boolean
    },
    multilingual: {
      type: Boolean
    }
  },
  data () {
    return {
      location: '',
      svalue: '',
      tvalue: ''
    }
  },
  methods: {
    autocompleteFilter: function (item, queryText) {
      const lab = item['skos:prefLabel'][this.$i18n.locale] ? item['skos:prefLabel'][this.$i18n.locale].toLowerCase() : item['skos:prefLabel']['eng'].toLowerCase()
      const query = queryText.toLowerCase()
      return lab.indexOf(query) > -1
    },
    updateLocation: function (source, value) {
      this.location = ''
      if (source === 'select') {
        if (value) {
          this.svalue = value['@id']
          this.$emit('input-select', this.svalue)
        } else {
          this.svalue = ''
        }
      }
      if (source === 'text') {
        if (value) {
          this.tvalue = value
          this.$emit('input-text', this.tvalue)
        }
      }
      if (this.svalue) {
        this.location = this.svalue
      }
      if (this.tvalue) {
        if (this.location !== '') {
          this.location = this.location + '; '
        }
        this.location = this.location + this.tvalue
      }
      this.$emit('input', this.location)
    }
  },
  mounted: function () {
    if (this.selectvalue) {
      this.location = this.selectvalue
    }
    if (this.value) {
      this.location = this.location + '; ' + this.value
    }
    this.$emit('input', this.location)
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>
