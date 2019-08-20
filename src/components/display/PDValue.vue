<template>
  <v-col>
    <v-row  >
      <v-col md="4" cols="12" class="pdlabel primary--text">{{ $t(p) }}</v-col>
      <v-col md="8" cols="12">{{ o }}</v-col>
    </v-row>
  </v-col>
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
