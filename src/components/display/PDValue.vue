<template>
  <v-flex>
    <v-layout row wrap>
      <v-flex md4 xs12 class="pdlabel primary--text">{{ $t(p) }}</v-flex>
      <v-flex md8 xs12>{{ o }}</v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'p-d-value',
  props: {
    o: {
      type: String,
      required: true
    },
    p: {
      type: String
    }
  }
}
</script>

