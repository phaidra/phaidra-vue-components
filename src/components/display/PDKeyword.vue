<template>
  <v-row>
    <v-col :md="labelColMd" cols="12" class="pdlabel primary--text text-right" >{{ $t(p) }}<template v-if="language"> ({{ language }})</template></v-col>
    <v-col :md="valueColMd" cols="12">
      <v-chip v-for="(kw, i) in keywords" class="ma-1">{{kw}}</v-chip>
    </v-col>
  </v-row>
</template>

<script>
import { displayproperties } from '../../mixins/displayproperties'

export default {
  name: 'p-d-keyword',
  mixins: [displayproperties],
  props: {
    language: {
      type: String
    },
    keywords: {
      type: Array,
      required: true
    },
    p: {
      type: String
    }
  }
}
</script>
