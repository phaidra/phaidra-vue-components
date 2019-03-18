<template>
  <v-layout>
    <v-flex>
      <v-flex class="primary--text" xs3>{{ label }}</v-flex>
      <vue-json-pretty :data="jsonld"></vue-json-pretty>
    </v-flex>
  </v-layout>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'

export default {
  name: 'p-i-unknown-readonly',
  components: {
    VueJsonPretty
  },
  props: {
    jsonld: {
      type: Object
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>