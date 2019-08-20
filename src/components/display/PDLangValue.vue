<template>
  <v-col>
    <v-row  >
      <v-col md="4" cols="12" class="pdlabel primary--text">{{ $t(p) }}<template v-if="o['@language']"> ({{ o['@language'] }})</template></v-col>
      <v-col class="valuefield" md="8" cols="12">{{ o['@value'] }}</v-col>
    </v-row>
  </v-col>
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
