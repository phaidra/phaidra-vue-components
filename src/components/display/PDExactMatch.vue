<template>
  <v-flex>
    <v-layout row wrap>
      <v-flex md3 xs12 class="primary--text" xs3>{{ $t(p) }}</v-flex>
      <v-flex md9 xs12>{{ resolve(p, o['skos:exactMatch']) }}</v-flex>
    </v-layout>
  </v-flex>
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

