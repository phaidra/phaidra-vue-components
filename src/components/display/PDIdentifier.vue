<template>
  <v-row>
    <v-col :md="labelColMd" cols="12" class="pdlabel primary--text text-md-right">{{ $t(p) }}</v-col>
    <v-col :md="valueColMd" cols="12"><a :href="getIDResolverURL(o)" target="_blank">{{ o['@value'] }}</a></v-col>
  </v-row>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'
import { displayproperties } from '../../mixins/displayproperties'

export default {
  name: 'p-d-identifier',
  mixins: [vocabulary, displayproperties],
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
