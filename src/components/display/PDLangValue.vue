<template>
  <v-row>
    <v-col md="2" cols="12" class="pdlabel primary--text text-right">{{ $t(p) }}<template v-if="o['@language']"> ({{ o['@language'] }})</template></v-col>
    <v-col class="valuefield" md="10" cols="12">{{ o['@value'] }}</v-col>
  </v-row>
</template>

<script>
export default {
  name: 'p-d-lang-value',
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
