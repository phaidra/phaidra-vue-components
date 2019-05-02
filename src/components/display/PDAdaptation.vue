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
            <template v-for="(title, j) in o['dce:title']">
              <template v-for="(mt, i) in title['bf:mainTitle']">
                <v-flex md3 xs12 class="pdlabel primary--text" :key="'mt'+j+i">{{ $t(title['@type']) }}<template v-if="mt['@language']"> ({{ mt['@language'] }})</template></v-flex>
                <v-flex md9 xs12 :key="'mtv'+i">
                  <v-layout column>
                    <v-flex>{{ mt['@value'] }}</v-flex>
                    <template v-for="(st, i) in title['bf:subtitle']">
                      <v-flex :key="'stv'+i">{{ st['@value'] }}</v-flex>
                    </template>
                  </v-layout>
                </v-flex>
              </template>
            </template>
          </v-layout>
          <v-layout v-for="(obj, pred, i) in o" :key="'role' + i" row wrap>
            <template v-if="pred.startsWith('role')">
              <v-flex md3 xs12 class="pdlabel primary--text">{{ getLocalizedTermLabel('rolepredicate', pred) }}</v-flex>
              <v-flex md9 xs12 v-for="(n, i) in obj" :key="'adpname' + i">
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

