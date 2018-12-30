<template>
  <v-flex>
    <v-layout row>
      <template v-for="(l, i) in o['skos:prefLabel']">
        <v-flex class="primary--text" xs3 :key="'pl'+i">{{ $t('Project') }} ({{ l['@language'] }})</v-flex>
        <v-flex xs9 :key="'pv'+i">{{ l['@value'] }}</v-flex>
      </template>
    </v-layout>
    <v-layout row>
      <template v-for="(id, i) in o['skos:exactMatch']">
        <v-flex class="primary--text" xs3 :key="'idl'+i">{{ $t('Project Id') }}</v-flex>
        <v-flex xs9 :key="'idv'+i">{{ id }}</v-flex>
      </template>
    </v-layout>
    <v-layout row>
      <template v-for="(d, i) in o['rdfs:comment']">
        <v-flex class="primary--text" xs3 :key="'dl'+i">{{ $t('Project Description') }} ({{ d['@language'] }})</v-flex>
        <v-flex xs9 :key="'dv'+i">{{ d['@value'] }}</v-flex>
      </template>
    </v-layout>
    <v-layout row>
      <template v-for="(hp, i) in o['foaf:homepage']">
        <v-flex class="primary--text" xs3 :key="'hpl'+i">{{ $t('Project Homepage') }}</v-flex>
        <v-flex xs9 :key="'hpv'+i">{{ hp }}</v-flex>
      </template>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'p-d-project',
  props: {
    o: {
      type: Object,
      required: true
    }
  }
}
</script>

