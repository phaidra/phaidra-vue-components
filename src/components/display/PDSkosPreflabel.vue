<template>
  <span>
    <v-row v-for="(l, i) in o['skos:prefLabel']" v-if="l['@language'] === displaylang" :key="'prl'+i">
      <v-col :md="labelColMd" cols="12" v-if="p==='bf:note'" class="pdlabel primary--text text-md-right" >{{ $t(o['@type']) }}<template v-if="showLang && l['@language']"> ({{ l['@language'] }})</template></v-col>
      <v-col :md="labelColMd" cols="12" v-else class="pdlabel primary--text text-md-right">{{ $t(p) }}<template v-if="showLang && l['@language']"> ({{ l['@language'] }})</template></v-col>
      <v-col :md="valueColMd" cols="12" v-if="o['skos:exactMatch']"><a class="valuefield" :href="o['skos:exactMatch'][0]" target="_blank">{{ l['@value'] }}</a></v-col>
      <v-col class="valuefield" :md="valueColMd" cols="12" v-else>{{ l['@value'] }}</v-col>
    </v-row>
  </span>
</template>

<script>
import { displayproperties } from '../../mixins/displayproperties'

export default {
  name: 'p-d-skos-preflabel',
  mixins: [displayproperties],
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
