<template>
  <v-row>
    <v-col md="2" cols="12" class="pdlabel primary--text text-right">{{ $t(p) }}</v-col>
    <v-col md="10" cols="12"><span v-for="(v, i) in o['schema:value']" :key="'v'+i">{{ v }}</span> <span v-for="(v, i) in o['schema:unitCode']" :key="'u'+i">{{ getLocalizedTermLabel('uncefact', v) }}</span></v-col>
  </v-row>
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
