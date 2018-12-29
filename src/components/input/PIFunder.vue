<template>

  <v-layout row>
    <v-flex xs4>
      <v-text-field
        :value="name"
        :label="$t('Funder name')"
        v-on:input="$emit('input-name', $event)"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs2>
      <v-select 
        v-on:input="$emit('input-name-language', $event)" 
        :label="$t('Language')"
        :items="vocabularies['lang'].terms" 
        :value="getTerm('lang', nameLanguage)"
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
    <v-flex xs4>
      <v-text-field
        :value="identifier"
        :label="'Funder identifier'"
        v-on:input="$emit('input-identifier', $event)"
        box
      ></v-text-field>
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
import '@/compiled-icons/material-content-add'
import '@/compiled-icons/material-content-remove'
import { vocabulary } from '@/mixins/vocabulary'
import { fieldproperties } from '@/mixins/fieldproperties'

export default {
  name: 'p-i-funder',
  mixins: [vocabulary, fieldproperties],
  props: {
    name: {
      type: String
    },
    nameLanguage: {
      type: String
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
