<template>
  <div>
    Search component
  </div>
</template>

<script>
export default {
  name: 'p-search',
  methods: {
  },
  props: {
    label: {
      type: String,
      required: false
    },
  },
  data () {
    return {
      loading: false
    }
  },
  mounted: function () {
    console.log('mounted')
  }
}
</script>

<style scoped>
</style>
