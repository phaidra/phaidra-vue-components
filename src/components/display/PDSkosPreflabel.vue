<template>
  <span>
    <v-row v-for="(l, i) in o['skos:prefLabel']" v-if="l['@language'] === displaylang" :key="'prl'+i">
      <v-col md="2" cols="12" v-if="p==='bf:note'" class="pdlabel primary--text text-right" >{{ $t(o['@type']) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-col>
      <v-col md="2" cols="12" v-else class="pdlabel primary--text text-right">{{ $t(p) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-col>
      <v-col md="10" cols="12" v-if="o['skos:exactMatch']"><a class="valuefield" :href="o['skos:exactMatch'][0]" target="_blank">{{ l['@value'] }}</a></v-col>
      <v-col class="valuefield" md="10" cols="12" v-else>{{ l['@value'] }}</v-col>
    </v-row>
  </span>
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
    displaylang: function () {
      let lang
      let somelang
      for (let label of this.o['skos:prefLabel']) {
        somelang = label['@language']
        if (label['@language'] === this.$i18n.locale) {
          lang = this.$i18n.locale
        }
      }
      return lang || somelang
    }
  }
}
</script>
