<template>
  <v-flex>
    <v-layout v-if="entity" row wrap>
      <v-flex md3 xs12 class="pdlabel primary--text">{{ getLocalizedTermLabel(this.role) }}</v-flex>
      <v-flex md9 xs12>
        <v-layout column>
          <v-flex>
            <template v-for="(gn) in entity['schema:givenName']">{{ gn['@value'] }}</template><template v-for="(fn) in entity['schema:familyName']"> {{ fn['@value'] }}</template><template v-for="(fn) in entity['schema:name']"> {{ fn['@value'] }}</template> <template v-if="entity['schema:affiliation']" class="grey--text"><template v-for="(af) in entity['schema:affiliation']"><template v-for="(afn) in af"> {{ afn['@value'] }}</template></template></template>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
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

