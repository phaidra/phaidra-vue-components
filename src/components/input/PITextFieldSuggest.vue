<template>
  <v-layout row>
    <v-flex xs8>
      <v-combobox
        v-model="model"
        v-on:input="$emit('input', htmlToPlaintext($event))"
        v-on:change="$emit('input', htmlToPlaintext($event))"
        :items="items"
        :loading="loading"
        :search-input.sync="search"
        :required="required"
        :rules="required ? [ v => !!v || 'Required'] : []"
        cache-items
        hide-no-data
        hide-selected
        item-text="text"
        item-value="value"
        :label="$t(label)"
        box
        clearable
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-tile-content two-line>
            <v-list-tile-title inset v-html="item"></v-list-tile-title>
          </v-list-tile-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-tile-content>
            <v-list-tile-title inset>{{ htmlToPlaintext(item) }}</v-list-tile-title>
          </v-list-tile-content>
        </template>
      </v-combobox>
    </v-flex>
    <v-flex xs2 v-if="multilingual">
      <v-select 
        v-on:input="$emit('input-language', $event)" 
        :label="$t('Language')"
        :required="required"
        :rules="required ? [ v => !!v || 'Required'] : []"
        :items="vocabularies['lang'].terms" 
        :value="getTerm('lang', language)"
        box
        return-object
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-tile-content two-line>
            <v-list-tile-title inset v-html="`${getLocalizedTermLabel('lang', item['@id'])}`"></v-list-tile-title>
            <v-list-tile-sub-title inset v-html="`${item['@id']}`"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-tile-content>
            <v-list-tile-title inset v-html="`${getLocalizedTermLabel('lang', item['@id'])}`"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </v-select>                      
    </v-flex>
    <v-flex xs1 v-if="actions.length">
      <v-menu open-on-hover bottom offset-y>
        <v-btn slot="activator" icon>
          <icon name="material-navigation-more-vert" width="24px" height="24px"></icon>
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
  import '@/compiled-icons/material-content-add'
  import '@/compiled-icons/material-content-remove'
  import { vocabulary } from '@/mixins/vocabulary'
  import { fieldproperties } from '@/mixins/fieldproperties'

  export default {
    name: 'p-i-text-field-suggest',
    mixins: [vocabulary, fieldproperties],
    props: {
      value: {
        type: String,
        required: true
      },
      language: {
        type: String
      },
      label: {
        type: String,
        required: true
      },
      required: {
        type: Boolean
      },
      multilingual: {
        type: Boolean
      },
      suggester: {
        type: String,
        required: true
      },
      debounce: {
        type: Number,
        default: 500
      }
    },
    data () {
      return {
        items: [],
        loading: false,
        model: this.value,
        search: null
      }
    },
    watch: {
      search (val) {
        val && this.querySuggestionsDebounce(val)
      }
    },
    methods: {
      htmlToPlaintext: function (text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : ''
      },
      querySuggestionsDebounce (value) {
        this.showList = true

        if (this.debounce) {
          if (this.debounceTask !== undefined) clearTimeout(this.debounceTask)
          this.debounceTask = setTimeout(() => {
            return this.querySuggestions(value)
          }, this.debounce)
        } else {
          return this.querySuggestions(value)
        }
      },
      querySuggestions (q) {
        var self = this

        if (q.length < this.min || !this.suggester) return

        self.loading = true

        var params = {
          suggest: true,
          'suggest.dictionary': self.suggester,
          wt: 'json',
          'suggest.q': q
        }

        var query = qs.stringify(params)

        fetch(self.$store.state.settings.instance.solr + '/suggest?' + query, {
          method: 'GET',
          mode: 'cors'
        })
        .then(function (response) { return response.json() })
        .then(function (json) {
          self.items = []
          for (var i = 0; i < json.suggest[self.suggester][q].suggestions.length; i++) {
            self.items.push(json.suggest[self.suggester][q].suggestions[i].term)
          }
          self.loading = false
        })
        .catch(function (error) {
          //console.log(error)
          self.loading = false
        })
      }
    }

  }
</script>

<style scoped>
.searchbox{
  font-size: 14px;
  box-sizing: border-box;
  border: none;
  box-shadow: none;
  outline: 0;
  background: 0 0;
  width: 100%;
  padding: 0 15px;
  line-height: 40px;
  height: 40px;
}

.autocomplete {
  position: absolute;
  z-index: 999;
  margin-top: 2px;
}
.v-btn {
  margin: 0;
}
</style>

