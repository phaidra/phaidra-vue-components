<template>
<v-layout row>
    <v-flex xs12>

      <v-card >
        <v-card-title class="subheading grey white--text">
            <span>{{ $t(label) }}</span>
            <v-spacer></v-spacer>
            <v-menu open-on-hover bottom offset-y v-if="actions.length">
              <v-btn slot="activator" icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
                  <v-list-tile-title>{{ action.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">

          <v-layout row>
            <v-flex xs4>
              <v-text-field
                :value="value"
                v-on:blur="$emit('input-publisher-name',$event.target.value)"
                :label="$t(publisherNameLabel ? publisherNameLabel : '')"
                :required="required"
                :rules="required ? [ v => !!v || 'Required'] : []"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                :value="value"
                v-on:blur="$emit('input-publishing-place',$event.target.value)"
                :label="$t(publishingPlaceLabel ? publishingPlaceLabel : '')"
                :required="required"
                :rules="required ? [ v => !!v || 'Required'] : []"
                box
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field       
                :value="value" 
                v-on:blur="$emit('input-publishing-date',$event.target.value)"
                :label="$t(publishingDateLabel ? publishingDateLabel : '')"
                :required="required"
                :hint="'Format YYYY-MM-DD'"
                :rules="[validationrules.date]"
                box
              ></v-text-field>
            </v-flex>
          </v-layout>

        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import qs from 'qs'
import { fieldproperties } from '../../mixins/fieldproperties'
import { validationrules } from '../../mixins/validationrules'

export default {
  name: 'p-i-bf-publication',
  mixins: [validationrules, fieldproperties],
  props: {
    publisherName: {
      type: String,
      required: true
    },
    publishingDate: {
      type: String
    },
    publishingPlace: {
      type: String
    },
    label: {
      type: String
    },
    publisherNameLabel: {
      type: String
    },
    publishingDateLabel: {
      type: String
    },
    publishingPlaceLabel: {
      type: String
    },
    required: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>
