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
                <v-flex xs4>
                  <v-text-field
                    :value="title"
                    :label="$t('Title')"
                    v-on:blur="$emit('input-title',$event.target.value)"
                    box
                  ></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    :value="subtitle"
                    :label="$t('Subtitle')"
                    v-on:blur="$emit('input-subtitle',$event.target.value)"
                    box
                  ></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-autocomplete
                    :value="getTerm('lang', titleLanguage)"
                    v-on:input="$emit('input-title-language', $event)"
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
                <template v-if="showname">
                  <v-flex xs4 >
                    <v-text-field
                      :value="name"
                      :label="$t('Name')"
                      v-on:blur="$emit('input-name',$event.target.value)"
                      box
                    ></v-text-field>
                  </v-flex>
                </template>
                <template v-else>
                  <v-flex xs4>
                    <v-text-field
                      :value="firstname"
                      :label="$t('Firstname')"
                      v-on:blur="$emit('input-firstname',$event.target.value)"
                      box
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      :value="lastname"
                      :label="$t('Lastname')"
                      v-on:blur="$emit('input-lastname',$event.target.value)"
                      box
                    ></v-text-field>
                  </v-flex>
                </template>
                <v-flex xs4>
                  <v-autocomplete
                    :disabled="disablerole" 
                    v-on:input="$emit('input-role', $event)" 
                    :label="$t('Role')" 
                    :items="vocabularies['rolepredicate'].terms" 
                    :value="getTerm('rolepredicate', role)"
                    :filter="autocompleteFilter"
                    box
                    return-object
                    clearable
                  >
                    <template slot="item" slot-scope="{ item }">
                      <v-list-tile-content two-line>
                        <v-list-tile-title  v-html="`${getLocalizedTermLabel('rolepredicate', item['@id'])}`"></v-list-tile-title>
                        <v-list-tile-sub-title  v-html="`${item['@id']}`"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                    <template slot="selection" slot-scope="{ item }">
                      <v-list-tile-content>
                        <v-list-tile-title v-html="`${getLocalizedTermLabel('rolepredicate', item['@id'])}`"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </v-autocomplete>
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
  name: 'p-i-adaptation',
  mixins: [vocabulary, fieldproperties],
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
    subtitle: {
      type: String
    },
    titleLanguage: {
      type: String
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    name: {
      type: String
    },
    role: {
      type: String
    },
    disablerole: {
      type: Boolean,
      default: false
    },
    showname: {
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
