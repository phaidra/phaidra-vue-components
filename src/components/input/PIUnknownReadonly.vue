<template>
  <v-layout>
    <v-flex>
      <v-flex class="primary--text" xs3>{{ label }}</v-flex>
      {{jsonld}}
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'p-i-unknown-readonly',
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