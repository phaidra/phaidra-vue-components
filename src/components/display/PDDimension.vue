<template>
  <v-flex>
    <v-layout row>
      <v-flex class="primary--text" xs3>{{ $t(p) }}</v-flex>
      <v-flex xs9><span v-for="(v, i) in o['schema:value']" :key="'v'+i">{{ v }}</span> <span v-for="(v, i) in o['schema:unitCode']" :key="'u'+i">{{ getLocalizedTermLabel('uncefact', v) }}</span></v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'

export default {
  name: 'p-d-dimension',
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

