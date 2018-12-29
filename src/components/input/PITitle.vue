<template>
  <v-layout row>
    <v-flex xs4>
      <v-text-field
        :value="title"
        :label="$t('Title')"
        v-on:input="$emit('input-title', $event)"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs4>
      <v-text-field
        :value="subtitle"
        :label="$t('Subtitle')"
        v-on:input="$emit('input-subtitle', $event)"
        box
      ></v-text-field>
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
import '@/compiled-icons/material-navigation-more-vert'
import { vocabulary } from '@/mixins/vocabulary'
import { fieldproperties } from '@/mixins/fieldproperties'

export default {
  name: 'p-i-title',
  mixins: [vocabulary, fieldproperties],
  props: {
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    language: {
      type: String
    },
    required: {
      type: Boolean
    },
    multilingual: {
      type: Boolean
    }
  },
  data () {
    return {
      datepicker: false,
      selectedDate: ''
    }
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>
