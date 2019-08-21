<template>
  <v-row >
    <v-col cols="4" v-if="!hideType">
      <v-autocomplete
        v-on:input="$emit('input-date-type', $event)"
        :label="$t('Type of date')"
        :items="vocabularies['datepredicate'].terms"
        :value="getTerm('datepredicate', type)"
        :filter="autocompleteFilter"
       filled
        return-object
        clearable
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-item-content two-line>
            <v-list-item-title  v-html="`${getLocalizedTermLabel('datepredicate', item['@id'])}`"></v-list-item-title>
            <v-list-item-subtitle  v-html="`${item['@id']}`"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-item-content>
            <v-list-item-title v-html="`${getLocalizedTermLabel('datepredicate', item['@id'])}`"></v-list-item-title>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col cols="4">
      <v-text-field
        :value="value"
        v-on:blur="$emit('input-date',$event.target.value)"
        :label="$t(dateLabel ? dateLabel : '')"
        :required="required"
        :hint="'Format YYYY-MM-DD'"
        :rules="[validationrules.date]"
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
  name: 'p-i-date-edtf',
  mixins: [vocabulary, fieldproperties, validationrules],
  props: {
    value: {
      type: String
    },
    dateLabel: {
      type: String
    },
    type: {
      type: String
    },
    hideType: {
      type: Boolean
    },
    required: {
      type: Boolean
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.loading = !this.vocabularies['datepredicate'].loaded
      // emit input to set skos:prefLabel in parent
      if (this.type) {
        this.$emit('input-date-type', this.getTerm('datepredicate', this.type))
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
