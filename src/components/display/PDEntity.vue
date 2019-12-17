<template>
  <v-row v-if="entity">
    <v-col :md="labelColMd" cols="12" class="pdlabel primary--text text-md-right"><span v-show="!hideLabel">{{ getLocalizedTermLabel(this.role) }}</span></v-col>
    <v-col :md="valueColMd" cols="12">
      <template v-if="entity['@type'] === 'schema:Person'">
        <template v-if="entity['skos:exactMatch']">
          <a class="valuefield" :href="getIDResolverURL(entity['skos:exactMatch'][0])" target="_blank">
            <template class="valuefield" v-for="(gn) in entity['schema:givenName']">{{ gn['@value'] }}</template>
            <template class="valuefield" v-for="(fn) in entity['schema:familyName']"> {{ fn['@value'] }}</template>
            <template class="valuefield" v-for="(n) in entity['schema:name']">{{ n['@value'] }}</template>
          </a>
        </template>
        <template v-else>
          <template class="valuefield" v-for="(gn) in entity['schema:givenName']">{{ gn['@value'] }}</template>
          <template class="valuefield" v-for="(fn) in entity['schema:familyName']"> {{ fn['@value'] }}</template>
          <template class="valuefield" v-for="(n) in entity['schema:name']">{{ n['@value'] }}</template>
        </template>
        <template v-if="entity['schema:affiliation']" class="grey--text">
          <template v-for="(af, i) in entity['schema:affiliation']">
            <template v-if="af['skos:exactMatch']">
              {{ ' ' }}(<a :key="'af'+i" class="valuefield" :href="af['skos:exactMatch'][0]" target="_blank">{{ getLocalizedValue(af['schema:name']) }}</a>)
            </template>
            <template v-else>
              {{ ' ' }}(<template v-for="(afname) in af['schema:name']">{{ afname['@value'] }}</template>)
            </template>
          </template>
        </template>
      </template>
      <template v-if="entity['@type'] === 'schema:Organization'">
        <template v-if="entity['skos:exactMatch']">
          {{ ' ' }}<a class="valuefield" :href="getIDResolverURL(entity['skos:exactMatch'][0])" target="_blank">{{ getLocalizedValue(entity['schema:name']) }}</a>
        </template>
        <template v-else>
          <template class="valuefield" v-for="(corpname) in entity['schema:name']">{{ corpname['@value'] }}</template>
        </template>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'
import { displayproperties } from '../../mixins/displayproperties'

export default {
  name: 'p-d-entity',
  mixins: [vocabulary, displayproperties],
  props: {
    entity: {
      type: Object,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    hideLabel: {
      type: Boolean,
      defualt: false
    }
  },
  methods: {
    getLocalizedTermLabel: function (role) {
      return this.$store.getters.getLocalizedTermLabel('rolepredicate', role, this.$i18n.locale)
    }
  }
}
</script>
