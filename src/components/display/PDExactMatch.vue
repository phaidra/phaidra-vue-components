<template>
  <v-row>
    <v-col md="2" cols="12" class="pdlabel primary--text text-right">{{ $t(p) }}</v-col>
    <v-col md="10" cols="12">{{ resolve(p, o['skos:exactMatch']) }}</v-col>
  </v-row>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'

export default {
  name: 'p-d-exact-match',
  mixins: [vocabulary],
  props: {
    o: {
      type: Object,
      required: true
    },
    p: {
      type: String
    }
  },
  data () {
    return {
      langCode2to3: {
        'en': 'eng',
        'de': 'deu',
        'it': 'ita'
      }
    }
  },
  methods: {
    resolve: function (p, v) {
      var vocabulary = ''
      switch (p) {
        case 'vra:hasInscription':
          vocabulary = 'https://phaidra.org/vocabulary/stamp'
          break

        default:
          console.error('p-d-exact-match resolve: unrecognized predicate ', p, v)
      }

      return this.getLocalizedTermLabel(vocabulary, v)
    }
  }
}
</script>
