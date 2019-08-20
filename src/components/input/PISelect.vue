<template>
  <v-row >
    <v-col cols="8">
      <v-autocomplete
        :value="getTerm(vocabulary, value)"
        :required="required"
        v-on:input="$emit('input', $event )"
        :rules="required ? [ v => !!v || 'Required'] : []"
        :items="vocabularies[vocabulary].terms"
        :loading="loading"
        :filter="autocompleteFilter"
        hide-no-data
        :label="$t(label)"
        box
        return-object
        clearable
        :disabled="disabled"
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-item-content two-line>
            <v-list-item-title  v-html="`${getLocalizedTermLabel(vocabulary, item['@id'])}`"></v-list-item-title>
            <v-list-item-subtitle  v-html="`${item['@id']}`"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-item-content>
            <v-list-item-title v-html="`${getLocalizedTermLabel(vocabulary, item['@id'])}`"></v-list-item-title>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col cols="1" v-if="actions.length">
      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>more_vert</v-icon>
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
  name: 'p-i-select',
  mixins: [vocabulary, fieldproperties],
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean
    },
    vocabulary: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if (this.vocabulary) {
        this.loading = !this.vocabularies[this.vocabulary].loaded
        // emit input to set skos:prefLabel in parent
        if (this.value) {
          for (var i = 0; i < this.vocabularies[this.vocabulary].terms.length; i++) {
            if (this.vocabularies[this.vocabulary].terms[i]['@id'] === this.value) {
              this.$emit('input', this.vocabularies[this.vocabulary].terms[i])
            }
          }
        }
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
