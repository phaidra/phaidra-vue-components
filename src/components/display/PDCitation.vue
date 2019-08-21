<template>
  <span>
    <v-row v-for="(pl, i) in o['skos:prefLabel']">
      <v-col md="2" cols="12" class="pdlabel primary--text text-right" :key="'mt'+i">{{ $t(p) }}<template v-if="pl['@language']"> ({{ pl['@language'] }})</template></v-col>
      <v-col md="10" cols="12" :key="'mt'+i">
        <v-row no-gutters class="valuefield">{{ pl['@value'] }}<template v-for="(identifier) in o['skos:exactMatch']"> ({{ identifier }})</template></v-row>
      </v-col>
    </v-row>
  </span>
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
