<template>
  <v-flex>
    <v-layout row>
      <v-flex class="primary--text" xs3>{{ $t(p) }}</v-flex>
      <v-flex xs9><span v-for="(v, i) in o['schema:value']" :key="'v'+i">{{ v }}</span> <span v-for="(v, i) in o['schema:unitCode']" :key="'v'+i">{{ getLocalizedTermLabel(v) }}</span></v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'p-d-dimension',
  props: {
    o: {
      type: Object,
      required: true
    },
    p: {
      type: String
    }
  },
  computed: {
    vocabularies: function () {
      return this.$store.state.vocabulary.vocabularies
    }
  },
  methods: {
    getLocalizedTermLabel: function (value) {
      this.$store.getters.getLocalizedTermLabel('un-cefact', value, this.$i18n.locale)      
    }
  }
}
</script>

