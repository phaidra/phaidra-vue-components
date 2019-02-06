<template>
  <v-flex>
    <template v-if="o['skos:prefLabel']">
      <v-layout row>
        <v-flex class="primary--text" xs3>{{ $t(p) }}<template v-for="(l) in o['skos:prefLabel']"><template v-if="l['@language']"> ({{ l['@language'] }})</template></template></v-flex>
        <v-flex>
          <v-layout column>
            <v-flex v-for="(l, i) in o['skos:prefLabel']" :key="'gplv'+i">{{ l['@value'] }}</v-flex>
            <template v-if="o['rdfs:label']">
              <v-flex class="grey--text" v-for="(l, i) in o['rdfs:label']" :key="'gl'+i">[{{ l['@value'] }}]</v-flex>
            </template>
          </v-layout>
        </v-flex>
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

