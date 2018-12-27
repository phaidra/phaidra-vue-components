<template>
  <v-flex>
    <v-layout v-if="entity" row>
      <v-flex class="primary--text" xs3>{{ getLocalizedTermLabel(this.role) }}</v-flex>
      <v-flex xs9>
        <v-layout column>
          <v-flex>
            {{ entity['schema:givenName']['@value'] }} {{ entity['schema:familyName']['@value'] }} <span v-if="entity['schema:affiliation']" class="grey--text">{{ entity['schema:affiliation']['schema:name']['@value'] }}</span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { vocabulary } from '@/mixins/vocabulary'

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
      var id = role.substring(role.indexOf(':') + 1)
      return this.$store.getters.getLocalizedTermLabel('https://phaidra.org/vocabulary/role', id, this.$i18n.locale)
    }
  }
}
</script>

