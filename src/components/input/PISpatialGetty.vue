<template>
  <v-row >
    <v-col cols="4">
      <v-autocomplete
        v-on:input="$emit('input-place-type', $event)"
        :label="$t('Type of place')"
        :items="vocabularies['placepredicate'].terms"
        :item-value="'@id'"
        :value="getTerm('placepredicate', type)"
        :filter="autocompleteFilter"
        :disabled="disabletype"
       filled
        return-object
        clearable
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-item-content two-line>
            <v-list-item-title  v-html="`${getLocalizedTermLabel('placepredicate', item['@id'])}`"></v-list-item-title>
            <v-list-item-subtitle v-if="showIds" v-html="`${item['@id']}`"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-item-content>
            <v-list-item-title v-html="`${getLocalizedTermLabel('placepredicate', item['@id'])}`"></v-list-item-title>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col cols="6">
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
       filled
        clearable
        :messages="resolved"
        autocomplete="off"
      ></v-autocomplete>
    </v-col>
    <v-col cols="1" v-if="actions.length">
      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
            <v-list-item-title>{{ action.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-spatial-getty',
  mixins: [vocabulary, fieldproperties],
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    initquery: {
      type: String
    },
    required: {
      type: Boolean
    },
    debounce: {
      type: Number,
      default: 500
    },
    disabletype: {
      type: Boolean
    },
    showIds: {
      type: Boolean,
      default: false
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
    resolve: async function (uri) {
      if (uri) {
        this.loading = true

        var params = {
          uri: uri
        }

        try {
          let response = await this.$http.request({
            method: 'GET',
            url: this.$store.state.instanceconfig.api + '/resolve',
            params: params
          })

          this.preflabel = response.data[uri]['skos:prefLabel']
          this.rdfslabel = response.data[uri]['rdfs:label']
          for (var i = 0; i < this.rdfslabel.length; i++) {
            this.resolved = '<a href="' + uri + '" target="_blank">' + this.rdfslabel[i]['@value'] + '</a>'
          }
          if (response.data[uri]['schema:GeoCoordinates']) {
            this.coordinates = [
              {
                '@type': 'schema:GeoCoordinates',
                'schema:latitude': [
                  response.data[uri]['schema:GeoCoordinates']['schema:latitude']
                ],
                'schema:longitude': [
                  response.data[uri]['schema:GeoCoordinates']['schema:longitude']
                ]
              }
            ]
          }
          this.$emit('resolve', { 'skos:prefLabel': this.preflabel, 'rdfs:label': this.rdfslabel, coordinates: this.coordinates })
        } catch (error) {
          console.log(error)
        } finally {
          this.loading = false
        }
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
    querySuggestions: async function (q) {
      var self = this

      self.loading = true

      var params = {
        voc: 'tgn',
        count: 20,
        searchstring: q
      }

      try {
        let response = await this.$http.request({
          method: 'GET',
          url: this.$store.state.appconfig.suggesters.getty,
          params: params
        })
        this.items = []
        for (var i = 0; i < response.data[1].length; i++) {
          this.items.push({ text: response.data[1][i], value: response.data[3][i] })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
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
    if (this.initquery) {
      this.items = [{ value: this.value, text: this.initquery }]
      this.model = { value: this.value, text: this.initquery }
      this.resolve(this.value)
    }
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>
