<template>
  <v-layout row>
    <v-flex xs8>
      <v-autocomplete
        :value="getTerm(vocabulary, value)"
        :required="required"
        v-on:input="$emit('input', $event )"
        :rules="required ? [ v => !!v || 'Required'] : []"
        :items="vocabularies[vocabulary].terms"
        :loading="loading"
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
    <v-flex xs4 v-if="multiplicable" >
      <v-container fill-height>
        <v-layout row>
          <v-flex>
            <v-btn flat icon slot="activator" v-on:click.native="$emit('add', $event)">
              <icon name="material-content-add" width="24px" height="24px"></icon>
            </v-btn>
            <v-btn flat icon slot="activator" v-on:click.native="$emit('remove', $event)">
              <icon name="material-content-remove" width="24px" height="24px"></icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import '@/compiled-icons/material-content-add'
import '@/compiled-icons/material-content-remove'
import { vocabulary } from '@/mixins/vocabulary'

export default {
  name: 'p-i-select',
  mixins: [vocabulary],
  methods: {
    autocompleteFilter: function (item, queryText) {
      const lab = item['skos:prefLabel'][this.$i18n.locale] ? item['skos:prefLabel'][this.$i18n.locale].toLowerCase() : item['skos:prefLabel']['eng'].toLowerCase()
      const query = queryText.toLowerCase()
      return lab.indexOf(query) > -1
    }
  },
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean
    },
    multiplicable: {
      type: Boolean
    },
    vocabulary: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.loading = !this.vocabularies[this.vocabulary].loaded
      // emit input to set skos:prefLabel in parent
      if (this.value) {
        for (var i = 0; i < this.vocabularies[this.vocabulary].terms.length; i++) {
          if (this.vocabularies[this.vocabulary].terms[i]['@id'] === this.value) {
            this.$emit('input', this.vocabularies[this.vocabulary].terms[i])
          }
        }
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
