<template>
  <v-row v-if="entity">
    <v-col md="2" cols="12" class="pdlabel primary--text text-right">{{ getLocalizedTermLabel(this.role) }}</v-col>
    <v-col md="10" cols="12">
      <template class="valuefield" v-for="(gn) in entity['schema:givenName']">{{ gn['@value'] }}</template><template class="valuefield" v-for="(fn) in entity['schema:familyName']"> {{ fn['@value'] }}</template><template class="valuefield" v-for="(fn) in entity['schema:name']"> {{ fn['@value'] }}</template> <template v-if="entity['schema:affiliation']" class="grey--text"><template v-for="(af) in entity['schema:affiliation']"><template class="valuefield" v-for="(afn) in af"> {{ afn['@value'] }}</template></template></template>
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
    }
  }
}
</script>
