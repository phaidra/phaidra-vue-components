<template>
  <v-card >
    <v-card-title class="title font-weight-light grey white--text">{{ $t('Access rights') }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <v-col>{{ $t('Here you can restrict access to this object. Any other objects, like members (if this is a container or a collection), pages (if this is a book) different versions or related objects will not be affected.') }}</v-col>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'p-m-rights',
  props: {
    pid: {
      type: String,
      required: true
    }
  },
  computed: {
    instance: function () {
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
