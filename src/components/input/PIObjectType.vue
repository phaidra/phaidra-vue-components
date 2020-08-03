<template>
  <div>
    <v-alert :value="errorMessages.length > 0" dismissible type="error" transition="slide-y-transition">
      <span v-for="(em, i) in errorMessages" :key="'em'+i">{{ em }}<br/></span>
    </v-alert>
    <v-row no-gutters>
      <v-col cols="12" md="3" v-for="(term, i) in terms" :key="'ot'+i">
        <v-checkbox class="mt-0 check" v-model="selected" @click.capture="$emit('input', selected)" :label="getLocalizedTermLabel(vocabulary, term['@id'])" :value="term['@id']"></v-checkbox>
        <v-spacer></v-spacer>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'

export default {
  name: 'p-i-object-type',
  mixins: [vocabulary],
  props: {
    label: {
      type: String,
      required: true
    },
    vocabulary: {
      type: String,
      required: true
    },
    resourceType: {
      type: String
    },
    errorMessages: {
      type: Array
    }
  },
  watch: {
    resourceType (val) {
      this.selected = []
    }
  },
  computed: {
    terms: function () {
      return this.resourceType ? this.$store.getters.getObjectTypeForResourceType(this.resourceType) : this.vocabularies[this.vocabulary].terms
    }
  },
  data () {
    return {
      selected: []
    }
  },
  mounted: function () {
    this.$store.getters.getObjectTypeForResourceType(this.resourceType)
  }
}
</script>

<style scoped>
.check {
  min-width: 220px;
}
</style>
