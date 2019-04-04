<template>

  <v-layout row>
    <v-flex xs12>

      <v-card >
        <v-card-title class="subheading grey white--text">
            <span>{{ $t(label) }}</span>
            <v-spacer></v-spacer>
            <v-menu open-on-hover bottom offset-y v-if="actions.length">
              <v-btn slot="activator" icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
                  <v-list-tile-title>{{ action.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">

          <v-layout column>
            <v-flex>
              <v-layout row>
                <v-flex xs8>
                  <v-text-field
                    :value="title"
                    :label="$t('Title')"
                    v-on:input="$emit('input-title', $event)"
                    box
                  ></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    :value="getTerm('lang', titleLanguage)"
                    v-on:input="$emit('input-title-language', $event )"
                    :items="vocabularies['lang'].terms"
                    :filter="autocompleteFilter"
                    hide-no-data
                    :label="$t('Language')"
                    box
                    return-object
                    clearable
                  >
                    <template slot="item" slot-scope="{ item }">
                      <v-list-tile-content two-line>
                        <v-list-tile-title  v-html="`${getLocalizedTermLabel('lang', item['@id'])}`"></v-list-tile-title>
                        <v-list-tile-sub-title  v-html="`${item['@id']}`"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                    <template slot="selection" slot-scope="{ item }">
                      <v-list-tile-content>
                        <v-list-tile-title v-html="`${getLocalizedTermLabel('lang', item['@id'])}`"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </v-autocomplete>
                </v-flex>
                    
              </v-layout>

              <v-layout row>

                <v-flex xs4 v-if="!hideVolume">
                  <v-text-field
                    :value="volume"
                    :label="$t('Volume')"
                    v-on:input="$emit('input-volume', $event)"
                    box
                  ></v-text-field>
                </v-flex>

                <v-flex xs4 v-if="!hideIssue">
                  <v-text-field
                    :value="issue"
                    :label="$t('Issue')"
                    v-on:input="$emit('input-issue', $event)"
                    box
                  ></v-text-field>
                </v-flex>

                <v-flex xs4 v-if="!hideIssued">
                    <v-text-field       
                    :value="issued" 
                    :label="$t('Issued')"
                    v-on:input="$emit('input-issued', $event)"
                    :hint="'Format YYYY-MM-DD'"
                    :rules="[validationrules.date]"
                    box
                  ></v-text-field>
                </v-flex>

              </v-layout>

              <v-layout row>

                <v-flex xs6 v-if="!hideIssn">
                  <v-text-field
                    :value="issn"
                    :label="$t('ISSN')"
                    v-on:input="$emit('input-issn', $event)"
                    box
                  ></v-text-field>
                </v-flex>

                <v-flex xs6 v-if="!hideIdentifier">
                  <v-text-field
                    :value="identifier"
                    :label="$t('Identifier')"
                    v-on:input="$emit('input-identifier', $event)"
                    box
                  ></v-text-field>
                </v-flex>

              </v-layout>
            </v-flex>  
          </v-layout>
        
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'
import { fieldproperties } from '../../mixins/fieldproperties'
import { validationrules } from '../../mixins/validationrules'

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
