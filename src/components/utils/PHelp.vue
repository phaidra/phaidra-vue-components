<template>
  <v-card>
    <v-card-title class="title font-weight-light grey white--text">{{ $t('Help') }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <iframe :src="url+'.html'" width="100%" height="500px" frameBorder="0"></iframe>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :href="url+'.pdf'" target="_blank">{{ $t('PDF version') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'p-help',
  props: {
    url: {
      type: String
    }
  },
  data () {
    return {
      loading: false
    }
  }
}
</script>
