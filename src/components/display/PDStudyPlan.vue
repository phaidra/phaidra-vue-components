<template>
  <v-flex>
    <v-layout row wrap>
      <template v-for="(l, i) in o['skos:prefLabel']">
        <v-flex md4 xs12 class="pdlabel primary--text" :key="'pl'+i">{{ $t('Study plan') }}</v-flex>
        <v-flex md8 xs12 :key="'spl'+i">
          <v-layout column>
            <v-flex class="valuefield" >{{ l['@value'] }}</v-flex>
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

