<template>
  <v-row v-if="entity">
    <v-col md="2" cols="12" class="pdlabel primary--text text-right">{{ getLocalizedTermLabel(this.role) }}</v-col>
    <v-col md="10" cols="12">
      <template v-if="entity['@type'] === 'schema:Person'">
        <template v-if="entity['skos:exactMatch']">
          <a class="valuefield" :href="getResolverURL(entity['skos:exactMatch'][0])" target="_blank">
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
          {{ ' ' }}<a class="valuefield" :href="getResolverURL(entity['skos:exactMatch'][0])" target="_blank">{{ getLocalizedValue(entity['schema:name']) }}</a>
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

export default {
  name: 'p-d-entity',
  mixins: [vocabulary],
  props: {
    entity: {
      type: Object,
      required: true
    },
    role: {
      type: String,
      required: true
    }
  },
  methods: {
    getLocalizedTermLabel: function (role) {
      return this.$store.getters.getLocalizedTermLabel('rolepredicate', role, this.$i18n.locale)
    },
    getResolverURL: function (exactMatch) {
      let type = exactMatch['@type']
      let value = exactMatch['@value']
      switch (type) {
        case 'ids:doi':
          return 'https://doi.org/' + value
        case 'ids:handle':
          return 'https://hdl.handle.net/' + value
        case 'phaidra:acnumber':
          return 'https://ubdata.univie.ac.at/' + value
        case 'ids:urn':
          return 'https://resolver.obvsg.at/resolver?identifier=' + value
        case 'ids:orcid':
          return 'https://orcid.org/' + value
        case 'ids:gnd':
          return 'https://d-nb.info/gnd/' + value
        case 'ids:viaf':
          return 'https://viaf.org/viaf/' + value
        case 'ids:wikidata':
          return 'https://wikidata.org/wiki/' + value
      }
    }
  }
}
</script>
