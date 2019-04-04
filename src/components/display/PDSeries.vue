<template>
  <v-layout row>
    <v-flex xs10>
      <v-card >
        <v-card-title class="subheading grey white--text">
          <span>{{ $t(p) }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <v-layout row>
            <template v-for="(title, j) in o['dce:title']">
              <template v-for="(mt, i) in title['bf:mainTitle']">
                <v-flex class="primary--text" xs3 :key="'mt'+j+i">{{ $t(title['@type']) }}<template v-if="mt['@language']"> ({{ mt['@language'] }})</template></v-flex>
                <v-flex :key="'mtv'+j+i">
                  <v-layout column>
                    <v-flex xs9 >{{ mt['@value'] }}</v-flex>
                  </v-layout>
                </v-flex>
              </template>
            </template>
          </v-layout>
          <v-layout row>
            <template v-for="(volume, i) in o['bibo:volume']">
              <v-flex class="primary--text" xs3 :key="'vl'+i">{{ $t('Volume') }}</v-flex>
              <v-flex xs9 :key="'v'+i">{{ volume }}</v-flex>
            </template>
          </v-layout>
          <v-layout row>
            <template v-for="(issue, i) in o['bibo:issue']">
              <v-flex class="primary--text" xs3 :key="'il'+i">{{ $t('Issue') }}</v-flex>
              <v-flex xs9 :key="'i'+i">{{ issue }}</v-flex>
            </template>
          </v-layout>
          <v-layout row>
            <template v-for="(issn, i) in o['identifiers:issn']">
              <v-flex class="primary--text" xs3 :key="'isl'+i">{{ $t('ISSN') }}</v-flex>
              <v-flex xs9 :key="'is'+i">{{ issn }}</v-flex>
            </template>
          </v-layout>
          <v-layout row>
            <template v-for="(issued, i) in o['dcterms:issued']">
              <v-flex class="primary--text" xs3 :key="'idatel'+i">{{ $t('Issued') }}</v-flex>
              <v-flex xs9 :key="'idate'+i">{{ issued }}</v-flex>
            </template>
          </v-layout>
          <v-layout row>
            <template v-for="(id, i) in o['skos:exactMatch']">
              <v-flex class="primary--text" xs3 :key="'idatel'+i">{{ $t('Identifier') }}</v-flex>
              <v-flex xs9 :key="'id'+i">{{ id }}</v-flex>
            </template>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'p-d-series',
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

