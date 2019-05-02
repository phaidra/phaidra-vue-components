<template>
  <v-flex>
    <v-layout column >
      <v-flex>
        <template v-for="(mt, i) in o['bf:mainTitle']">
          <v-layout :key="'row'+i" row wrap>
            <v-flex md4 xs12 class="pdlabel primary--text" :key="'mt'+i">{{ $t(o['@type']) }}<template v-if="mt['@language']"> ({{ mt['@language'] }})</template></v-flex>
            <v-flex md8 xs12>
              <v-layout column :key="'mtv'+i">
                <v-flex>{{ mt['@value'] }}</v-flex>
                <template v-for="(st, i) in o['bf:subtitle']">
                  <v-flex :key="'stv'+i">{{ st['@value'] }}</v-flex>
                </template>
              </v-layout>
            </v-flex>
          </v-layout>
        </template>
      </v-flex>
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

