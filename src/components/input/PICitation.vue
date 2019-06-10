<template>
  <v-layout row>
    <v-flex xs2>
      <v-autocomplete
        v-on:input="$emit('input-citation-type', $event)" 
        :label="$t('Citation type')" 
        :items="vocabularies['citationpredicate'].terms" 
        :value="getTerm('citationpredicate', type)"
        :filter="autocompleteFilter"
        :disabled="disabletype"
        box
        return-object
        clearable
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-tile-content two-line>
            <v-list-tile-title  v-html="`${getLocalizedTermLabel('citationpredicate', item['@id'])}`"></v-list-tile-title>
            <v-list-tile-sub-title  v-html="`${item['@id']}`"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-tile-content>
            <v-list-tile-title v-html="`${getLocalizedTermLabel('citationpredicate', item['@id'])}`"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </v-autocomplete>
    </v-flex>
    <v-flex xs4>
      <v-text-field
        :value="citation" 
        v-on:input="$emit('input-citation', $event)" 
        :label="$t(citationLabel)" 
        :required="required"
        :rules="required ? [ v => !!v || 'Required'] : []"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs2>
      <v-autocomplete
        :value="getTerm('lang', citationLanguage)"
        v-on:input="$emit('input-citation-language', $event)"
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
    <v-flex xs4>
      <v-text-field        
        :value="identifier" 
        v-on:input="$emit('input-identifier', $event)" 
        :label="$t(identifierLabel)" 
        :required="required"
        :rules="required ? [ v => !!v || 'Required'] : []"
        box
      ></v-text-field>
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
  name: 'p-i-citation',
  mixins: [vocabulary, fieldproperties],
  props: {
    citation: {
      type: String
    },
    citationLanguage: {
      type: String
    },
    identifier: {
      type: String
    },
    type: {
      type: String
    },
    citationLabel: {
      type: String,
      required: true
    },
    identifierLabel: {
      type: String,
      required: true
    },
    required: {
      type: Boolean
    },
    disabletype: {
      type: Boolean
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.loading = !this.vocabularies['citationpredicate'].loaded
      // emit input to set skos:prefLabel in parent
      if (this.type) {
        this.$emit('input-citation-type', this.getTerm('citationpredicate', this.type))
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
