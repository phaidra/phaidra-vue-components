<template>
  <v-row >
    <v-col cols="10">
      <v-card class="mb-4">
        <v-card-title class="headline grey white--text">
          <span>{{ $t(label) }}</span>
          <v-spacer></v-spacer>
          <v-menu v-if="actions.length" open-on-hover bottom offset-y>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon dark>
                <v-icon dark>more_vert</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
                <v-list-item-title>{{ action.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-card-text class="mt-4">
          <input type="file" v-on:input="$emit('input-file', $event)">
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
