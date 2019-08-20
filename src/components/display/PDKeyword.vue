<template>
  <v-col>
    <v-row >
      <v-col>
        <template v-for="(l, i) in o['skos:prefLabel']">
          <v-row   :key="'row'+i">
            <v-col class="pdlabel primary--text" md="4" cols="12" :key="'l'+i">{{ $t(p) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-col>
            <v-col md="8" cols="12" :key="'t'+i">
              <v-chip v-for="(keyword, j) in getKeywords(l)" :key="'kw'+j">{{keyword}}</v-chip>
            </v-col>
          </v-row>
        </template>
      </v-col>
    </v-row>
  </v-col>
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
