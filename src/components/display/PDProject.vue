<template>
  <v-flex>
    <v-layout row wrap>
      <template v-for="(l, i) in o['skos:prefLabel']">
        <v-flex md4 xs12 class="pdlabel primary--text" :key="'pl'+i">{{ $t('Project') }} ({{ l['@language'] }})</v-flex>
        <v-flex md8 xs12 :key="'pv'+i">{{ l['@value'] }}</v-flex>
      </template>
    </v-layout>
    <v-layout row wrap>
      <template v-for="(id, i) in o['skos:exactMatch']">
        <v-flex md4 xs12 class="pdlabel primary--text" :key="'idl'+i">{{ $t('Project Id') }}</v-flex>
        <v-flex md8 xs12 :key="'idv'+i">{{ id }}</v-flex>
      </template>
    </v-layout>
    <v-layout row wrap>
      <template v-for="(d, i) in o['rdfs:comment']">
        <v-flex md4 xs12 class="pdlabel primary--text" :key="'dl'+i">{{ $t('Project Description') }} ({{ d['@language'] }})</v-flex>
        <v-flex md8 xs12 :key="'dv'+i">{{ d['@value'] }}</v-flex>
      </template>
    </v-layout>
    <v-layout row wrap>
      <template v-for="(hp, i) in o['foaf:homepage']">
        <v-flex md4 xs12 class="pdlabel primary--text" :key="'hpl'+i">{{ $t('Project Homepage') }}</v-flex>
        <v-flex md8 xs12 :key="'hpv'+i">{{ hp }}</v-flex>
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
    },
    p: {
      type: String
    }
  }
}
</script>

