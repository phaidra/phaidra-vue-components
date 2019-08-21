<template>
  <v-row>
    <v-col md="2" cols="12" class="pdlabel primary--text text-right">{{ $t(p) }}</v-col>
    <v-col md="10" cols="12">{{ resolve(p, o) }} <span class="grey--text">[{{o}}]</span></v-col>
  </v-row>
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
          // console.error('p-d-uri resolve: unrecognized predicate ', p, v)
      }

      return this.getLocalizedTermLabel(vocabulary, v)
    }
  }
}
</script>
