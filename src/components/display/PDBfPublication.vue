<template>
  <v-card>
    <v-card-title class="title font-weight-light grey white--text">
      <span>{{ $t(p) }}</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <v-row  >
        <template v-for="(publisher, j) in o['bf:agent']">
          <template v-for="(publishername, i) in publisher['schema:name']">
            <v-col md="2" cols="12" class="pdlabel primary--text text-right" :key="'publnamel'+j+i">{{ $t('PUBLISHER_VERLAG') }}</v-col>
            <v-col md="10" cols="12" :key="'publname'+j+i">
              <span class="valuefield">{{ publishername['@value'] }}</span>
            </v-col>
          </template>
        </template>
      </v-row>
      <v-row  >
        <template v-for="(publishingplace, j) in o['bf:place']">
          <template v-for="(place, i) in publishingplace['skos:prefLabel']">
            <v-col md="2" cols="12" class="pdlabel primary--text text-right" :key="'publplacel'+j+i">{{ $t('Place') }}</v-col>
            <v-col md="10" cols="12" :key="'publplace'+j+i">
              <span class="valuefield">{{ place['@value'] }}</span>
            </v-col>
          </template>
        </template>
      </v-row>
      <v-row>
        <template v-for="(publishingdate, j) in o['bf:date']">
          <v-col md="2" cols="12" class="pdlabel primary--text text-right" :key="'publdatel'+j">{{ $t('Date') }}</v-col>
          <v-col md="10" cols="12" :key="'publdate'+j">
            <span>{{ publishingdate }}</span>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'p-d-bf-publication',
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
