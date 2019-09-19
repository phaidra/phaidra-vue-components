<template>
  <v-col cols="12">
    <v-row>
      <v-col cols="10">
        <!---->
        <v-autocomplete
          :value="getTerm(vocabulary, value)"
          :required="required"
          v-on:input="$emit('input', $event)"
          :rules="required ? [ v => !!v || 'Required'] : []"
          :items="vocabularies[vocabulary].terms"
          :item-value="'@id'"
          :loading="loading"
          :filter="autocompleteFilter"
          hide-no-data
          :label="$t(label)"
          filled
          return-object
          clearable
          :disabled="disabled"
          :hint="hint"
          :persistent-hint="hint ? true : false"
        >
          <!-- the attr binds the 'disabled' property of the vocabulary term (if defined) to the item component -->
          <template slot="item" slot-scope="{ attr, item }">
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
      <v-col cols="2" v-if="actions.length">
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
    <v-slide-y-transition hide-on-leave>
      <v-row no-gutters v-if="showValueDefinition" v-show="value" :class=" hint ? 'mt-2 mb-6' : 'mb-6'">
        <v-col cols="10">
          <p>{{ getLocalizedDefinition(vocabulary, value) }}</p>
        </v-col>
      </v-row>
    </v-slide-y-transition>
  </v-col>
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
    },
    showValueDefinition: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String
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
