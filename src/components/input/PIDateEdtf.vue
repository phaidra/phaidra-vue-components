<template>
  <v-layout row>
    <v-flex xs4 v-if="!hideType">
      <v-autocomplete
        v-on:input="$emit('input-date-type', $event)" 
        :label="$t('Type of date')" 
        :items="vocabularies['datepredicate'].terms" 
        :value="getTerm('datepredicate', type)"
        :filter="autocompleteFilter"
        box
        return-object
        clearable
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-tile-content two-line>
            <v-list-tile-title  v-html="`${getLocalizedTermLabel('datepredicate', item['@id'])}`"></v-list-tile-title>
            <v-list-tile-sub-title  v-html="`${item['@id']}`"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-tile-content>
            <v-list-tile-title v-html="`${getLocalizedTermLabel('datepredicate', item['@id'])}`"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </v-autocomplete>
    </v-flex>
    <v-flex xs4>
      <v-text-field       
        :value="value" 
        v-on:blur="$emit('input-date',$event.target.value)"
        identifier
        :label="$t(dateLabel ? dateLabel : '')"
        :required="required"
        :hint="'Format YYYY-MM-DD'"
        :rules="[validationrules.date]"
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
import { validationrules } from '../../mixins/validationrules'

export default {
  name: 'p-i-date-edtf',
  mixins: [vocabulary, fieldproperties, validationrules],
  props: {
    value: {
      type: String
    },
    dateLabel: {
      type: String
    },
    type: {
      type: String
    },
    hideType: {
      type: Boolean
    },
    required: {
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
      this.loading = !this.vocabularies['datepredicate'].loaded
      // emit input to set skos:prefLabel in parent
      if (this.type) {
        this.$emit('input-date-type', this.getTerm('datepredicate', this.type))
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
