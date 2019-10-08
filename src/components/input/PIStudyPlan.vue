<template>
  <v-row >
    <v-col cols="4">
      <v-text-field
        :value="notation"
        v-on:blur="$emit('input-notation',$event.target.value)"
        :label="$t('Study plan notation')"
        :required="required"
        :rules="required ? [ v => !!v || 'Required'] : []"
       filled
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        :value="name"
        v-on:blur="$emit('input-name',$event.target.value)"
        :label="$t('Study plan name')"
        :required="required"
        :rules="required ? [ v => !!v || 'Required'] : []"
       filled
      ></v-text-field>
    </v-col>
    <v-col cols="2" v-if="multilingual">
      <v-autocomplete
        :value="getTerm('lang', nameLanguage)"
        v-on:input="$emit('input-name-language', $event )"
        :items="vocabularies['lang'].terms"
        :item-value="'@id'"
        :filter="autocompleteFilter"
        hide-no-data
        :label="$t('Name language')"
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
    <v-col cols="1" v-if="actions.length">
      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
            <v-list-item-title>{{ action.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-study-plan',
  mixins: [vocabulary, fieldproperties],
  props: {
    notation: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    nameLanguage: {
      type: String
    },
    required: {
      type: Boolean
    },
    multiline: {
      type: Boolean
    },
    multilingual: {
      type: Boolean
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
</style>
