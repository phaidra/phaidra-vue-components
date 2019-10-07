<template>
  <v-row>
    <v-col cols="12">
      <v-card width="100%">
        <v-card-title class="title font-weight-light">
          <span>{{ $t(label) }}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="$emit('add', $event)">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
          <v-btn icon @click="$emit('remove', $event)">
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
          <v-btn icon @click="$emit('up', $event)">
            <v-icon dark>mdi-chevron-up</v-icon>
          </v-btn>
          <v-btn icon @click="$emit('down', $event)">
            <v-icon dark>mdi-chevron-down</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <v-container>
            <v-row>
              <v-col cols="8" v-if="!hideRole">
                <v-autocomplete
                  :disabled="disablerole"
                  v-on:input="$emit('input-role', $event)"
                  :label="$t('Role')"
                  :items="vocabularies[roleVocabulary].terms"
                  :item-value="'@id'"
                  :value="getTerm(roleVocabulary, role)"
                  :filter="autocompleteFilter"
                  filled
                  return-object
                  clearable
                  :error-messages="roleErrorMessages"
                >
                  <template slot="item" slot-scope="{ item }">
                    <v-list-item-content two-line>
                      <v-list-item-title  v-html="`${getLocalizedTermLabel(roleVocabulary, item['@id'])}`"></v-list-item-title>
                      <v-list-item-subtitle v-if="showIds" v-html="`${item['@id']}`"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                  <template slot="selection" slot-scope="{ item }">
                    <v-list-item-content>
                      <v-list-item-title v-html="`${getLocalizedTermLabel(roleVocabulary, item['@id'])}`"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-radio-group v-model="typeModel" class="mt-0" @change="$emit('change-type', $event)">
                  <v-radio color="primary" :label="$t('Personal')" :value="'schema:Person'"></v-radio>
                  <v-radio color="primary" :label="$t('Corporate')" :value="'schema:Organization'"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <template v-if="typeModel === 'schema:Person'">
                <template v-if="showname">
                  <v-col cols="8" >
                    <v-text-field
                      :value="name"
                      :label="$t('Name')"
                      v-on:blur="$emit('input-name',$event.target.value)"
                      filled
                      :error-messages="nameErrorMessages"
                    ></v-text-field>
                  </v-col>
                </template>
                <template v-else>
                  <v-col cols="4">
                    <v-text-field
                      :value="firstname"
                      :label="$t('Firstname')"
                      v-on:blur="$emit('input-firstname',$event.target.value)"
                      filled
                      :error-messages="firstnameErrorMessages"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      :value="lastname"
                      :label="$t('Lastname')"
                      v-on:blur="$emit('input-lastname',$event.target.value)"
                      filled
                      :error-messages="lastnameErrorMessages"
                    ></v-text-field>
                  </v-col>
                </template>
              </template>
              <template v-if="typeModel === 'schema:Organization'">
                <v-col cols="2">
                  <v-radio-group v-model="organizationRadio" class="mt-0" @change="$emit('change-organization-type', $event)">
                    <v-radio color="primary" :label="$t('Select organization')" :value="'select'"></v-radio>
                    <v-radio color="primary" :label="$t('Other')" :value="'other'"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="10" v-if="organizationRadio === 'select'">
                  <v-autocomplete
                    :value="getTerm('orgunits', organization)"
                    :required="required"
                    v-on:input="$emit('input-organization-select', $event )"
                    :rules="required ? [ v => !!v || 'Required'] : []"
                    :items="vocabularies['orgunits'].terms"
                    :item-value="'@id'"
                    :loading="loading"
                    :filter="autocompleteFilter"
                    hide-no-data
                    :label="$t('Please choose')"
                    filled
                    return-object
                    clearable
                    :disabled="disabled"
                    :error-messages="organizationErrorMessages"
                  >
                    <template slot="item" slot-scope="{ item }">
                      <v-list-item-content two-line>
                        <v-list-item-title  v-html="`${getLocalizedTermLabel('orgunits', item['@id'])}`"></v-list-item-title>
                        <v-list-item-subtitle v-if="showIds" v-html="`${item['@id']}`"></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                    <template slot="selection" slot-scope="{ item }">
                      <v-list-item-content>
                        <v-list-item-title v-html="`${getLocalizedTermLabel('orgunits', item['@id'])}`"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="6" v-else>
                  <v-text-field
                    :value="organizationText"
                    :label="$t('Organization')"
                    v-on:blur="$emit('input-organization-other', $event.target.value)"
                    filled
                    :error-messages="organizationTextErrorMessages"
                  ></v-text-field>
                </v-col>
              </template>
              <v-col cols="4" v-if="(typeModel === 'schema:Person') || (organizationRadio !== 'select')">
                <v-text-field
                  :value="identifierText"
                  :label="$t('Identifier')"
                  v-on:blur="$emit('input-identifier', $event.target.value)"
                  filled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="typeModel === 'schema:Person'">
              <v-col cols="2">
                <v-radio-group v-model="affiliationRadio" class="mt-0" @change="$emit('change-affiliation-type', $event)">
                  <v-radio color="primary" :label="$t('Select affiliation')" :value="'select'"></v-radio>
                  <v-radio color="primary" :label="$t('Other')" :value="'other'"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="10" v-if="affiliationRadio === 'select'">
                <v-autocomplete
                  :value="getTerm('orgunits', affiliation)"
                  :required="required"
                  v-on:input="$emit('input-affiliation-select', $event)"
                  :rules="required ? [ v => !!v || 'Required'] : []"
                  :items="vocabularies['orgunits'].terms"
                  :item-value="'@id'"
                  :loading="loading"
                  :filter="autocompleteFilter"
                  hide-no-data
                  :label="$t('Please choose')"
                  filled
                  return-object
                  clearable
                  :disabled="disabled"
                  :error-messages="affiliationErrorMessages"
                >
                  <template slot="item" slot-scope="{ item }">
                    <v-list-item-content two-line>
                      <v-list-item-title  v-html="`${getLocalizedTermLabel('orgunits', item['@id'])}`"></v-list-item-title>
                      <v-list-item-subtitle v-if="showIds" v-html="`${item['@id']}`"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                  <template slot="selection" slot-scope="{ item }">
                    <v-list-item-content>
                      <v-list-item-title v-html="`${getLocalizedTermLabel('orgunits', item['@id'])}`"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="6" v-else>
                <v-text-field
                  :value="affiliationText"
                  :label="$t('Affiliation')"
                  v-on:blur="$emit('input-affiliation-other',$event.target.value)"
                  filled
                  :error-messages="affiliationTextErrorMessages"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-entity-extended',
  mixins: [vocabulary, fieldproperties],
  props: {
    label: {
      type: String
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    name: {
      type: String
    },
    affiliation: {
      type: String
    },
    affiliationText: {
      type: String
    },
    affiliationType: {
      type: String
    },
    organization: {
      type: String
    },
    organizationText: {
      type: String
    },
    organizationType: {
      type: String
    },
    identifierText: {
      type: String
    },
    role: {
      type: String
    },
    hideRole: {
      type: Boolean
    },
    type: {
      type: String
    },
    required: {
      type: Boolean
    },
    disablerole: {
      type: Boolean,
      default: false
    },
    nameErrorMessages: {
      type: Array
    },
    firstnameErrorMessages: {
      type: Array
    },
    lastnameErrorMessages: {
      type: Array
    },
    roleErrorMessages: {
      type: Array
    },
    affiliationErrorMessages: {
      type: Array
    },
    affiliationTextErrorMessages: {
      type: Array
    },
    organizationErrorMessages: {
      type: Array
    },
    organizationTextErrorMessages: {
      type: Array
    },
    showidentifier: {
      type: Boolean,
      default: true
    },
    showname: {
      type: Boolean,
      default: false
    },
    roleVocabulary: {
      type: String,
      default: 'rolepredicate'
    },
    showIds: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      disabled: false,
      typeModel: this.type,
      affiliationRadio: this.affiliationType,
      organizationRadio: this.organizationType
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if (!this.vocabularies['orgunits'].loaded) {
        this.$store.dispatch('loadOrgUnits')
      }
      this.loading = !this.vocabularies[this.roleVocabulary].loaded
      // emit input to set skos:prefLabel in parent
      if (this.role) {
        this.$emit('input', this.getTerm(this.roleVocabulary, this.role))
      }
      if (this.organization) {
        this.$emit('input-organization-select', this.getTerm('orgunits', this.organization))
      }
      if (this.affiliation) {
        this.$emit('input-affiliation-select', this.getTerm('orgunits', this.affiliation))
      }
    })
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>
