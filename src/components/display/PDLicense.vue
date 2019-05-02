<template>
  <v-flex>
    <v-layout row wrap>
      <v-flex md3 xs12 class="pdlabel primary--text">{{ $t(p) }}</v-flex>
      <v-flex md9 xs12>
        <a :href="o" target="_blank">{{ getLocalizedTermLabel('licenses', o) }}</a>
        <!--
        <v-flex>
          <v-img :src="'../../assets/' + getTermProperty('licenses', o, 'img')" :alt="o" class="license-icon"/>
        </v-flex>
        -->
      </v-flex>
    </v-layout>
  </v-flex>
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
    }
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
