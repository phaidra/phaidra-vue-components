<template>
  <v-flex>
    <template v-if="o['skos:prefLabel']">
      <v-layout row>
        <template v-for="(l, i) in o['skos:prefLabel']">
          <v-flex class="primary--text" xs3 :key="'l'+i">{{ $t(p) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-flex>
          <v-flex xs9 :key="'t'+i">{{ l['@value'] }}</v-flex>
        </template>
      </v-layout>
    </template>
  </v-flex>
</template>

<script>
export default {
  name: 'p-d-georeference',
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

