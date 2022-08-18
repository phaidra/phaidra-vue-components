<template>
  <v-card class="my-8">
    <v-card-title class="title font-weight-light grey white--text">{{ $t('Help') }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <router-link color="primary" :to="'/metadata-fields-help'" target="_blank">{{ $t('Metadata fields overview') }}</router-link>
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
  computed: {
    instanceconfig: function () {
      return this.$root.$store.state.instanceconfig
    }
  },
  data () {
    return {
      loading: false
    }
  }
}
</script>
