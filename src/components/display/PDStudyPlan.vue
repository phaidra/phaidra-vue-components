<template>
  <v-row>
    <template v-for="(l, i) in o['skos:prefLabel']">
      <v-col md="2" cols="12" class="pdlabel primary--text text-right" :key="'pl'+i">{{ $t('Study plan') }}</v-col>
      <v-col md="10" cols="12" :key="'spl'+i">
        <v-row class="valuefield" >{{ l['@value'] }}</v-row>
        <template v-for="(id, i) in o['skos:notation']">
          <v-row class="grey--text cols"  :key="'notation'+i">[{{ id }}]</v-row>
        </template>
      </v-col>
    </template>
  </v-row>
</template>

<script>
export default {
  name: 'p-d-study-plan',
  props: {
    o: {
      type: Object,
      required: true
    }
  }
}
</script>
