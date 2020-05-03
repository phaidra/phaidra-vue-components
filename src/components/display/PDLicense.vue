<template>
  <a v-if="hideLabel" :href="o" target="_blank">{{ getLocalizedTermLabel('alllicenses', o) }}</a>
  <v-row v-else>
    <v-col :md="labelColMd" cols="12" class="pdlabel primary--text text-md-right">{{ $t(p) }}</v-col>
    <v-col :md="valueColMd" cols="12">
      <a :href="o" target="_blank">{{ getLocalizedTermLabel('alllicenses', o) }}</a>
      <!--
        <v-img :src="'../../assets/' + getTermProperty('licenses', o, 'img')" :alt="o" class="license-icon"/>
      -->
    </v-col>
  </v-row>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'
import { displayproperties } from '../../mixins/displayproperties'

export default {
  name: 'p-d-license',
  mixins: [vocabulary, displayproperties],
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
