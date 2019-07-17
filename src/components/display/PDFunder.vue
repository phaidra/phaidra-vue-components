<template>
  <v-flex>
    <v-layout row wrap>
      <template v-for="(l, i) in o['skos:prefLabel']">
        <v-flex class="pdlabel primary--text" md4 xs12 :key="'fl'+i">{{ $t('Funder') }} ({{ l['@language'] }})</v-flex>
        <v-flex class="valuefield" md8 xs12 :key="'fv'+i">{{ l['@value'] }}</v-flex>
      </template>
    </v-layout>
    <v-layout row wrap>
      <template v-for="(id, i) in o['skos:exactMatch']">
        <v-flex class="pdlabel primary--text" md4 xs12 :key="'idl'+i">{{ $t('Funder Id') }}</v-flex>
        <v-flex md8 xs12 :key="'idv'+i">{{ id }}</v-flex>
      </template>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'p-d-funder',
  props: {
    o: {
      type: Object,
      required: true
    }
  }
}
</script>

