<template>
  <a v-if="hideLabel" :href="o" target="_blank">{{ getLocalizedTermLabel('licenses', o) }}</a>
  <v-row v-else>
    <v-col md="4" cols="12" class="pdlabel primary--text">{{ $t(p) }}</v-col>
    <v-col md="8" cols="12">
      <a :href="o" target="_blank">{{ getLocalizedTermLabel('licenses', o) }}</a>
      <!--
        <v-img :src="'../../assets/' + getTermProperty('licenses', o, 'img')" :alt="o" class="license-icon"/>
      -->
    </v-col>
  </v-row>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'

export default {
  name: 'p-d-license',
  mixins: [vocabulary],
  props: {
    o: {
      type: String,
      required: true
    },
    p: {
      type: String
    },
    hideLabel: Boolean
  }
}
</script>

<style scoped>

.license-icon {
  height: 1.3em;
  vertical-align: text-bottom;
}

.license-label {
  vertical-align: middle;
}

</style>
