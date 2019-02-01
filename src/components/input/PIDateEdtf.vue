<template>
  <v-layout row>
    <v-flex xs4>
      <v-autocomplete
        v-on:input="$emit('input-date-type', $event)" 
        :label="$t('Type of date')" 
        :items="vocabularies['https://phaidra.org/vocabulary/datetype'].terms" 
        :value="getTerm('https://phaidra.org/vocabulary/datetype', type)"
        :filter="autocompleteFilter"
        box
        return-object
        clearable
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-tile-content two-line>
            <v-list-tile-title  v-html="`${getLocalizedTermLabel('https://phaidra.org/vocabulary/datetype', item['@id'])}`"></v-list-tile-title>
            <v-list-tile-sub-title  v-html="`${item['@id']}`"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-tile-content>
            <v-list-tile-title v-html="`${getLocalizedTermLabel('https://phaidra.org/vocabulary/datetype', item['@id'])}`"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </v-autocomplete>
    </v-flex>
    <v-flex xs4>
      <v-menu
        ref="datepicker"
        v-model="datepicker"
        :return-value.sync="datemodel"
        lazy
        transition="fade-transition"
        offset-y
        full-width
        min-width="290px"
        box
      >
        <v-text-field
          slot="activator"
          v-model="selectedDate"
          :label="$t('Date')"
          append-icon="event"
          box
        ></v-text-field>
        <v-date-picker v-model="selectedDate" :value="date" v-on:input="$emit('input-date', $event)" :reactive="true"></v-date-picker>
      </v-menu>
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
  name: 'p-i-date-edtf',
  mixins: [vocabulary, fieldproperties],
  props: {
    date: {
      type: String
    },
    type: {
      type: String
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
  data () {
    return {
      datepicker: false,
      selectedDate: this.date,
      datemodel: ''
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.loading = !this.vocabularies['https://phaidra.org/vocabulary/datetype'].loaded
      // emit input to set skos:prefLabel in parent
      if (this.type) {
        this.$emit('input', this.getTerm('https://phaidra.org/vocabulary/datetype', this.role))
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
