<template>
  <v-row >
    <v-col cols="12" md="5" v-if="showType">
      <v-autocomplete
        v-on:input="$emit('input-identifier-type', $event)"
        :label="$t('Type of identifier')"
        :items="vocabularies['objectidentifiertype'].terms"
        :item-value="'@id'"
        :value="getTerm('objectidentifiertype', identifierType)"
        :filter="autocompleteFilter"
        :disabled="disabletype"
        filled
        return-object
        clearable
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-item-content two-line>
            <v-list-item-title  v-html="`${getLocalizedTermLabel('objectidentifiertype', item['@id'])}`"></v-list-item-title>
            <v-list-item-subtitle v-if="showIds" v-html="`${item['@id']}`"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-item-content>
            <v-list-item-title v-html="`${getLocalizedTermLabel('objectidentifiertype', item['@id'])}`"></v-list-item-title>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col cols="12" :md="showType ? 5 : 10">
      <v-text-field
        :value="value"
        v-on:input="$emit('input-identifier', $event)"
        :label="$t(identifierLabel ? identifierLabel : 'Identifier')"
        :required="required"
        :rules="[validationrules[identifierType]]"
        filled
      ></v-text-field>
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
import { validationrules } from '../../mixins/validationrules'

export default {
  name: 'p-i-alternate-identifier',
  mixins: [vocabulary, fieldproperties, validationrules],
  props: {
    value: {
      type: String,
      required: true
    },
    identifierType: {
      type: String
    },
    identifierLabel: {
      type: String
    },
    required: {
      type: Boolean
    },
    disabletype: {
      type: Boolean
    },
    showType: {
      type: Boolean
    },
    showIds: {
      type: Boolean,
      default: false
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.loading = !this.vocabularies['objectidentifiertype'].loaded
      // emit input to set skos:prefLabel in parent
      if (this.identifierType) {
        this.$emit('input-identifier-type', this.getTerm('objectidentifiertype', this.identifierType))
      }
    })
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>
