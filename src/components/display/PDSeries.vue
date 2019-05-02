<template>
  <v-layout row wrap>
    <v-flex xs10>
      <v-card >
        <v-card-title class="subheading grey white--text">
          <span>{{ $t(p) }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <v-layout row wrap>
            <template v-for="(title, j) in o['dce:title']">
              <template v-for="(mt, i) in title['bf:mainTitle']">
                <v-flex md4 xs12 class="pdlabel primary--text" :key="'mt'+j+i">{{ $t(title['@type']) }}<template v-if="mt['@language']"> ({{ mt['@language'] }})</template></v-flex>
                <v-flex md8 xs12 :key="'mtv'+j+i">
                  <v-layout column>
                    <v-flex>{{ mt['@value'] }}</v-flex>
                  </v-layout>
                </v-flex>
              </template>
            </template>
          </v-layout>
          <v-layout row wrap>
            <template v-for="(volume, i) in o['bibo:volume']">
              <v-flex md4 xs12 class="pdlabel primary--text" :key="'vl'+i">{{ $t('Volume') }}</v-flex>
              <v-flex md8 xs12 :key="'v'+i">{{ volume }}</v-flex>
            </template>
          </v-layout>
          <v-layout row wrap>
            <template v-for="(issue, i) in o['bibo:issue']">
              <v-flex md4 xs12  class="pdlabel primary--text" :key="'il'+i">{{ $t('Issue') }}</v-flex>
              <v-flex md8 xs12 :key="'i'+i">{{ issue }}</v-flex>
            </template>
          </v-layout>
          <v-layout row wrap>
            <template v-for="(issn, i) in o['identifiers:issn']">
              <v-flex md4 xs12 class="pdlabel primary--text" :key="'isl'+i">{{ $t('ISSN') }}</v-flex>
              <v-flex md8 xs12 :key="'is'+i">{{ issn }}</v-flex>
            </template>
          </v-layout>
          <v-layout row wrap>
            <template v-for="(issued, i) in o['dcterms:issued']">
              <v-flex md4 xs12 class="pdlabel primary--text" :key="'idatel'+i">{{ $t('Issued') }}</v-flex>
              <v-flex md8 xs12 :key="'idate'+i">{{ issued }}</v-flex>
            </template>
          </v-layout>
          <v-layout row wrap>
            <template v-for="(id, i) in o['skos:exactMatch']">
              <v-flex md4 xs12 class="pdlabel primary--text" :key="'idatel'+i">{{ $t('Identifier') }}</v-flex>
              <v-flex md8 xs12 :key="'id'+i">{{ id }}</v-flex>
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

