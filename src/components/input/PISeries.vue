<template>

  <v-row >
    <v-col cols="12">
      <v-card >
        <v-card-title class="title font-weight-light grey white--text">
            <span>{{ $t(label) }}</span>
            <v-spacer></v-spacer>
            <v-menu open-on-hover bottom offset-y v-if="actions.length">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon dark>
                  <v-icon dark>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
                  <v-list-item-title>{{ action.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <v-row v-if="journalSuggest" no-gutters>
            <v-combobox
              v-model="journalSearchModel"
              :items="journalSearchItems"
              :loading="journalSearchLoading"
              :search-input.sync="journalSearchQuery"
              :error-messages="journalSearchErrors"
              v-on:input="$emit('input-select-journal', $event)"
              cache-items
              hide-no-data
              hide-selected
              return-object
              item-text="title"
              item-value="issn"
              :placeholder="$t('please enter exact journal title or ISSN')"
              filled
              clearable
              append-icon="search"
            >
              <template slot="item" slot-scope="{ item }">
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                  <v-list-item-subtitle v-if="item.issn">{{ $t('ISSN') + ': ' + item.issn }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="item.romeopub">{{ $t('PUBLISHER_VERLAG') + ': ' + item.romeopub }}</v-list-item-subtitle>
                </v-list-item-content>
              </template>
              <template slot="selection" slot-scope="{ item }">
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-combobox>
          </v-row>
          <v-row >
            <v-col cols="8">
              <v-text-field
                :value="title"
                :label="$t('Title')"
                v-on:blur="$emit('input-title',$event.target.value)"
                filled
                :error-messages="titleErrorMessages"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
                :value="getTerm('lang', titleLanguage)"
                v-on:input="$emit('input-title-language', $event )"
                :items="vocabularies['lang'].terms"
                :item-value="'@id'"
                :filter="autocompleteFilter"
                hide-no-data
                :label="$t('Language')"
                filled
                return-object
                clearable
              >
                <template slot="item" slot-scope="{ item }">
                  <v-list-item-content two-line>
                    <v-list-item-title  v-html="`${getLocalizedTermLabel('lang', item['@id'])}`"></v-list-item-title>
                    <v-list-item-subtitle  v-html="`${item['@id']}`"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
                <template slot="selection" slot-scope="{ item }">
                  <v-list-item-content>
                    <v-list-item-title v-html="`${getLocalizedTermLabel('lang', item['@id'])}`"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </v-col>

          </v-row>

          <v-row >

            <v-col cols="4" v-if="!hideVolume">
              <v-text-field
                :value="volume"
                :label="$t('Volume')"
                v-on:blur="$emit('input-volume',$event.target.value)"
                filled
              ></v-text-field>
            </v-col>

            <v-col cols="4" v-if="!hideIssue">
              <v-text-field
                :value="issue"
                :label="$t('Issue')"
                v-on:blur="$emit('input-issue',$event.target.value)"
                filled
              ></v-text-field>
            </v-col>

            <v-col cols="4" v-if="!hideIssued">
                <v-text-field
                :value="issued"
                :label="$t('Issued')"
                v-on:blur="$emit('input-issued',$event.target.value)"
                :hint="'Format YYYY-MM-DD'"
                :rules="[validationrules.date]"
                filled
              ></v-text-field>
            </v-col>

          </v-row>

          <v-row >

            <v-col cols="6" v-if="!hideIssn">
              <v-text-field
                :value="issn"
                :label="$t('ISSN')"
                v-on:blur="$emit('input-issn',$event.target.value)"
                filled
              ></v-text-field>
            </v-col>

            <v-col cols="6" v-if="!hideIdentifier">
              <v-text-field
                :value="identifier"
                :label="$t('Identifier')"
                v-on:blur="$emit('input-identifier',$event.target.value)"
                filled
              ></v-text-field>
            </v-col>

          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'
import { fieldproperties } from '../../mixins/fieldproperties'
import { validationrules } from '../../mixins/validationrules'
import xmlUtils from '../../utils/xml'
import qs from 'qs'
import axios from 'axios'
var iconv = require('iconv-lite')

export default {
  name: 'p-i-series',
  mixins: [vocabulary, fieldproperties, validationrules],
  props: {
    type: {
      type: String
    },
    label: {
      type: String
    },
    title: {
      type: String
    },
    titleLanguage: {
      type: String
    },
    hideVolume: {
      type: Boolean
    },
    volume: {
      type: String
    },
    hideIssue: {
      type: Boolean
    },
    issue: {
      type: String
    },
    hideIssued: {
      type: Boolean
    },
    issued: {
      type: String
    },
    hideIssn: {
      type: Boolean
    },
    issn: {
      type: String
    },
    hideIdentifier: {
      type: Boolean
    },
    identifier: {
      type: String
    },
    journalSuggest: {
      type: Boolean
    },
    titleErrorMessages: {
      type: Array
    }
  },
  computed: {
    appconfig: function () {
      return this.$root.$store.state.appconfig
    }
  },
  watch: {
    journalSearchQuery (val) {
      val && this.queryJournalSearchDebounce(val)
    }
  },
  data () {
    return {
      journalSearchModel: null,
      journalSearchItems: [],
      journalSearchErrors: [],
      journalSearchData: null,
      journalSearchLoading: false,
      journalSearchQuery: '',
      journalSearchDebounce: 500,
      journalSearchMinLetters: 3,
      journalSearchDebounceTask: null
    }
  },
  methods: {
    queryJournalSearchDebounce (value) {
      this.showList = true
      if (this.journalSearchDebounce) {
        if (this.journalSearchDebounceTask !== undefined) clearTimeout(this.journalSearchDebounceTask)
        this.journalSearchDebounceTask = setTimeout(() => {
          return this.suggestJournals(value)
        }, this.journalSearchDebounce)
      } else {
        return this.suggestJournals(value)
      }
    },
    async suggestJournals (q) {
      if (q.length < this.journalSearchMinLetters || !this.appconfig.apis.sherparomeo) return

      this.journalSearchLoading = true
      this.journalSearchItems = []

      var params = {
        ak: this.appconfig.apis.sherparomeo.key,
        versions: 'all',
        qtype: 'contains',
        jtitle: q
      }

      var query = qs.stringify(params)

      try {
        let response = await axios.request({
          method: 'GET',
          url: this.appconfig.apis.sherparomeo.url + '?' + query,
          responseType: 'arraybuffer'
        })
        let utfxml = iconv.decode(Buffer.from(response.data), 'ISO-8859-1')
        let dp = new window.DOMParser()
        let obj = xmlUtils.xmlToJson(dp.parseFromString(utfxml, 'text/xml'))
        for (let j of obj.romeoapi[1].journals.journal) {
          this.journalSearchItems.push(
            {
              title: j.jtitle['#text'],
              issn: j.issn['#text'],
              romeopub: j.romeopub['#text'] ? j.romeopub['#text'] : this.$t('Not available')
            }
          )
        }
      } catch (error) {
        console.log(error)
        this.journalSearchErrors.push(error)
      } finally {
        this.journalSearchLoading = false
      }
    }
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
.vertical-center {
 align-items: center;
}
</style>
