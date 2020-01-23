<template>
  <span>
    <template v-for="(f, i) in o['frapo:hasFundingAgency']">
      <v-row :key="'fnd'+i">
        <template v-for="(l, i) in f['skos:prefLabel']">
          <v-col :md="labelColMd" cols="12" class="pdlabel primary--text text-md-right" :key="'fpl'+i">{{ $t('Funder') }}<template v-if="l['@language']"> ({{ l['@language'] }})</template></v-col>
          <v-col class="valuefield" :md="valueColMd" cols="12" :key="'fpv'+i" >
            <template v-if="f['skos:exactMatch']">
              <a :href="f['skos:exactMatch'][0]" target="_blank">{{ l['@value'] }}</a>
            </template>
            <template v-else>
              {{ l['@value'] }}
            </template>
          </v-col>
        </template>
      </v-row>
    </template>
    <v-row>
      <template v-for="(l, i) in o['skos:prefLabel']">
        <v-col :md="labelColMd" cols="12" class="pdlabel primary--text text-md-right" :key="'pl'+i">{{ $t('Project') }} ({{ l['@language'] }})</v-col>
        <v-col class="valuefield" :md="valueColMd" cols="12" :key="'pv'+i" >{{ l['@value'] }}</v-col>
      </template>
    </v-row>
    <v-row>
      <template v-for="(id, i) in o['skos:exactMatch']">
        <v-col :md="labelColMd" cols="12" class="pdlabel primary--text text-md-right" :key="'idl'+i">{{ $t('Project Id') }}</v-col>
        <v-col :md="valueColMd" cols="12" :key="'idv'+i">{{ id }}</v-col>
      </template>
    </v-row>
    <v-row>
      <template v-for="(d, i) in o['rdfs:comment']">
        <v-col :md="labelColMd" cols="12" class="pdlabel primary--text text-md-right" :key="'dl'+i">{{ $t('Project Description') }} ({{ d['@language'] }})</v-col>
        <v-col class="valuefield" :md="valueColMd" cols="12" :key="'dv'+i">{{ d['@value'] }}</v-col>
      </template>
    </v-row>
    <v-row>
      <template v-for="(hp, i) in o['foaf:homepage']">
        <v-col :md="labelColMd" cols="12" class="pdlabel primary--text text-md-right" :key="'hpl'+i">{{ $t('Project Homepage') }}</v-col>
        <v-col :md="valueColMd" cols="12" :key="'hpv'+i">{{ hp }}</v-col>
      </template>
    </v-row>
  </span>
</template>

<script>
import { displayproperties } from '../../mixins/displayproperties'

export default {
  name: 'p-d-project',
  mixins: [displayproperties],
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
