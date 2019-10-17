<template>
  <span>
    <v-row>
      <template v-for="(l, i) in o['skos:prefLabel']">
        <v-col class="pdlabel primary--text text-right" md="2" cols="12" :key="'fl'+i">{{ $t('Funder') }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-col>
        <v-col class="valuefield" md="10" cols="12" :key="'fv'+i">
          <template v-if="o['skos:exactMatch']">
            <a :href="o['skos:exactMatch']" target="_blank">{{ l['@value'] }}</a>
          </template>
          <template v-else>
            {{ l['@value'] }}
          </template>
        </v-col>
      </template>
    </v-row>
  </span>
</template>

<script>
export default {
  name: 'p-d-funder',
  props: {
    o: {
      type: Object,
      required: true
    }
  }
}
</script>
