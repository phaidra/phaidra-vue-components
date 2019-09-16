<template>
  <v-row>
    <v-col md="2" cols="12" class="pdlabel primary--text text-right">{{ $t(p) }}</v-col>
    <v-col md="10" cols="12"><a :href="o" target="_blank">{{ o }}</a></v-col>
  </v-row>
</template>

<script>
export default {
  name: 'p-d-identifier',
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
