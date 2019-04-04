<template>
  <v-flex>
    <v-layout column >
      <v-flex>
        <template v-for="(l, i) in o['skos:prefLabel']">
          <v-layout row :key="'lay'+i">
            <v-flex v-if="p==='bf:note'" class="primary--text" xs3 :key="'l'+i">{{ $t(o['@type']) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-flex>
            <v-flex v-else class="primary--text" xs3 :key="'l'+i">{{ $t(p) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-flex>
            <v-flex v-if="o['skos:exactMatch']" xs9 :key="'t-id'+i"><a :href="o['skos:exactMatch'][0]" target="_blank">{{ l['@value'] }}</a></v-flex>
            <v-flex v-else xs9 :key="'t'+i">{{ l['@value'] }}</v-flex>
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