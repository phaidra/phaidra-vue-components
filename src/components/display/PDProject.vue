<template>
  <v-col>
    <v-row  >
      <template v-for="(l, i) in o['skos:prefLabel']">
        <v-col md="4" cols="12" class="pdlabel primary--text" :key="'pl'+i">{{ $t('Project') }} ({{ l['@language'] }})</v-col>
        <v-col class="valuefield" md="8" cols="12" :key="'pv'+i" >{{ l['@value'] }}</v-col>
      </template>
    </v-row>
    <v-row  >
      <template v-for="(id, i) in o['skos:exactMatch']">
        <v-col md="4" cols="12" class="pdlabel primary--text" :key="'idl'+i">{{ $t('Project Id') }}</v-col>
        <v-col md="8" cols="12" :key="'idv'+i">{{ id }}</v-col>
      </template>
    </v-row>
    <v-row  >
      <template v-for="(d, i) in o['rdfs:comment']">
        <v-col md="4" cols="12" class="pdlabel primary--text" :key="'dl'+i">{{ $t('Project Description') }} ({{ d['@language'] }})</v-col>
        <v-col class="valuefield" md="8" cols="12" :key="'dv'+i">{{ d['@value'] }}</v-col>
      </template>
    </v-row>
    <v-row  >
      <template v-for="(hp, i) in o['foaf:homepage']">
        <v-col md="4" cols="12" class="pdlabel primary--text" :key="'hpl'+i">{{ $t('Project Homepage') }}</v-col>
        <v-col md="8" cols="12" :key="'hpv'+i">{{ hp }}</v-col>
      </template>
    </v-row>
  </v-col>
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
