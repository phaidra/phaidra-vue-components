<template>
  <v-layout row>
    <v-flex xs8>
      <v-text-field v-if="!multiline"         
        :value="value" 
        v-on:input="$emit('input', $event)" 
        :label="$t(label)" 
        :required="required"
        :rules="required ? [ v => !!v || 'Required'] : []"
        box
      ></v-text-field>
      <v-textarea v-if="multiline"         
        :value="value" 
        v-on:input="$emit('input', $event)" 
        :label="$t(label)" 
        :required="required"
        :rules="required ? [ v => !!v || 'Required'] : []"
        box
      ></v-textarea>
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
  name: 'p-i-text-field',
  mixins: [vocabulary, fieldproperties],
  props: {
    value: {
      type: String,
      required: true
    },
    language: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean
    },
    multiline: {
      type: Boolean
    },
    multilingual: {
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
