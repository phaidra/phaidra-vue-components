<template>
  <v-row >
    <v-col cols="10">
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
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-subject-gnd',
  mixins: [fieldproperties],
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String
    },
    voc: {
      type: String,
      default: 'SubjectHeading'
    },
    exactvoc: {
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
          if (this.rdfslabel) {
            var rdfslabelarr = []
            for (var i = 0; i < this.rdfslabel.length; i++) {
              rdfslabelarr.push(this.rdfslabel[i]['@value'])
            }
            this.resolved = 'Synonym: <a href="' + uri + '" target="_blank">' + rdfslabelarr.join(', ') + '</a>'
          } else {
            this.resolved = ''
          }
          this.$emit('resolve', { 'skos:prefLabel': this.preflabel, 'rdfs:label': this.rdfslabel })
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
      this.loading = true

      var params = {
        count: 200,
        searchterm: q
      }

      if (this.voc) {
        params['type'] = this.voc
      }

      if (this.exactvoc) {
        params['exact_type'] = this.exactvoc
      }

      try {
        let response = await this.$http.request({
          method: 'GET',
          url: this.$store.state.appconfig.suggesters.gnd,
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
