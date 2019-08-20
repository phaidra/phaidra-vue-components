<template>
  <v-row >
    <v-col cols="10">
      <v-card>
        <v-card-title class="subheading grey white--text">
          <span>{{ $t(p) }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <v-row  >
            <template v-for="(publisher, j) in o['bf:agent']">
              <template v-for="(publishername, i) in publisher['schema:name']">
                <v-col md="4" cols="12" class="pdlabel primary--text" :key="'publnamel'+j+i">{{ $t('ORG_PUBLISHER') }}</v-col>
                <v-col md="8" cols="12" :key="'publname'+j+i">
                  <v-row>
                    <v-col class="valuefield">{{ publishername['@value'] }}</v-col>
                  </v-row>
                </v-col>
              </template>
            </template>
          </v-row>
          <v-row  >
            <template v-for="(publishingplace, j) in o['bf:place']">
              <template v-for="(place, i) in publishingplace['skos:prefLabel']">
                <v-col md="4" cols="12" class="pdlabel primary--text" :key="'publplacel'+j+i">{{ $t('Place') }}</v-col>
                <v-col md="8" cols="12" :key="'publplace'+j+i">
                  <v-row>
                    <v-col class="valuefield">{{ place['@value'] }}</v-col>
                  </v-row>
                </v-col>
              </template>
            </template>
          </v-row>
          <v-row  >
            <template v-for="(publishingdate, j) in o['bf:date']">
              <v-col md="4" cols="12" class="pdlabel primary--text" :key="'publdatel'+j">{{ $t('Date') }}</v-col>
              <v-col md="8" cols="12" :key="'publdate'+j">
                <v-row>
                  <v-col>{{ publishingdate }}</v-col>
                </v-row>
              </v-col>
            </template>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
