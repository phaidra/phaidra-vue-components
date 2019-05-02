<template>
  <v-flex>
    <v-layout row wrap>
      <v-flex md3 xs12 class="pdlabel primary--text">{{ $t(p) }}</v-flex>
      <v-flex md9 xs12>{{ resolve(p, o) }} <span class="grey--text">[{{o}}]</span></v-flex>
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
        case 'schema:subtitleLanguage':
          vocabulary = 'lang'
          break

        case 'ebucore:hasMimeType':
          vocabulary = 'mimetypes'
          break

        default:
          //console.error('p-d-uri resolve: unrecognized predicate ', p, v)
      }

      return this.getLocalizedTermLabel(vocabulary, v)
    }
  }
}
</script>

