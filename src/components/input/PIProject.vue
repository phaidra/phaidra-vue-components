<template>

  <v-row >
    <v-col cols="12">

      <v-card >
        <v-card-title class="title font-weight-light grey white--text">
            <span>{{ $t('Project') }}</span>
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
          <v-col>
            <v-row >
              <v-col cols="8">
                <v-text-field
                  :value="name"
                  :label="$t('Name')"
                  v-on:blur="$emit('input-name',$event.target.value)"
                 filled
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-autocomplete
                  :value="getTerm('lang', nameLanguage)"
                  v-on:input="$emit('input-name-language', $event )"
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
                      <v-list-item-subtitle v-if="showIds" v-html="`${item['@id']}`"></v-list-item-subtitle>
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
              <v-col cols="8">
                <v-text-field
                  :value="description"
                  :label="$t('Description')"
                  v-on:input="$emit('input-description', $event)"
                 filled
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-autocomplete
                  :value="getTerm('lang', descriptionLanguage)"
                  v-on:input="$emit('input-description-language', $event )"
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
                      <v-list-item-subtitle v-if="showIds" v-html="`${item['@id']}`"></v-list-item-subtitle>
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

              <v-col cols="6">
                <v-text-field
                  :value="identifier"
                  :label="$t('Identifier')"
                  v-on:blur="$emit('input-identifier',$event.target.value)"
                  homepage
                 filled
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  :value="homepage"
                  :label="$t('Homepage')"
                  v-on:blur="$emit('input-homepage',$event.target.value)"
                 filled
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

export default {
  name: 'p-i-project',
  mixins: [vocabulary, fieldproperties],
  props: {
    type: {
      type: String
    },
    name: {
      type: String
    },
    nameLanguage: {
      type: String
    },
    identifier: {
      type: String
    },
    description: {
      type: String
    },
    descriptionLanguage: {
      type: String
    },
    homepage: {
      type: String
    },
    showIds: {
      type: Boolean,
      default: false
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
