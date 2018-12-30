<template>
  <v-flex>
    <v-layout row >
      <template v-for="(mt, i) in o['bf:mainTitle']">
        <v-flex class="primary--text" xs3 :key="'mt'+i">{{ $t('Title') }} ({{ mt['@language'] }})</v-flex>
        <v-flex xs9 :key="'mtv'+i">{{ mt['@value'] }}</v-flex>
      </template>
    </v-layout>
    <v-layout v-if="o['bf:subtitle']" row>
      <template v-for="(st, i) in o['bf:subtitle']">
        <v-flex class="primary--text" xs3 :key="'st'+i">{{ $t('Subtitle') }} ({{ st['@language'] }})</v-flex>
        <v-flex xs9 :key="'stv'+i">{{ st['@value'] }}</v-flex>
      </template>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'p-d-title',
  props: {
    o: {
      type: Object,
      required: true
    }
  }
}
</script>

