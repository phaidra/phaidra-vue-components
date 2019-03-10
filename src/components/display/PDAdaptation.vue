<template>
  <v-layout row>
    <v-flex xs10>
      <v-card>
        <v-card-title class="subheading grey white--text">
          <span>{{ $t(p) }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <v-layout row>
            <template v-for="(title, j) in o['dce:title']">
              <template v-for="(mt, i) in title['bf:mainTitle']">
                <v-flex class="primary--text" xs3 :key="'mt'+j+i">{{ $t(title['@type']) }} ({{ mt['@language'] }})</v-flex>
                <v-layout column :key="'mtv'+i">
                  <v-flex xs9 >{{ mt['@value'] }}</v-flex>
                </v-layout>
                <template v-for="(st, i) in title['bf:subtitle']">
                  <v-flex xs9 :key="'stv'+i">{{ st['@value'] }}</v-flex>
                </template>
              </template>
            </template>
          </v-layout>
          <v-layout v-for="(obj, pred, i) in o" row :key="'role' + i">
            <template v-if="pred.startsWith('role')">
              <v-flex class="primary--text" xs3 >{{ getLocalizedTermLabel('rolepredicate', pred) }}</v-flex>
              <v-flex xs9 v-for="(n, i) in obj" :key="'adpname' + i">
                <v-layout column>
                  <v-flex>
                    <template v-for="(gn) in n['schema:givenName']">{{ gn['@value'] }}</template><template v-for="(fn) in n['schema:familyName']"> {{ fn['@value'] }}</template><template v-for="(fn) in n['schema:name']"> {{ fn['@value'] }}</template> <template v-if="n['schema:affiliation']" class="grey--text"><template v-for="(af) in n['schema:affiliation']"><template v-for="(afn) in af"> {{ afn['@value'] }}</template></template></template>
                  </v-flex>
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

