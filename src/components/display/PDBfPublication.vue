<template>
  <v-card>
    <v-card-title class="title font-weight-light grey white--text">
      <span>{{ $t(p) }}</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <v-row>
        <template v-for="(publisher, i) in o['bf:agent']">
          <template v-if="localizedOrgUnit(publisher)">
            <v-col :key="'publnamel'+i" md="2" cols="12" class="pdlabel primary--text text-right">{{ $t('PUBLISHER_VERLAG') }} ({{ localizedOrgUnit(publisher).language }})</v-col>
            <v-col :key="'publname'+i" md="10" cols="12"><a class="valuefield" :href="localizedOrgUnit(publisher).id" target="_blank">{{ localizedOrgUnit(publisher).value }}</a></v-col>
          </template>
          <template v-else v-for="(publishername, i) in publisher['schema:name']">
            <v-col :key="'publnamel'+i" md="2" cols="12" class="pdlabel primary--text text-right">{{ $t('PUBLISHER_VERLAG') }}<template v-if="publishername['@language']"> ({{ publishername['@language'] }})</template></v-col>
            <v-col :key="'publname'+i" class="valuefield" md="10" cols="12">{{ publishername['@value'] }}</v-col>
          </template>
        </template>
      </v-row>
      <v-row>
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
  },
  methods: {
    localizedOrgUnit: function (orgUnit) {
      if (orgUnit['skos:exactMatch']) {
        for (let name of orgUnit['schema:name']) {
          if (name['@language'] === this.$i18n.locale) {
            return {
              value: name['@value'],
              language: name['@language'],
              id: name['skos:exactMatch']
            }
          }
        }
        return {
          name: orgUnit['schema:name'][0]['@value'],
          language: orgUnit['schema:name'][0]['@language'],
          id: orgUnit['schema:name'][0]['skos:exactMatch']
        }
      }
      return null
    }
  }
}
</script>
