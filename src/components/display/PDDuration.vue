<template>
  <v-flex>
    <v-layout row wrap>
      <v-flex md3 xs12 class="primary--text" xs3>{{ $t(p) }}</v-flex>
      <v-flex md9 xs12><template v-if="duration.hours > 0">{{ duration.hours }} {{$t('hours') + ' '}}</template> <template v-if="duration.minutes > 0">{{ duration.minutes }} {{$t('minutes') + ' '}}</template> <template v-if="duration.seconds > 0">{{ duration.seconds }} {{$t('seconds')}}</template></v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'

export default {
  name: 'p-d-duration',
  mixins: [vocabulary],
  props: {
    o: {
      type: String,
      required: true
    },
    p: {
      type: String
    }
  },
  computed: {
    duration: function() {
      let m = this.o.match(/PT(\d+)H(\d+)M(\d+)S/)
      if (m){
        return {
          hours: m[1],
          minutes: m[2],
          seconds: m[3]
        }
      }
    }
  }
}
</script>

