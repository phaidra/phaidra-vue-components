<template>
  <v-flex>
    <v-layout row >
      <template v-for="(mt, i) in o['bf:mainTitle']">
        <v-flex class="primary--text" xs3 :key="'mt'+i">{{ $t(o['@type']) }} ({{ mt['@language'] }})</v-flex>
        <v-layout column :key="'mtv'+i">
          <v-flex xs9 >{{ mt['@value'] }}</v-flex>
          <template v-for="(st, i) in o['bf:subtitle']">
            <v-flex xs9 :key="'stv'+i">{{ st['@value'] }}</v-flex>
          </template>
        </v-layout>
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

