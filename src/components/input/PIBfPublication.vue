<template>
  <v-row>
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
          <v-row>
            <v-col cols="2">
              <v-radio-group v-model="typeModel" class="mt-0" @change="$emit('change-type', $event)">
                <v-radio color="primary" :label="$t(instanceconfig.institution)" :value="'select'"></v-radio>
                <v-radio color="primary" :label="$t('OTHER_FEMININE')" :value="'other'"></v-radio>
              </v-radio-group>
            </v-col>
            <template v-if="typeModel === 'select'">
              <v-col cols="10">
                <v-autocomplete
                  :value="getTerm('orgunits', publisherOrgUnit)"
                  :required="required"
                  v-on:input="$emit('input-publisher-select', $event)"
                  :rules="required ? [ v => !!v || 'Required'] : []"
                  :items="vocabularies['orgunits'].terms"
                  :item-value="'@id'"
                  :loading="loading"
                  :filter="autocompleteFilter"
                  hide-no-data
                  :label="$t('Please choose')"
                  filled
                  return-object
                  clearable
                  :error-messages="publisherOrgUnitErrorMessages"
                >
                  <template slot="item" slot-scope="{ item }">
                    <v-list-item-content two-line>
                      <v-list-item-title  v-html="`${getLocalizedTermLabel('orgunits', item['@id'])}`"></v-list-item-title>
                      <v-list-item-subtitle v-if="showIds" v-html="`${item['@id']}`"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                  <template slot="selection" slot-scope="{ item }">
                    <v-list-item-content>
                      <v-list-item-title v-html="`${getLocalizedTermLabel('orgunits', item['@id'])}`"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
            </template>
            <template v-else>
              <v-col v-if="publisherSearch" cols="12" md="5">
                <v-combobox
                  v-model="publisherSearchModel"
                  :items="publisherSearchItems"
                  :loading="publisherSearchLoading"
                  :search-input.sync="publisherSearchQuery"
                  :error-messages="publisherSearchErrors"
                  v-on:input="$emit('input-suggest-publisher', $event)"
                  cache-items
                  hide-no-data
                  hide-selected
                  return-object
                  item-text="name"
                  item-value="name"
                  :placeholder="$t('search publishers')"
                  filled
                  clearable
                  append-icon="search"
                >
                  <template slot="item" slot-scope="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                      <v-list-item-subtitle v-if="item.alias">{{ $t('Alias') + ': ' + item.alias }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                  <template slot="selection" slot-scope="{ item }">
                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" :md="publisherSearch ? 5 : 10">
                <v-text-field
                  :value="publisherName"
                  v-on:blur="$emit('input-publisher-name',$event.target.value)"
                  :label="$t(publisherNameLabel ? publisherNameLabel : '')"
                  :required="required"
                  :rules="required ? [ v => !!v || 'Required'] : []"
                  filled
                  :error-messages="publisherNameErrorMessages"
                ></v-text-field>
              </v-col>
            </template>
          </v-row>
          <v-row>
            <v-col v-if="showPlace" cols="8">
              <v-text-field
                :value="publishingPlace"
                v-on:blur="$emit('input-publishing-place',$event.target.value)"
                :label="$t(publishingPlaceLabel ? publishingPlaceLabel : '')"
                :required="required"
                :rules="required ? [ v => !!v || 'Required'] : []"
               filled
              ></v-text-field>
            </v-col>
            <v-col v-if="showDate" cols="4">
              <template v-if="publishingDatePicker">
                <v-menu
                  ref="menu1"
                  v-model="dateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="publishingDate"
                      :label="$t(publishingDateLabel ? publishingDateLabel : 'Date')"
                      :required="required"
                      :rules="[validationrules.date]"
                      filled
                      append-icon="event"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="primary"
                    :value="publishingDate"
                    :show-current="false"
                    v-model="pickerModel"
                    :locale="this.$i18n.locale === 'deu' ? 'de-AT' : 'en-GB' "
                    v-on:input="dateMenu = false; $emit('input-publishing-date', $event)"
                  ></v-date-picker>
                </v-menu>
              </template>
              <template v-else>
                <v-text-field
                  :value="publishingDate"
                  v-on:blur="$emit('input-publishing-date',$event.target.value)"
                  :label="$t(publishingDateLabel ? publishingDateLabel : 'Date')"
                  :required="required"
                  :hint="'Format YYYY-MM-DD'"
                  :rules="[validationrules.date]"
                filled
                ></v-text-field>
              </template>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { fieldproperties } from '../../mixins/fieldproperties'
import { validationrules } from '../../mixins/validationrules'
import { vocabulary } from '../../mixins/vocabulary'
import xmlUtils from '../../utils/xml'
import qs from 'qs'
import axios from 'axios'
var iconv = require('iconv-lite')

export default {
  name: 'p-i-bf-publication',
  mixins: [validationrules, fieldproperties, vocabulary],
  props: {
    publisherName: {
      type: String,
      required: true
    },
    publisherNameErrorMessages: {
      type: Array
    },
    publisherOrgUnit: {
      type: String
    },
    publisherOrgUnitErrorMessages: {
      type: Array
    },
    publisherSearch: {
      type: Boolean,
      default: true
    },
    publishingDate: {
      type: String
    },
    publishingPlace: {
      type: String
    },
    label: {
      type: String
    },
    publisherNameLabel: {
      type: String
    },
    publishingDateLabel: {
      type: String
    },
    publishingPlaceLabel: {
      type: String
    },
    publisherType: {
      type: String
    },
    publishingDatePicker: {
      type: Boolean
    },
    required: {
      type: Boolean
    },
    showPlace: {
      type: Boolean,
      default: true
    },
    showDate: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    instanceconfig: function () {
      return this.$root.$store.state.instanceconfig
    },
    appconfig: function () {
      return this.$root.$store.state.appconfig
    }
  },
  watch: {
    publisherSearchQuery (val) {
      val && this.publisherSearchDebounceFunction(val)
    }
  },
  data () {
    return {
      typeModel: this.publisherType,
      pickerModel: new Date().toISOString().substr(0, 10),
      dateMenu: false,
      loading: false,
      publisherSearchModel: null,
      publisherSearchItems: [],
      publisherSearchErrors: [],
      publisherSearchData: null,
      publisherSearchLoading: false,
      publisherSearchQuery: '',
      publisherSearchDebounce: 500,
      publisherSearchMinLetters: 3,
      publisherSearchDebounceTask: null
    }
  },
  methods: {
    publisherSearchDebounceFunction (value) {
      this.showList = true
      if (this.publisherSearchDebounce) {
        if (this.publisherSearchDebounceTask !== undefined) clearTimeout(this.publisherSearchDebounceTask)
        this.publisherSearchDebounceTask = setTimeout(() => {
          return this.suggestPublishers(value)
        }, this.publisherSearchDebounce)
      } else {
        return this.suggestPublishers(value)
      }
    },
    async suggestPublishers (q) {
      if (q.length < this.publisherSearchMinLetters || !this.appconfig.apis.sherparomeo) return

      this.publisherSearchLoading = true
      this.publisherSearchItems = []

      var params = {
        ak: this.appconfig.apis.sherparomeo.key,
        versions: 'all',
        qtype: 'exact',
        pub: q
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
        for (let p of obj.romeoapi[1].publishers.publisher) {
          this.publisherSearchItems.push(
            {
              name: p.name['#text'],
              alias: p.alias['#text']
            }
          )
        }
      } catch (error) {
        console.log(error)
        this.publisherSearchErrors.push(error)
      } finally {
        this.publisherSearchLoading = false
      }
    }
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>
