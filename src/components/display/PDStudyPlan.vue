<template>
  <v-flex>
    <v-layout row>
      <template v-for="(l, i) in o['skos:prefLabel']">
        <v-flex class="primary--text" xs3 :key="'pl'+i">{{ $t('Study plan') }}</v-flex>
        <v-flex :key="'spl'+i">
          <v-layout column>
            <v-flex >{{ l['@value'] }}</v-flex>
            <template v-for="(id, i) in o['skos:notation']">
              <v-flex class="grey--text"  xs4 :key="'notation'+i">[{{ id }}]</v-flex>
            </template>
          </v-layout>
        </v-flex>
        
      </template>
    </v-layout>

  </v-flex>
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

