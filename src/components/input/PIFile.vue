<template>
  <v-layout row>
    <v-flex xs10>
      <v-card class="mb-4">
        <v-card-title class="headline grey white--text">
          <span>{{ $t(label) }}</span>
          <v-spacer></v-spacer>
          <v-menu v-if="actions.length" open-on-hover bottom offset-y>
            <v-btn slot="activator" icon dark>
              <v-icon dark>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
                <v-list-tile-title>{{ action.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-card-text class="mt-4">
          <input type="file" v-on:input="$emit('input-file', $event)">
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-file',
  mixins: [fieldproperties],
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>