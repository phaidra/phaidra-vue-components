<template>
  <v-card>
    <v-card-title class="title font-weight-light grey white--text">{{ $t('Help') }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <iframe :src="url" width="100%" height="500px" frameBorder="0"></iframe>
    </v-card-text>
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

