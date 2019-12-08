<template>
  <span>
    <v-row v-for="(l, i) in o['skos:prefLabel']" :key="'kw'+i">
      <v-col class="pdlabel primary--text text-right" :md="labelColMd" cols="12" >{{ $t(p) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-col>
      <v-col :md="valueColMd" cols="12">
        <v-chip v-for="(keyword, j) in getKeywords(l)" :key="'kwch'+j">{{keyword}}</v-chip>
      </v-col>
    </v-row>
  </span>
</template>

<script>
import { displayproperties } from '../../mixins/displayproperties'

export default {
  name: 'p-d-keyword',
  mixins: [displayproperties],
  props: {
    o: {
      type: Object,
      required: true
    },
    p: {
      type: String
    }
  },
  methods: {
    getKeywords: function (l) {
      if (l['@value']) {
        return l['@value'].split(',')
      } else {
        return []
      }
    }
  }
}
</script>
