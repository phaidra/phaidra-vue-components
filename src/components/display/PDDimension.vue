<template>
  <v-col>
    <v-row  >
      <v-col md="4" cols="12" class="pdlabel primary--text">{{ $t(p) }}</v-col>
      <v-col md="8" cols="12"><span v-for="(v, i) in o['schema:value']" :key="'v'+i">{{ v }}</span> <span v-for="(v, i) in o['schema:unitCode']" :key="'u'+i">{{ getLocalizedTermLabel('uncefact', v) }}</span></v-col>
    </v-row>
  </v-col>
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
