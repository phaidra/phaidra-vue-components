<template>
  <v-row>
    <v-col>
      <v-col class="primary--text" cols="3">{{ label }}</v-col>
      {{jsonld}}
    </v-col>
  </v-row>
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
