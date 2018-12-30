<template>
  <v-flex>
    <v-layout row>
      <template v-for="(l, i) in o['skos:prefLabel']">
        <v-flex class="primary--text" xs3 :key="'fl'+i">{{ $t('Funder') }} ({{ l['@language'] }})</v-flex>
        <v-flex xs9 :key="'fv'+i">{{ l['@value'] }}</v-flex>
      </template>
    </v-layout>
    <v-layout row>
      <template v-for="(id, i) in o['skos:exactMatch']">
        <v-flex class="primary--text" xs3 :key="'idl'+i">{{ $t('Funder Id') }}</v-flex>
        <v-flex xs9 :key="'idv'+i">{{ id }}</v-flex>
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

