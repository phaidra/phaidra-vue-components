<template>
  <span>
    <v-row v-for="(l, i) in o['skos:prefLabel']">
      <v-col class="pdlabel primary--text text-right" md="2" cols="12" :key="'l'+i">{{ $t(p) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-col>
      <v-col md="10" cols="12" :key="'t'+i">
        <v-chip v-for="(keyword, j) in getKeywords(l)" :key="'kw'+j">{{keyword}}</v-chip>
      </v-col>
    </v-row>
  </span>
</template>

<script>
export default {
  name: 'p-d-keyword',
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
