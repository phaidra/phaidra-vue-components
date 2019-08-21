<template>
  <v-card>
    <v-card-title class="title font-weight-light grey white--text">
      <span>{{ $t(p) }}</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <v-row>
        <template v-for="(title, j) in o['dce:title']">
          <template v-for="(mt, i) in title['bf:mainTitle']">
            <v-col md="2" cols="12" class="pdlabel primary--text text-right" :key="'mt'+j+i">{{ $t(title['@type']) }}<template v-if="mt['@language']"> ({{ mt['@language'] }})</template></v-col>
            <v-col md="10" cols="12" :key="'mtv'+i">
              <v-row class="valuefield">{{ mt['@value'] }}</v-row>
              <template v-for="(st, i) in title['bf:subtitle']">
                <v-row class="valuefield" :key="'stv'+i">{{ st['@value'] }}</v-row>
              </template>
            </v-col>
          </template>
        </template>
      </v-row>
      <v-row v-for="(obj, pred, i) in o" :key="'role' + i">
        <template v-if="pred.startsWith('role')">
          <v-col md="2" cols="12" class="pdlabel primary--text text-right">{{ getLocalizedTermLabel('rolepredicate', pred) }}</v-col>
          <v-col md="10" cols="12" v-for="(n, i) in obj" :key="'adpname' + i">
            <v-row>
              <template class="valuefield" v-for="(gn) in n['schema:givenName']">{{ gn['@value'] }}</template>
              <template class="valuefield" v-for="(fn) in n['schema:familyName']"> {{ fn['@value'] }}</template>
              <template class="valuefield" v-for="(fn) in n['schema:name']"> {{ fn['@value'] }}</template> 
              <template v-if="n['schema:affiliation']" class="grey--text">
                <template v-for="(af) in n['schema:affiliation']">
                  <template class="valuefield" v-for="(afn) in af"> {{ afn['@value'] }}</template>
                </template>
              </template>
            </v-row>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'

export default {
  name: 'p-d-series',
  mixins: [vocabulary],
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
