<template>
  <v-layout row>
    <v-flex xs8>
      <v-text-field
        :value="value"
        :label="$t('Filename')"
        readonly
        box
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>
<script>

export default {
  name: 'p-i-filename-readonly',
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>