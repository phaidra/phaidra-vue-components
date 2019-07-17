<template>
  <v-layout row>
    <v-flex xs10>
      <v-card>
        <v-card-title class="subheading grey white--text">
          <span>{{ $t(p) }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <v-layout row wrap>
            <template v-for="(publisher, j) in o['bf:agent']">
              <template v-for="(publishername, i) in publisher['schema:name']">
                <v-flex md4 xs12 class="pdlabel primary--text" :key="'publnamel'+j+i">{{ $t('ORG_PUBLISHER') }}</v-flex>
                <v-flex md8 xs12 :key="'publname'+j+i">
                  <v-layout column>
                    <v-flex class="valuefield">{{ publishername['@value'] }}</v-flex>
                  </v-layout>
                </v-flex>
              </template>
            </template>
          </v-layout>
          <v-layout row wrap>
            <template v-for="(publishingplace, j) in o['bf:place']">
              <template v-for="(place, i) in publishingplace['skos:prefLabel']">
                <v-flex md4 xs12 class="pdlabel primary--text" :key="'publplacel'+j+i">{{ $t('Place') }}</v-flex>
                <v-flex md8 xs12 :key="'publplace'+j+i">
                  <v-layout column>
                    <v-flex class="valuefield">{{ place['@value'] }}</v-flex>
                  </v-layout>
                </v-flex>
              </template>
            </template>
          </v-layout>
          <v-layout row wrap>
            <template v-for="(publishingdate, j) in o['bf:date']">
              <v-flex md4 xs12 class="pdlabel primary--text" :key="'publdatel'+j">{{ $t('Date') }}</v-flex>
              <v-flex md8 xs12 :key="'publdate'+j">
                <v-layout column>
                  <v-flex>{{ publishingdate }}</v-flex>
                </v-layout>
              </v-flex>
            </template>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
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

