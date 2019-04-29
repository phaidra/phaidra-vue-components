<template>
  <v-flex>
    <v-layout column >
      <v-flex>
        <template v-for="(l, i) in o['skos:prefLabel']">
          <v-layout row wrap :key="'row'+i">
            <v-flex class="primary--text" md3 xs12 :key="'l'+i">{{ $t(p) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-flex>
            <v-flex md9 xs12 :key="'t'+i">
              <v-chip v-for="(keyword, j) in getKeywords(l)" :key="'kw'+j">{{keyword}}</v-chip>
            </v-flex>
          </v-layout>
        </template>
      </v-flex>
    </v-layout>
  </v-flex>
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

