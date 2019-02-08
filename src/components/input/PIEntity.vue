<template>
  <v-layout row>
    <v-flex xs2 v-if="type === 'schema:Person'">
      <v-text-field
        :value="firstname"
        :label="$t('Firstname')"
        v-on:input="$emit('input-firstname', $event)"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs2 v-if="type === 'schema:Person'">
      <v-text-field
        :value="lastname"
        :label="$t('Lastname')"
        v-on:input="$emit('input-lastname', $event)"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs4 v-if="type === 'schema:Organisation'">
      <v-text-field
        :value="institution"
        :label="'Institution'"
        v-on:input="$emit('input-institution', $event)"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs2 v-if="showidentifier">
      <v-text-field
        :value="identifier"
        :label="$t('Identifier')"
        v-on:input="$emit('input-identifier', $event)"
        box
      ></v-text-field>                    
    </v-flex>
    <v-flex xs2>
      <v-autocomplete
        :disabled="disablerole" 
        v-on:input="$emit('input-role', $event)" 
        :label="$t('Role')" 
        :items="vocabularies['rolepredicate'].terms" 
        :value="getTerm('rolepredicate', role)"
        :filter="autocompleteFilter"
        box
        return-object
        clearable
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-tile-content two-line>
            <v-list-tile-title  v-html="`${getLocalizedTermLabel('rolepredicate', item['@id'])}`"></v-list-tile-title>
            <v-list-tile-sub-title  v-html="`${item['@id']}`"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-tile-content>
            <v-list-tile-title v-html="`${getLocalizedTermLabel('rolepredicate', item['@id'])}`"></v-list-tile-title>
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
  name: 'p-i-entity',
  mixins: [vocabulary, fieldproperties],
  props: {
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    institution: {
      type: String
    },
    identifier: {
      type: String
    },
    role: {
      type: String
    },
    type: {
      type: String
    },
    required: {
      type: Boolean
    },
    disablerole: {
      type: Boolean,
      default: false
    },
    showidentifier: {
      type: Boolean,
      default: true
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
      vocabulary: 'rolepredicate'
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.loading = !this.vocabularies[this.vocabulary].loaded
      // emit input to set skos:prefLabel in parent
      if (this.role) {
        this.$emit('input', this.getTerm('rolepredicate', this.role))
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
