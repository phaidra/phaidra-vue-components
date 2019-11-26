<template>
  <v-row>
    <v-col cols="12">
      <v-card width="100%">
        <v-card-title class="title font-weight-light">
          <span>{{ $t(label) }}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="$emit('add', $event)">
            <v-icon dark>mdi-content-duplicate</v-icon>
          </v-btn>
          <v-btn icon @click="$emit('add-clear', $event)">
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
              <v-col v-if="enableTypeSelect" cols="2">
                <v-radio-group v-model="typeModel" class="mt-0" @change="$emit('change-type', $event)">
                  <v-radio color="primary" :label="$t('Personal')" :value="'schema:Person'"></v-radio>
                  <v-radio color="primary" :label="$t('Corporate')" :value="'schema:Organization'"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <template v-if="typeModel === 'schema:Person'">
              <v-row>
                <template v-if="showname">
                  <v-col cols="12" :md="(showIdentifier && !showIdentifierType) ? 8 : 12">
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
                  <v-col cols="12" :md="(showIdentifier && !showIdentifierType) ? 4 : 6">
                    <v-text-field
                      :value="firstname"
                      :label="$t('Firstname')"
                      v-on:blur="$emit('input-firstname',$event.target.value)"
                      filled
                      :error-messages="firstnameErrorMessages"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" :md="(showIdentifier && !showIdentifierType) ? 4 : 6">
                    <v-text-field
                      :value="lastname"
                      :label="$t('Lastname')"
                      v-on:blur="$emit('input-lastname',$event.target.value)"
                      filled
                      :error-messages="lastnameErrorMessages"
                    ></v-text-field>
                  </v-col>
                </template>
                <template v-if="showIdentifier && !showIdentifierType">
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-show="identifierType === 'ids:orcid'"
                      v-mask="'####-####-####-####'"
                      :value="identifierText"
                      :label="identifierLabel ? identifierLabel : $t('Identifier')"
                      v-on:blur="$emit('input-identifier', $event.target.value)"
                      :placeholder="identifierTypePlaceholder"
                      :rules="identifierType ? [validationrules['orcid']] : [validationrules['noop']]"
                      filled
                    ></v-text-field>
                    <v-text-field
                      v-show="identifierType !== 'ids:orcid'"
                      :value="identifierText"
                      :label="identifierLabel ? identifierLabel : $t('Identifier')"
                      v-on:blur="$emit('input-identifier', $event.target.value)"
                      :placeholder="identifierTypePlaceholder"
                      :rules="identifierType ? [validationrules[getIdentifierRuleName(identifierType)]] : [validationrules['noop']]"
                      filled
                    ></v-text-field>
                  </v-col>
                </template>
              </v-row>
              <v-row v-if="showIdentifier && showIdentifierType">
                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-on:input="$emit('input-identifier-type', $event)"
                    :label="$t('Type of identifier')"
                    :items="vocabularies[identifierVocabulary].terms"
                    :item-value="'@id'"
                    :value="getTerm(identifierVocabulary, identifierType)"
                    :filter="autocompleteFilter"
                    :disabled="disableIdentifierType"
                    filled
                    return-object
                    clearable
                  >
                    <template slot="item" slot-scope="{ item }">
                      <v-list-item-content two-line>
                        <v-list-item-title  v-html="`${getLocalizedTermLabel(identifierVocabulary, item['@id'])}`"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <template slot="selection" slot-scope="{ item }">
                      <v-list-item-content>
                        <v-list-item-title v-html="`${getLocalizedTermLabel(identifierVocabulary, item['@id'])}`"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="6" >
                  <v-text-field
                    v-show="identifierType === 'ids:orcid'"
                    v-mask="'####-####-####-####'"
                    :value="identifierText"
                    :label="identifierLabel ? identifierLabel : $t('Identifier')"
                    v-on:blur="$emit('input-identifier', $event.target.value)"
                    :placeholder="identifierTypePlaceholder"
                    :rules="identifierType ? [validationrules['orcid']] : [validationrules['noop']]"
                    filled
                  ></v-text-field>
                  <v-text-field
                    v-show="identifierType !== 'ids:orcid'"
                    :value="identifierText"
                    :label="identifierLabel ? identifierLabel : $t('Identifier')"
                    v-on:blur="$emit('input-identifier', $event.target.value)"
                    :placeholder="identifierTypePlaceholder"
                    :rules="identifierType ? [validationrules[getIdentifierRuleName(identifierType)]] : [validationrules['noop']]"
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>
            <template v-if="typeModel === 'schema:Organization'">
              <v-row>
                <v-col cols="2">
                  <v-radio-group v-model="organizationRadio" class="mt-0" @change="$emit('change-organization-type', $event)">
                    <v-radio color="primary" :label="$t(instanceconfig.institution)" :value="'select'"></v-radio>
                    <v-radio color="primary" :label="$t('OTHER_FEMININE')" :value="'other'"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" md="10" v-if="organizationRadio === 'select'">
                  <v-autocomplete
                    :value="getTerm('orgunits', organization)"
                    :required="required"
                    v-on:input="handleInput($event, 'organizationPath', 'input-organization-select')"
                    :rules="required ? [ v => !!v || 'Required'] : []"
                    :items="vocabularies['orgunits'].terms"
                    :item-value="'@id'"
                    :loading="loading"
                    :filter="autocompleteFilter"
                    hide-no-data
                    :label="$t(organizationSelectLabel)"
                    filled
                    return-object
                    clearable
                    :disabled="disabled"
                    :messages="organizationPath"
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
                    <template v-slot:append-outer>
                      <v-icon @click="$refs.organizationstreedialog.open()">mdi-file-tree</v-icon>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="10" v-else>
                  <v-text-field
                    :value="organizationText"
                    :label="$t('Organization')"
                    v-on:blur="$emit('input-organization-other', $event.target.value)"
                    filled
                    :error-messages="organizationTextErrorMessages"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>
            <v-row v-if="typeModel === 'schema:Person'">
              <v-col cols="2">
                <v-radio-group v-model="affiliationRadio" class="mt-0" @change="$emit('change-affiliation-type', $event)">
                  <v-radio color="primary" :label="$t(instanceconfig.institution)" :value="'select'"></v-radio>
                  <v-radio color="primary" :label="$t('OTHER_FEMININE')" :value="'other'"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="10" v-if="affiliationRadio === 'select'">
                <v-autocomplete
                  :value="getTerm('orgunits', affiliation)"
                  :required="required"
                  v-on:input="handleInput($event, 'affiliationPath', 'input-affiliation-select')"
                  :rules="required ? [ v => !!v || 'Required'] : []"
                  :items="vocabularies['orgunits'].terms"
                  :item-value="'@id'"
                  :loading="loading"
                  :filter="autocompleteFilter"
                  hide-no-data
                  :label="$t(affiliationSelectLabel)"
                  filled
                  return-object
                  clearable
                  :disabled="disabled"
                  :messages="affiliationPath"
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
                  <template v-slot:append-outer>
                    <v-icon @click="$refs.affiliationstreedialog.open()">mdi-file-tree</v-icon>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" md="10" v-else>
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
    <org-units-tree-dialog ref="organizationstreedialog" @unit-selected="handleInput(getTerm('orgunits', $event), 'organizationPath', 'input-organization-select')"></org-units-tree-dialog>
    <org-units-tree-dialog ref="affiliationstreedialog" @unit-selected="handleInput(getTerm('orgunits', $event), 'affiliationPath', 'input-affiliation-select')"></org-units-tree-dialog>
  </v-row>
