<template>
  <v-row >
    <v-col cols="8">
      <v-file-input filled show-size @change="$emit('input-file', $event)" :label="label"></v-file-input>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'p-i-file',
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
