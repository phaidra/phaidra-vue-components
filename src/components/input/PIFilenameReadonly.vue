<template>
  <v-row >
    <v-col cols="8">
      <v-text-field
        :value="value"
        :label="$t('Filename')"
        readonly
        box
      ></v-text-field>
    </v-col>
  </v-row>
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
