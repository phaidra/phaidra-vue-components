<template>
  <v-col>
    <v-row  >
      <template v-for="(l, i) in o['skos:prefLabel']">
        <v-col md="4" cols="12" class="pdlabel primary--text" :key="'pl'+i">{{ $t('Study plan') }}</v-col>
        <v-col md="8" cols="12" :key="'spl'+i">
          <v-row>
            <v-col class="valuefield" >{{ l['@value'] }}</v-col>
            <template v-for="(id, i) in o['skos:notation']">
              <v-col class="grey--text"  cols="4" :key="'notation'+i">[{{ id }}]</v-col>
            </template>
          </v-row>
        </v-col>

      </template>
    </v-row>

  </v-col>
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
