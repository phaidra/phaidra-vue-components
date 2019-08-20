<template>
  <v-col>
    <v-row >
      <v-col>
        <template v-for="(l, i) in o['skos:prefLabel']">
          <v-row :key="'lay'+i"   v-if="l['@language'] === displaylang">
            <v-col md="4" cols="12" v-if="p==='bf:note'" class="pdlabel primary--text" :key="'l'+i">{{ $t(o['@type']) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-col>
            <v-col md="4" cols="12" v-else class="pdlabel primary--text" :key="'l'+i">{{ $t(p) }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-col>
            <v-col md="8" cols="12" v-if="o['skos:exactMatch']" :key="'t-id'+i"><a class="valuefield" :href="o['skos:exactMatch'][0]" target="_blank">{{ l['@value'] }}</a></v-col>
            <v-col class="valuefield" md="8" cols="12" v-else :key="'t'+i">{{ l['@value'] }}</v-col>
          </v-row>
        </template>
      </v-col>
    </v-row>
  </v-col>
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
