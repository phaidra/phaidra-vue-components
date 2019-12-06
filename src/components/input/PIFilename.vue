<template>
  <v-row >
    <v-col cols="8">
      <v-text-field
        :value="value"
        :label="$t('Filename')"
        v-on:blur="$emit('input-value',$event.target.value)"
        filled
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script>

export default {
  name: 'p-i-filename',
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
