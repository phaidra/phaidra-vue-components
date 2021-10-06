<template>
  <div class="mb-8">
    <v-row v-if="!hidden">
      <v-col cols="12">
        <v-btn-toggle
          v-model="toggleResourcetypeModel"
          mandatory
          @change="$emit('input', getTerm('resourcetype', toggleResourcetypeModelArr[$event]))"
        >
          <v-btn :active-class="'primary white--text'" class="grey white--text"><v-icon color="white">mdi-image</v-icon><span class="ml-2">{{ $t('Picture') }}</span></v-btn>
          <v-btn :active-class="'primary white--text'" class="grey white--text"><v-icon color="white">mdi-volume-high</v-icon><span class="ml-2">{{ $t('Audio') }}</span></v-btn>
          <v-btn :active-class="'primary white--text'" class="grey white--text"><v-icon color="white">mdi-video</v-icon><span class="ml-2">{{ $t('Video') }}</span></v-btn>
          <v-btn :active-class="'primary white--text'" class="grey white--text"><v-icon color="white">mdi-file-pdf</v-icon><span class="ml-2">{{ $t('PDF Document') }}</span></v-btn>
          <v-btn :active-class="'primary white--text'" class="grey white--text"><v-icon color="white">mdi-file</v-icon><span class="ml-2">{{ $t('Other documents / Data') }}</span></v-btn>
          <v-btn :active-class="'primary white--text'" class="grey white--text"><v-icon color="white">mdi-folder-open</v-icon><span class="ml-2">{{ $t('Collection') }}</span></v-btn>
          <!--<v-btn :active-class="'primary white--text'" class="grey white--text"><v-icon color="white">mdi-link</v-icon><span class="ml-2">{{ $t('Resource') }}</span></v-btn>-->
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row v-if="!hidden && formatsInfo && formats" class="ml-1">
      <span v-if="formats.recommended">{{ $t('Recommended formats') }}: <a v-for="(f, i) in formats.recommended" :key="'fr' + i" :href="f.url" target="_blank">{{f.label}}<span v-if="i < (formats.recommended.length -1)">, </span></a></span>
      <span class="ml-4" v-if="formats.supported">{{ $t('Other supported formats') }}: <a v-for="(f, i) in formats.supported" :key="'fs' + i" :href="f.url" target="_blank">{{f.label}}<span v-if="i < (formats.supported.length - 1)">, </span></a></span>
    </v-row>
  </div>
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
    },
    formatsInfo: {
      type: Object,
      default () {
        return {
          // image
          'https://pid.phaidra.org/vocabulary/44TN-P1S0': {
            recommended: [
              { label: 'TIFF', url: 'https://datamanagement.univie.ac.at/ueber-phaidra-services/formate/formate/tiff/' }
            ],
            supported: [
              { label: 'JPG', url: 'https://datamanagement.univie.ac.at/ueber-phaidra-services/formate/formate/jpg/' },
              { label: 'PNG', url: 'https://datamanagement.univie.ac.at/ueber-phaidra-services/formate/formate/png/' }
            ]
          },
          // audio
          'https://pid.phaidra.org/vocabulary/8YB5-1M0J': {
            recommended: [
              { label: 'WAV', url: 'https://datamanagement.univie.ac.at/ueber-phaidra-services/formate/formate/wav/' },
              { label: 'FLAC', url: 'https://datamanagement.univie.ac.at/ueber-phaidra-services/formate/formate/flac/' }
            ],
            supported: [
              { label: 'MP3', url: 'https://datamanagement.univie.ac.at/ueber-phaidra-services/formate/formate/mp3/' },
              { label: 'OGG', url: 'https://datamanagement.univie.ac.at/ueber-phaidra-services/formate/formate/ogg/' },
              { label: 'AIFF', url: 'https://en.wikipedia.org/wiki/Audio_Interchange_File_Format' }
            ]
          },
          // video
          'https://pid.phaidra.org/vocabulary/B0Y6-GYT8': {
            recommended: [
              { label: 'AVI', url: 'https://datamanagement.univie.ac.at/ueber-phaidra-services/formate/formate/avi/' },
              { label: 'MPEG-2', url: 'https://datamanagement.univie.ac.at/ueber-phaidra-services/formate/formate/mpeg-2/' },
              { label: 'MKV', url: 'https://datamanagement.univie.ac.at/ueber-phaidra-services/formate/formate/mkv/' }
            ],
            supported: [
              { label: 'MP4', url: 'https://datamanagement.univie.ac.at/ueber-phaidra-services/formate/formate/mp4/' }
            ]
          }
        }
      }
    }
  },
  computed: {
    formats: function () {
      return this.formatsInfo[this.toggleResourcetypeModelArr[this.toggleResourcetypeModel]]
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
