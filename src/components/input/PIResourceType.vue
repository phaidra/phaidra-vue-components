<template>
  <v-row v-if="!hidden">
    <v-col cols="12">
      <v-btn-toggle
        v-model="toggleResourcetypeModel"
        mandatory
        class="mb-8"
        @change="$emit('input', getTerm('resourcetype', toggleResourcetypeModelArr[$event]))"
      >
        <v-btn :active-class="'primary white--text'" class="grey white--text"><v-icon color="white">mdi-image</v-icon><span class="ml-2">{{ $t('Picture') }}</span></v-btn>
        <v-btn :active-class="'primary white--text'" class="grey white--text"><v-icon color="white">mdi-volume-high</v-icon><span class="ml-2">{{ $t('Audio') }}</span></v-btn>
        <v-btn :active-class="'primary white--text'" class="grey white--text"><v-icon color="white">mdi-video</v-icon><span class="ml-2">{{ $t('Video') }}</span></v-btn>
        <v-btn :active-class="'primary white--text'" class="grey white--text"><v-icon color="white">mdi-file-pdf</v-icon><span class="ml-2">{{ $t('Document') }}</span></v-btn>
        <v-btn :active-class="'primary white--text'" class="grey white--text"><v-icon color="white">mdi-file</v-icon><span class="ml-2">{{ $t('Data') }}</span></v-btn>
        <v-btn :active-class="'primary white--text'" class="grey white--text"><v-icon color="white">mdi-folder-open</v-icon><span class="ml-2">{{ $t('Collection') }}</span></v-btn>
        <!--<v-btn :active-class="'primary white--text'" class="grey white--text"><v-icon color="white">mdi-link</v-icon><span class="ml-2">{{ $t('Resource') }}</span></v-btn>-->
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-resource-type',
  mixins: [vocabulary, fieldproperties],
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      toggleResourcetypeModel: 0,
      toggleResourcetypeModelArr: [
        'https://pid.phaidra.org/vocabulary/44TN-P1S0',
        'https://pid.phaidra.org/vocabulary/8YB5-1M0J',
        'https://pid.phaidra.org/vocabulary/B0Y6-GYT8',
        'https://pid.phaidra.org/vocabulary/69ZZ-2KGX',
        'https://pid.phaidra.org/vocabulary/7AVS-Y482',
        'https://pid.phaidra.org/vocabulary/GXS7-ENXJ',
        'https://pid.phaidra.org/vocabulary/T8GH-F4V8'
      ]
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // emit input to set skos:prefLabel in parent
      if (this.value) {
        for (let term of this.vocabularies['resourcetype'].terms) {
          if (term['@id'] === this.value) {
            this.$emit('input', term)
          }
        }
      }
    })
  }
}
</script>
