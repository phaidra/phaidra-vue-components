<template>
  <v-layout row>
    <v-flex xs8>
      <v-autocomplete
        v-model="model"
        v-on:input="$emit('input', $event)"
        :items="items"
        :loading="loading"
        :search-input.sync="search"
        cache-items
        hide-no-data
        hide-selected
        item-text="text"
        item-value="value"
        :label="$t(label)"
        box
        clearable
        :messages="resolved"
      ></v-autocomplete>
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
import qs from 'qs'
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-gbv-suggest-getty',
  mixins: [fieldproperties],
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    voc: {
      type: String,
      required: true
    },
    required: {
      type: Boolean
    },
    debounce: {
      type: Number,
      default: 500
    }
  },
  watch: {
    search (val) {
      val && this.querySuggestionsDebounce(val)
    },
    value (val) {
      val && this.resolve(val)
    }
  },
  data () {
    return {
      items: [],
      loading: false,
      model: null,
      search: null,
      debounceTask: undefined,
      preflabel: '',
      rdfslabel: '',
      coordinates: [],
      resolved: ''
    }
  },
  methods: {
    resolve: function (uri) {
      var self = this

      if (uri) {
        self.loading = true

        var params = {
          uri: uri
        }

        var query = qs.stringify(params)

        fetch(self.$store.state.settings.instance.api + '/resolve/?' + query, {
          method: 'GET',
          mode: 'cors'
        })
        .then(function (response) {
          return response.json()
        })
        .then(function (json) {
          self.loading = false
          self.preflabel = json[uri]['skos:prefLabel']
          self.rdfslabel = json[uri]['rdfs:label']
          for (var i = 0; i < self.rdfslabel.length; i++) {
            self.resolved = '<a href="' + uri + '" target="_blank">' + self.rdfslabel[i]['@value'] + '</a>'
          }
          self.coordinates = json[uri]['schema:GeoCoordinates']
          self.$emit('resolve', { 'skos:prefLabel': self.preflabel, 'rdfs:label': self.rdfslabel, coordinates: self.coordinates })
        })
        .catch(function (error) {
          console.log(error)
          self.loading = false
        })
      }
    },
    querySuggestionsDebounce (q) {
      if (this.debounce) {
        if (this.debounceTask !== undefined) clearTimeout(this.debounceTask)
        this.debounceTask = setTimeout(() => {
          return this.querySuggestions(q)
        }, this.debounce)
      } else {
        return this.querySuggestions(q)
      }
    },
    querySuggestions (q) {
      var self = this

      self.loading = true

      var params = {
        voc: self.voc,
        count: 20,
        searchstring: q
      }

      var query = qs.stringify(params)

      fetch(self.$store.state.settings.global.suggesters.getty + '?' + query, {
        method: 'GET',
        mode: 'cors'
      })
      .then(function (response) { return response.json() })
      .then(function (json) {
        for (var i = 0; i < json[1].length; i++) {
          self.items.push({ text: json[1][i], value: json[3][i] })
        }
        self.loading = false
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(() => (self.loading = false))
    }
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>
