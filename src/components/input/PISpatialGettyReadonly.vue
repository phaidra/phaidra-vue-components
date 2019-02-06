<template>
  <v-layout row>
    <v-flex xs8>
      <v-text-field
        :value="prefLabel"
        :persistent-hint="true"
        :messages="value"
        :label="$t(label)"
        readonly
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
            <v-list-tile-title v-if="action.event === 'remove'">{{ action.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-flex>
  </v-layout>
</template>
<script>
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-spatial-getty-readonly',
  mixins: [fieldproperties],
  computed: {
    rdfsLabels: function() {
      var i
      var arr = []
      if (this['rdfs:label']) {
        for (i = 0; i < this['rdfs:label'].length; i++) {
          arr.push(this['rdfs:label'][i]['@value'])
        }
      }
      return arr
    },
    prefLabel: function() {
      var i
      var prefLabel = ''
      // just return any now
      if (this['skos:prefLabel']) {
        for (i = 0; i < this['skos:prefLabel'].length; i++) {
          return this['skos:prefLabel'][i]['@value']
        }
      }
      return prefLabel
    }
  },
  props: {
    'skos:prefLabel': {
      type: Array,
      required: true
    },
    'rdfs:label': {
      type: Array
    },
    value: {
      type: String,
      required: true
    },
    coordinates: {
      type: Array
    },
    label: {
      type: String,
      required: true
    },
    predicate: {
      type: String,
      required: true
    },
    removable: {
      type: Boolean,
      default: true
    }
  }
}
</script>