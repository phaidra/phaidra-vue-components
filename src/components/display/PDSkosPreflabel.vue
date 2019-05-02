<template>
  <v-flex>
    <v-layout column >
      <v-flex>
        <template v-for="(l, i) in o['skos:prefLabel']">
          <v-layout :key="'lay'+i" row wrap>
            <v-flex md3 xs12 v-if="p==='bf:note'" class="pdlabel primary--text" :key="'l'+i">{{ $t(o['@type']) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-flex>
            <v-flex md3 xs12 v-else class="pdlabel primary--text" :key="'l'+i">{{ $t(p) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-flex>
            <v-flex md9 xs12 v-if="o['skos:exactMatch']" :key="'t-id'+i"><a :href="o['skos:exactMatch'][0]" target="_blank">{{ l['@value'] }}</a></v-flex>
            <v-flex md9 xs12 v-else :key="'t'+i">{{ l['@value'] }}</v-flex>
          </v-layout>
        </template>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'p-d-skos-preflabel',
  props: {
    o: {
      type: Object,
      required: true
    },
    p: {
      type: String
    }
  }
}
</script>