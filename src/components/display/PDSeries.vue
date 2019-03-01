<template>
  <v-layout row>
    <v-flex xs10>

      <v-card >
        <v-card-title class="headline grey--text">
            <span>{{ $t(label) }}</span>
            <v-spacer></v-spacer>
            <v-menu open-on-hover bottom offset-y v-if="actions.length">
              <v-btn slot="activator" icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
                  <v-list-tile-title>{{ action.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <v-layout row>
            <template v-for="(title, j) in o['dce:title']">
              <template v-for="(mt, i) in title['bf:mainTitle']">
                <v-flex class="primary--text" xs3 :key="'mt'+j+i">{{ $t(title['@type']) }} ({{ mt['@language'] }})</v-flex>
                <v-layout column :key="'mtv'+i">
                  <v-flex xs9 >{{ mt['@value'] }}</v-flex>
                  <template v-for="(st, i) in title['bf:subtitle']">
                    <v-flex xs9 :key="'stv'+i">{{ st['@value'] }} ({{ st['@language'] }})</v-flex>
                  </template>
                </v-layout>
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
    }
  }
}
</script>

