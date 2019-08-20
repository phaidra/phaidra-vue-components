<template>
  <v-col>
    <v-row >
      <v-col>
        <template v-for="(mt, i) in o['bf:mainTitle']">
          <v-row :key="'row'+i"  >
            <v-col md="4" cols="12" class="pdlabel primary--text" :key="'mt'+i">{{ $t(o['@type']) }}<template v-if="mt['@language']"> ({{ mt['@language'] }})</template></v-col>
            <v-col md="8" cols="12">
              <v-row :key="'mtv'+i">
                <v-col class="valuefield">{{ mt['@value'] }}</v-col>
                <template v-for="(st, i) in o['bf:subtitle']">
                  <v-col class="valuefield" :key="'stv'+i">{{ st['@value'] }}</v-col>
                </template>
              </v-row>
            </v-col>
          </v-row>
        </template>
      </v-col>
    </v-row>
  </v-col>
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
