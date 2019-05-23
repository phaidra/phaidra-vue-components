<template>
  <v-layout row>
    <v-flex xs4>
      <v-text-field
        :value="title"
        :label="$t( titleLabel ? titleLabel : type )"
        v-on:blur="$emit('input-title',$event.target.value)"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs4 v-if="!hideSubtitle">
      <v-text-field
        :value="subtitle"
        :label="$t( subtitleLabel ? subtitleLabel : 'Subtitle' )"
        v-on:blur="$emit('input-subtitle',$event.target.value)"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs2 v-if="multilingual">
      <v-autocomplete
        :value="getTerm('lang', language)"
        v-on:input="$emit('input-language', $event )"
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
    <v-flex xs1 v-if="actions.length">
      <v-menu open-on-hover bottom offset-y>
        <v-btn slot="activator" icon>
          <v-icon>more_vert</v-icon>
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
import { vocabulary } from '../../mixins/vocabulary'
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-title',
  mixins: [vocabulary, fieldproperties],
  props: {
    title: {
      type: String
    },
    titleLabel: {
      type: String
    },
    type: {
      type: String
    },
    subtitle: {
      type: String
    },
    subtitleLabel: {
      type: String
    },
    hideSubtitle: {
      type: Boolean
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
