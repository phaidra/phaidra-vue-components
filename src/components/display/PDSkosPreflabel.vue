<template>
  <v-flex>
    <v-layout row >
      <template v-for="(l, i) in o['skos:prefLabel']">
        <v-flex v-if="p==='bf:note'" class="primary--text" xs3 :key="'l'+i">{{ $t(p) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-flex>
        <v-flex v-else class="primary--text" xs3 :key="'l'+i">{{ $t(p) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-flex>
        <v-flex xs9 :key="'t'+i">{{ l['@value'] }}</v-flex>
      </template>
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

