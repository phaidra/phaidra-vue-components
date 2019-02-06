<template>
  <v-flex>
    <v-layout>
      <v-flex class="primary--text" xs3>{{ $t(p) }}</v-flex>
      <v-flex xs9>{{ resolve(p, o) }} <span class="grey--text">[{{o}}]</span></v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'

export default {
  name: 'p-d-labeled-value',
  mixins: [vocabulary],
  props: {
    o: {
      type: String,
      required: true
    },
    p: {
      type: String
    }
  },
  methods: {
    resolve: function (p, v) {
      var vocabulary = ''
      switch (p) {

        case 'dcterms:language':
          vocabulary = 'lang'
          break

        case 'ebucore:hasMimeType':
          vocabulary = 'mime-types'
          break

        default:
          //console.error('p-d-uri resolve: unrecognized predicate ', p, v)
      }

      return this.getLocalizedTermLabel(vocabulary, v)
    },
  }
}
</script>

