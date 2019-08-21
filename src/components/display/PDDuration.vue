<template>
  <v-row>
    <v-col md="2" cols="12" class="pdlabel primary--text text-right">{{ $t(p) }}</v-col>
    <v-col md="10" cols="12"><template v-if="duration.hours > 0">{{ duration.hours }} {{$t('hours') + ' '}}</template> <template v-if="duration.minutes > 0">{{ duration.minutes }} {{$t('minutes') + ' '}}</template> <template v-if="duration.seconds > 0">{{ duration.seconds }} {{$t('seconds')}}</template></v-col>
  </v-row>
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
    duration: function () {
      let m = this.o.match(/PT(\d+)H(\d+)M(\d+)S/)
      if (m) {
        return {
          hours: m[1],
          minutes: m[2],
          seconds: m[3]
        }
      }
      return null
    }
  }
}
</script>
