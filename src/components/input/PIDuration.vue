<template>
  <v-layout row>
    <v-flex xs3 v-if="!hideHours">
      <v-text-field
        v-model="hours"
        :rules="[v => (!v || (parseInt(v, 10) >= 0)) || 'Must be a non negative integer']"
        type="number"
        :label="$t('Duration')"
        :suffix="$t('hours')"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs3 v-if="!hideMinutes">
      <v-text-field
        v-model="minutes"
        :rules="[v => (!v || (parseInt(v, 10) >= 0)) || 'Must be a non negative integer']"
        type="number"
        :label="$t('Duration')"
        :suffix="$t('minutes')"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs3 v-if="!hideSeconds">
      <v-text-field
        v-model="seconds"
        :rules="[v => (!v || (parseInt(v, 10) >= 0)) || 'Must be a non negative integer']"
        type="number"
        :label="$t('Duration')"
        :suffix="$t('seconds')"
        box
      ></v-text-field>
    </v-flex>
    <v-flex xs1 v-if="actions.length">
      <v-menu open-on-hover bottom offset-y>
        <v-btn slot="activator" icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
            <v-list-tile-title>{{ action.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-duration',
  mixins: [fieldproperties],
  props: {
    /*
    hoursValue: {
      type: Number
    },
    minutesValue: {
      type: Number
    },
    secondsValue: {
      type: Number
    },
    */
    value: {
      type: String
    },
    hideHours: {
      type: Boolean
    },
    hideMinutes: {
      type: Boolean
    },
    hideSeconds: {
      type: Boolean
    },
    label: {
      type: String,
      required: true
    }
  },
  watch: {
    hours: function (val) {
      this.$emit('input', this.duration)
    },
    minutes: function (val) {
      this.$emit('input', this.duration)
    },
    seconds: function (val) {
      this.$emit('input', this.duration)
    }
  },
  computed: {
    duration: {
      get: function () {
        return 'PT' + this.hours + 'H' + this.minutes + 'M' + this.seconds + 'S'
      },
      set: function (v) {
        let m = this.value.match(/PT(\d+)H(\d+)M(\d+)S/)
        if (m){
          this.hours = m[1]
          this.minutes = m[2]
          this.seconds = m[3]
        }
      }
    }
  },
  data () {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  },
  mounted: function () {
    this.duration = this.value
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>