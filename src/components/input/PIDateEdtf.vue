<template>
  <v-layout row>
    <v-flex xs4>
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
        v-on:input="$emit('input-date', $event)"
        :required="required"
        :hint="'Format YYYY-MM-DD'"
        :rules="[rules.date]"
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
  name: 'p-i-date-edtf',
  mixins: [vocabulary, fieldproperties],
  props: {
    value: {
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
    },
    isValidDate: function(dateString) {

      // First check for the pattern
      var regex_date = /^(\d{4})(-\d{1,2})?(-\d{1,2})?$/

      if(!regex_date.test(dateString))
      {
          return false
      }

      var m = dateString.match(regex_date)

      var year    = parseInt(m[1], 10)

      if (m[2]) {
        var month   = parseInt(m[2].substring(1), 10)
        // Check the ranges of month
        if (month) {
          if(month == 0 || month > 12)
          {
              return false
          }
        }
      }

      if (m[3]) {
        var day     = parseInt(m[3].substring(1), 10)

        if (day) {
          var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

          // Adjust for leap years
          if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
          {
              monthLength[1] = 29
          }

          // Check the range of the day
          return day > 0 && day <= monthLength[month - 1]
        }
      }

      return true
    }
  },
  data () {
    return {
      rules: {
        required: value => !!value || 'Required.',
        date: value => {
          return typeof value === 'undefined' || value === '' || this.isValidDate(value) || 'Invalid date.'
        }
      }
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
