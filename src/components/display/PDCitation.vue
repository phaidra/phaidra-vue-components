<template>
  <v-flex>
    <v-layout column >
      <v-flex>
        <template v-for="(pl, i) in o['skos:prefLabel']">
          <v-layout :key="'row'+i" row wrap>
            <v-flex md4 xs12 class="pdlabel primary--text" :key="'mt'+i">{{ $t(p) }}<template v-if="pl['@language']"> ({{ pl['@language'] }})</template></v-flex>
            <v-flex md8 xs12>
              <v-layout row :key="'mtv'+i">
                <v-flex class="valuefield">{{ pl['@value'] }}<template v-for="(identifier) in o['skos:exactMatch']"> ({{ identifier }})</template></v-flex>
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
  name: 'p-d-citation',
  props: {
    o: {
      type: Object,
      required: true
    },
    p: {
      type: String
    }
  }
}
</script>

