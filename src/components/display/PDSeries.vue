<template>
  <v-row>
    <v-col md="2" cols="12" class="pdlabel primary--text text-right">{{ $t(p) }}</v-col>
    <v-col md="10" cols="12" >
      <v-card flat>
        <v-card-text class="border-left">
            <v-row>
              <template v-for="(title, j) in o['dce:title']">
                <template v-for="(mt, i) in title['bf:mainTitle']">
                  <v-col md="2" cols="12" class="pdlabel primary--text" :key="'mt'+j+i">{{ $t(title['@type']) }}<template v-if="mt['@language']"> ({{ mt['@language'] }})</template></v-col>
                  <v-col md="10" cols="12" :key="'mtv'+j+i" class="valuefield">{{ mt['@value'] }}</v-col>
                </template>
              </template>
            </v-row>
            <v-row>
              <template v-for="(volume, i) in o['bibo:volume']">
                <v-col md="2" cols="12" class="pdlabel primary--text" :key="'vl'+i">{{ $t('Volume') }}</v-col>
                <v-col md="10" cols="12" class="valuefield" :key="'v'+i">{{ volume }}</v-col>
              </template>
            </v-row>
            <v-row>
              <template v-for="(issue, i) in o['bibo:issue']">
                <v-col md="2" cols="12" class="pdlabel primary--text" :key="'il'+i">{{ $t('Issue') }}</v-col>
                <v-col md="10" cols="12" class="valuefield" :key="'i'+i">{{ issue }}</v-col>
              </template>
            </v-row>
            <v-row>
              <template v-for="(issn, i) in o['identifiers:issn']">
                <v-col md="2" cols="12" class="pdlabel primary--text" :key="'isl'+i">{{ $t('ISSN') }}</v-col>
                <v-col md="10" cols="12" class="valuefield" :key="'is'+i">{{ issn }}</v-col>
              </template>
            </v-row>
            <v-row>
              <template v-for="(issued, i) in o['dcterms:issued']">
                <v-col md="2" cols="12" class="pdlabel primary--text" :key="'idatel'+i">{{ $t('Issued') }}</v-col>
                <v-col md="10" cols="12" class="valuefield" :key="'idate'+i">{{ issued }}</v-col>
              </template>
            </v-row>
            <v-row>
              <template v-for="(id, i) in o['skos:exactMatch']">
                <v-col md="2" cols="12" class="pdlabel primary--text" :key="'idatel'+i">{{ $t('Identifier') }}</v-col>
                <v-col md="10" cols="12" :key="'id'+i">{{ id }}</v-col>
              </template>
            </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
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
