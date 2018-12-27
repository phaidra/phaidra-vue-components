<template>
  <v-layout row>
    <v-flex xs2>
      <v-text-field
        :value="value" 
        v-on:input="$emit('input-value', $event)" 
        :label="$t(label)"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs2>
      <v-select 
        v-on:input="$emit('input-unit', $event)" 
        :label="$t('Unit')"
        :items="vocabularies['un-cefact'].terms" 
        :value="getTerm('un-cefact', unit)"
        box
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-tile-content two-line>
            <v-list-tile-title  v-html="`${getLocalizedTermLabel('un-cefact', item['@id'])}`"></v-list-tile-title>
            <v-list-tile-sub-title  v-html="`${item['@id']}`"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-tile-content>
            <v-list-tile-title v-html="`${getLocalizedTermLabel('un-cefact', item['@id'])}`"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </v-select>
    </v-flex>   
    <v-flex xs2 v-if="multiplicable" >
      <v-container fill-height>
        <v-layout row>
          <v-flex>
            <v-btn flat icon slot="activator" v-on:click.native="$emit('add', $event)">
              <icon name="material-content-add" width="24px" height="24px"></icon>
            </v-btn>
            <v-btn flat icon slot="activator" v-on:click.native="$emit('remove', $event)">
              <icon name="material-content-remove" width="24px" height="24px"></icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import '@/compiled-icons/material-content-add'
import '@/compiled-icons/material-content-remove'
import { vocabulary } from '@/mixins/vocabulary'

export default {
  name: 'p-i-dimension',
  mixins: [vocabulary],
  props: {
    unit: {
      type: String
    },
    value: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    multiplicable: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>