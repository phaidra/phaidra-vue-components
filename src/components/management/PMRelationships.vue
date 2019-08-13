<template>
  <v-card >
    <v-card-title class="subheading grey white--text">{{ $t('Relationships') }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <v-flex>{{ $t('Here you can add or remove relationships to other objects inside this repository.') }}</v-flex>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'p-m-relationships',
  props: {
    pid: {
      type: String,
      required: true
    }
  },
  computed: {
    instance: function() {
      return this.$store.state.instanceconfig
    }
  },
  data () {
    return {
      loading: false
    }
  }
}
</script>
