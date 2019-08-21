<template>
<v-row >
    <v-col cols="12">

      <v-card >
        <v-card-title class="title font-weight-light grey white--text">
            <span>{{ $t(label) }}</span>
            <v-spacer></v-spacer>
            <v-menu open-on-hover bottom offset-y v-if="actions.length">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" icon dark>
                  <v-icon dark>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
                  <v-list-item-title>{{ action.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">

          <v-row >
            <v-col cols="4">
              <v-text-field
                :value="publisherName"
                v-on:blur="$emit('input-publisher-name',$event.target.value)"
                :label="$t(publisherNameLabel ? publisherNameLabel : '')"
                :required="required"
                :rules="required ? [ v => !!v || 'Required'] : []"
               filled
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                :value="publishingPlace"
                v-on:blur="$emit('input-publishing-place',$event.target.value)"
                :label="$t(publishingPlaceLabel ? publishingPlaceLabel : '')"
                :required="required"
                :rules="required ? [ v => !!v || 'Required'] : []"
               filled
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                :value="publishingDate"
                v-on:blur="$emit('input-publishing-date',$event.target.value)"
                :label="$t(publishingDateLabel ? publishingDateLabel : '')"
                :required="required"
                :hint="'Format YYYY-MM-DD'"
                :rules="[validationrules.date]"
               filled
              ></v-text-field>
            </v-col>
          </v-row>

        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
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
