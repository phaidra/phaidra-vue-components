<template>
  <v-flex>
    <v-layout>
      <v-flex class="primary--text" xs3>{{ $t(p) }}</v-flex>
      <v-flex xs9>
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
