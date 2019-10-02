<template>
  <v-row>
    <v-col md="2" cols="12" class="pdlabel primary--text text-right">{{ $t(p) }}</v-col>
    <v-col md="10" cols="12"><a :href="o['@value']" target="_blank">{{ o['@value'] }}</a></v-col>
  </v-row>
</template>

<script>
export default {
  name: 'p-d-identifier',
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
