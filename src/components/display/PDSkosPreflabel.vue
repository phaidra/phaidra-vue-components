<template>
  <v-flex>
    <v-layout column >
      <v-flex>
        <template v-for="(l, i) in o['skos:prefLabel']">
          <v-layout :key="'lay'+i" row wrap v-if="l['@language'] === displaylang">
            <v-flex md4 xs12 v-if="p==='bf:note'" class="pdlabel primary--text" :key="'l'+i">{{ $t(o['@type']) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-flex>
            <v-flex md4 xs12 v-else class="pdlabel primary--text" :key="'l'+i">{{ $t(p) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-flex>
            <v-flex md8 xs12 v-if="o['skos:exactMatch']" :key="'t-id'+i"><a class="valuefield" :href="o['skos:exactMatch'][0]" target="_blank">{{ l['@value'] }}</a></v-flex>
            <v-flex class="valuefield" md8 xs12 v-else :key="'t'+i">{{ l['@value'] }}</v-flex>
          </v-layout>
        </template>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'p-d-skos-preflabel',
  props: {
    o: {
      type: Object,
      required: true
    },
    p: {
      type: String
    }
  },
  computed: {
    displaylang: function() {
      let lang
      let somelang
      for (let label of this.o['skos:prefLabel']) {
        somelang = label['@language']
        if (label['@language'] === this.$i18n.locale) {
          lang = this.$i18n.locale
        }
      }
      return lang ? lang : somelang
    }
  }
}
</script>
