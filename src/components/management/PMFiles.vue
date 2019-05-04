<template>
  <v-card >
    <v-card-title class="subheading grey white--text">{{ $t('Files') }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <v-flex>{{ $t('Here you can add or remove some of the files this digital object is composed of.') }}</v-flex>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'p-m-files',
  props: {
    pid: {
      type: String,
      required: true
    }
  },
  computed: {
    instance: function() {
      return this.$store.state.settings.instance
    }
  },
  data () {
    return {
      loading: false
    }
  }
}
</script>
