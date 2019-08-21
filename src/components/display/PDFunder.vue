<template>
  <span>
    <v-row>
      <template v-for="(l, i) in o['skos:prefLabel']">
        <v-col class="pdlabel primary--text text-right" md="2" cols="12" :key="'fl'+i">{{ $t('Funder') }} ({{ l['@language'] }})</v-col>
        <v-col class="valuefield" md="10" cols="12" :key="'fv'+i">{{ l['@value'] }}</v-col>
      </template>
    </v-row>
    <v-row>
      <template v-for="(id, i) in o['skos:exactMatch']">
        <v-col class="pdlabel primary--text text-right" md="2" cols="12" :key="'idl'+i">{{ $t('Funder Id') }}</v-col>
        <v-col md="10" cols="12" :key="'idv'+i">{{ id }}</v-col>
      </template>
    </v-row>
  </span>
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
