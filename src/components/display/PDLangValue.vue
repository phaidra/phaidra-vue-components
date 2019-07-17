<template>
  <v-flex>
    <v-layout row wrap>
      <v-flex md4 xs12 class="pdlabel primary--text" xs3>{{ $t(p) }}<template v-if="o['@language']"> ({{ o['@language'] }})</template></v-flex>
      <v-flex class="valuefield" md8 xs12>{{ o['@value'] }}</v-flex>
    </v-layout>
  </v-flex>
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

