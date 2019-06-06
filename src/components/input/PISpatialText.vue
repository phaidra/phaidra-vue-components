<template>
  <v-layout row>
    <v-flex xs5>
      <v-autocomplete
        v-on:input="$emit('input-place-type', $event)" 
        :label="$t('Type of place')" 
        :items="vocabularies['placepredicate'].terms" 
        :value="getTerm('placepredicate', type)"
        :filter="autocompleteFilter"
        :disabled="disabletype"
        box
        return-object
        clearable
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-tile-content two-line>
            <v-list-tile-title  v-html="`${getLocalizedTermLabel('placepredicate', item['@id'])}`"></v-list-tile-title>
            <v-list-tile-sub-title  v-html="`${item['@id']}`"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-tile-content>
            <v-list-tile-title v-html="`${getLocalizedTermLabel('placepredicate', item['@id'])}`"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </v-autocomplete>
    </v-flex>
    <v-flex xs4>
      <v-text-field v-if="!multiline"         
        :value="value" 
        v-on:input="$emit('input', $event)" 
        :label="$t(label)" 
        :required="required"
        :rules="required ? [ v => !!v || 'Required'] : []"
        box
      ></v-text-field>
      <v-textarea v-if="multiline"         
        :value="value" 
        v-on:input="$emit('input', $event)" 
        :label="$t(label)" 
        :required="required"
        :rules="required ? [ v => !!v || 'Required'] : []"
        box
      ></v-textarea>
    </v-flex>
    <v-flex xs2 v-if="multilingual">
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
  name: 'p-i-text-field',
  mixins: [vocabulary, fieldproperties],
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String
    },
    language: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean
    },
    multiline: {
      type: Boolean
    },
    multilingual: {
      type: Boolean
    },
    disabletype: {
      type: Boolean
    }
  },
  methods: {
    autocompleteFilter: function (item, queryText, itemText) {
      const lab = item['skos:prefLabel'][this.$i18n.locale] ? item['skos:prefLabel'][this.$i18n.locale].toLowerCase() : item['skos:prefLabel']['eng'].toLowerCase()
      const query = queryText.toLowerCase()
      return lab.indexOf(query) > -1
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.loading = !this.vocabularies['placepredicate'].loaded
      // emit input to set skos:prefLabel in parent
      if (this.type) {
        this.$emit('input-place-type', this.getTerm('placepredicate', this.type))
      }
    })
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>