</template>

<script>
import { mask } from 'vue-the-mask'
import { vocabulary } from '../../mixins/vocabulary'
import { fieldproperties } from '../../mixins/fieldproperties'
import { validationrules } from '../../mixins/validationrules'
import OrgUnitsTreeDialog from '../select/OrgUnitsTreeDialog'

export default {
  name: 'p-i-entity-extended',
  mixins: [ vocabulary, fieldproperties, validationrules ],
  components: {
    OrgUnitsTreeDialog
  },
  directives: {
    mask
  },
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
    identifierType: {
      type: String
    },
    identifierLabel: {
      type: String
    },
    showIdentifier: {
      type: Boolean
    },
    showIdentifierType: {
      type: Boolean
    },
    disableIdentifierType: {
      type: Boolean
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
    showname: {
      type: Boolean,
      default: false
    },
    roleVocabulary: {
      type: String,
      default: 'rolepredicate'
    },
    identifierVocabulary: {
      type: String,
      default: 'entityidentifiertype'
    },
    showIds: {
      type: Boolean,
      default: false
    },
    enableTypeSelect: {
      type: Boolean,
      default: true
    },
    organizationSelectLabel: {
      type: String,
      default: 'Please choose'
    },
    affiliationSelectLabel: {
      type: String,
      default: 'Please choose'
    }
  },
  computed: {
    instanceconfig: function () {
      return this.$root.$store.state.instanceconfig
    },
    appconfig: function () {
      return this.$root.$store.state.appconfig
    },
    identifierTypePlaceholder: function () {
      for (let i of this.vocabularies[this.identifierVocabulary].terms) {
        if (i['@id'] === this.identifierType) {
          return i['skos:example']
        }
      }
      return ''
    }
  },
  data () {
    return {
      loading: false,
      disabled: false,
      typeModel: this.type,
      affiliationRadio: this.affiliationType,
      organizationRadio: this.organizationType,
      affiliationPath: '',
      organizationPath: ''
    }
  },
  methods: {
    getParentPath: function (unit, parentpath) {
      if (unit) {
        if (unit['parent']) {
          parentpath.push(unit.parent)
          this.getParentPath(unit.parent, parentpath)
        }
      }
    },
    handleInput: function (unit, propName, eventName) {
      this[propName] = ''
      let parentpath = []
      if (unit) {
        this.getParentPath(unit, parentpath)
        for (let u of parentpath.reverse()) {
          this[propName] = this[propName] + u['skos:prefLabel'][this.$i18n.locale] + ' > '
        }
        this[propName] = this[propName] + unit['skos:prefLabel'][this.$i18n.locale]
      }
      this.$emit(eventName, unit)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if (!this.vocabularies['orgunits'].loaded) {
        this.$store.dispatch('loadOrgUnits', this.$i18n.locale)
      }
      this.loading = !this.vocabularies[this.roleVocabulary].loaded
      // emit input to set skos:prefLabel in parent
      if (this.role) {
        this.$emit('input', this.getTerm(this.roleVocabulary, this.role))
      }
      if (this.organization) {
        this.handleInput(this.getTerm('orgunits', this.organization), 'organizationPath', 'input-organization-select')
      }
      if (this.affiliation) {
        this.handleInput(this.getTerm('orgunits', this.affiliation), 'affiliationPath', 'input-affiliation-select')
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
