<template>
  <v-row>
    <v-col md="2" cols="12" class="pdlabel primary--text text-right">{{ $t(p) }}</v-col>
    <v-col md="10" cols="12">
      <v-card flat>
        <v-card-text class="border-left">
          <v-container>
            <v-row>
              <template v-for="(title, j) in o['dce:title']">
                <template v-for="(mt, i) in title['bf:mainTitle']">
                  <v-col md="2" cols="12" class="pdlabel primary--text" :key="'mt'+j+i">{{ $t(title['@type']) }}<template v-if="mt['@language']"> ({{ mt['@language'] }})</template></v-col>
                  <v-col md="10" cols="12" :key="'mtv'+i">
                    <v-row no-gutters class="valuefield">{{ mt['@value'] }}</v-row>
                    <template v-for="(st, i) in title['bf:subtitle']">
                      <v-row no-gutters class="valuefield" :key="'stv'+i">{{ st['@value'] }}</v-row>
                    </template>
                  </v-col>
                </template>
              </template>
            </v-row>
            <v-row v-for="(obj, pred, i) in o" :key="'role' + i">
              <template v-if="pred.startsWith('role')">
                <v-col md="2" cols="12" class="pdlabel primary--text ">{{ getLocalizedTermLabel('rolepredicate', pred) }}</v-col>
                <v-col md="10" cols="12">
                  <v-row no-gutters v-for="(n, i) in obj" :key="'adpname' + i">
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
            <v-row v-for="(series, k) in o['rdau:P60193']" :key="'series'+k">
              <v-col md="2" cols="12" class="pdlabel primary--text">{{ $t('rdau:P60101_rdau:P60193') }}</v-col>
              <v-col md="10" cols="12">
                <v-card flat>
                  <v-card-text class="border-left">
                    <v-container>
                      <v-row :key="'stit'+k">
                        <template v-for="(title, j) in series['dce:title']">
                          <template v-for="(mt, i) in title['bf:mainTitle']">
                            <v-col md="2" cols="12" class="pdlabel primary--text" :key="'mt'+j+i">{{ $t(title['@type']) }}<template v-if="mt['@language']"> ({{ mt['@language'] }})</template></v-col>
                            <v-col md="10" cols="12" :key="'mtv'+j+i" class="valuefield">{{ mt['@value'] }}</v-col>
                          </template>
                        </template>
                      </v-row>
                      <v-row :key="'svol'+k">
                        <template v-for="(volume, i) in series['bibo:volume']">
                          <v-col md="2" cols="12" class="pdlabel primary--text" :key="'vl'+i">{{ $t('Volume') }}</v-col>
                          <v-col md="10" cols="12" class="valuefield" :key="'v'+i">{{ volume }}</v-col>
                        </template>
                      </v-row>
                      <v-row :key="'sissue'+k">
                        <template v-for="(issue, i) in series['bibo:issue']">
                          <v-col md="2" cols="12"  class="pdlabel primary--text" :key="'il'+i">{{ $t('Issue') }}</v-col>
                          <v-col md="10" cols="12" class="valuefield" :key="'i'+i">{{ issue }}</v-col>
                        </template>
                      </v-row>
                      <v-row :key="'sissued'+k">
                        <template v-for="(issued, i) in series['dcterms:issued']">
                          <v-col md="2" cols="12" class="pdlabel primary--text" :key="'idatel'+i">{{ $t('Issued') }}</v-col>
                          <v-col md="10" cols="12" class="valuefield" :key="'idate'+i">{{ issued }}</v-col>
                        </template>
                      </v-row>
                      <v-row :key="'sissn'+k">
                        <template v-for="(issn, i) in series['identifiers:issn']">
                          <v-col md="2" cols="12" class="pdlabel primary--text" :key="'isl'+i">{{ $t('ISSN') }}</v-col>
                          <v-col md="10" cols="12" class="valuefield" :key="'is'+i">{{ issn }}</v-col>
                        </template>
                      </v-row>
                      <v-row :key="'sid'+k">
                        <template v-for="(id, i) in series['skos:exactMatch']">
                          <v-col md="2" cols="12" class="pdlabel primary--text" :key="'idatel'+i">{{ $t('Identifier') }}</v-col>
                          <v-col md="10" cols="12" :key="'id'+i">{{ id }}</v-col>
                        </template>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
