<template>

  <v-layout row>
    <v-flex xs10>

      <v-card >
        <v-card-title class="subheading grey white--text">
            <span>{{ $t('Project') }}</span>
            <v-spacer></v-spacer>
            <v-menu open-on-hover bottom offset-y v-if="actions.length">
              <v-btn slot="activator" icon dark>
                <v-icon dark>more_vert</v-icon>
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
                  :value="name"
                  :label="$t('Name')"
                  v-on:blur="$emit('input-name',$event.target.value)"
                  box
                ></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-autocomplete
                  :value="getTerm('lang', nameLanguage)"
                  v-on:input="$emit('input-name-language', $event )"
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
              <v-flex xs8>
                <v-text-field
                  :value="description"
                  :label="'Description'"
                  v-on:input="$emit('input-description', $event)"
                  box
                ></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-autocomplete
                  :value="getTerm('lang', descriptionLanguage)"
                  v-on:input="$emit('input-description-language', $event )"
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

              <v-flex xs6>
                <v-text-field
                  :value="identifier"
                  :label="'Identifier'"
                  v-on:blur="$emit('input-identifier',$event.target.value)"
                  homepage
                  box
                ></v-text-field>
              </v-flex>

              <v-flex xs6>
                <v-text-field
                  :value="homepage"
                  :label="'Homepage'"
                  v-on:blur="$emit('input-homepage',$event.target.value)"
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
