<template>
  <v-row>
    <v-col cols="12" md="4" v-for="(term, i) in terms" :key="'ot'+i">
      <v-checkbox v-model="selected" @click.capture="$emit('input', selected)" :label="getLocalizedTermLabel(vocabulary, term['@id'])" :value="term['@id']"></v-checkbox>
    </v-col>
  </v-row>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'

export default {
  name: 'p-i-object-type',
  mixins: [vocabulary],
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    vocabulary: {
      type: String,
      required: true
    },
    resourceType: {
      type: String
    }
  },
  computed: {
    terms: function () {
      return this.resourceType ? this.$store.getters.getObjectTypeForResourceType(this.resourceType) : this.vocabularies[this.vocabulary].terms
    }
  },
  data () {
    return {
      selected: []
    }
  }
}
</script>

