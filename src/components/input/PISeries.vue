<template>

  <v-row >
    <v-col cols="12">

      <v-card >
        <v-card-title class="subheading grey white--text">
            <span>{{ $t(label) }}</span>
            <v-spacer></v-spacer>
            <v-menu open-on-hover bottom offset-y v-if="actions.length">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon dark>
                  <v-icon dark>more_vert</v-icon>
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
            <v-col>
              <v-row >
                <v-col cols="8">
                  <v-text-field
                    :value="title"
                    :label="$t('Title')"
                    v-on:blur="$emit('input-title',$event.target.value)"
                    box
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
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
                    box
                  ></v-text-field>
                </v-col>

                <v-col cols="4" v-if="!hideIssue">
                  <v-text-field
                    :value="issue"
                    :label="$t('Issue')"
                    v-on:blur="$emit('input-issue',$event.target.value)"
                    box
                  ></v-text-field>
                </v-col>

                <v-col cols="4" v-if="!hideIssued">
                    <v-text-field
                    :value="issued"
                    :label="$t('Issued')"
                    v-on:blur="$emit('input-issued',$event.target.value)"
                    :hint="'Format YYYY-MM-DD'"
                    :rules="[validationrules.date]"
                    box
                  ></v-text-field>
                </v-col>

              </v-row>

              <v-row >

                <v-col cols="6" v-if="!hideIssn">
                  <v-text-field
                    :value="issn"
                    :label="$t('ISSN')"
                    v-on:blur="$emit('input-issn',$event.target.value)"
                    box
                  ></v-text-field>
                </v-col>

                <v-col cols="6" v-if="!hideIdentifier">
                  <v-text-field
                    :value="identifier"
                    :label="$t('Identifier')"
                    v-on:blur="$emit('input-identifier',$event.target.value)"
                    box
                  ></v-text-field>
                </v-col>

              </v-row>
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
