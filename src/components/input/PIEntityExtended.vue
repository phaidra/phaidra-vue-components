<template>
  <v-row>
    <v-col cols="12">
      <v-card width="100%">
        <v-card-title class="title font-weight-light">
          <span>{{ $t(label) }}</span>
          <v-spacer></v-spacer>
          <v-menu open-on-hover bottom offset-y v-if="actions.length">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon>
                <v-icon dark>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
                <v-list-item-title>{{ action.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <v-container>
            <v-row>
              <v-col cols="4" v-if="!hideRole">
                <v-autocomplete
                  :disabled="disablerole"
                  v-on:input="$emit('input-role', $event)"
                  :label="$t('Role')"
                  :items="vocabularies['rolepredicate'].terms"
                  :value="getTerm('rolepredicate', role)"
                  :filter="autocompleteFilter"
                  filled
                  return-object
                  clearable
                >
                  <template slot="item" slot-scope="{ item }">
                    <v-list-item-content two-line>
                      <v-list-item-title  v-html="`${getLocalizedTermLabel('rolepredicate', item['@id'])}`"></v-list-item-title>
                      <v-list-item-subtitle  v-html="`${item['@id']}`"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                  <template slot="selection" slot-scope="{ item }">
                    <v-list-item-content>
                      <v-list-item-title v-html="`${getLocalizedTermLabel('rolepredicate', item['@id'])}`"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="2">
                <v-radio-group v-model="typeModel" class="mt-0">
                  <v-radio :label="$t('Personal')" :value="'schema:Person'"></v-radio>
                  <v-radio :label="$t('Corporate')" :value="'schema:Organisation'"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <template v-if="typeModel === 'schema:Person'">
                <template v-if="showname">
                  <v-col cols="6" >
                    <v-text-field
                      :value="name"
                      :label="$t('Name')"
                      v-on:blur="$emit('input-name',$event.target.value)"
                    filled
                    ></v-text-field>
                  </v-col>
                </template>
                <template v-else>
                  <v-col cols="3">
                    <v-text-field
                      :value="firstname"
                      :label="$t('Firstname')"
                      v-on:blur="$emit('input-firstname',$event.target.value)"
                    filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      :value="lastname"
                      :label="$t('Lastname')"
                      v-on:blur="$emit('input-lastname',$event.target.value)"
                    filled
                    ></v-text-field>
                  </v-col>
                </template>
              </template>
              <template v-if="typeModel === 'schema:Organisation'">
                <v-col cols="2">
                  <v-radio-group v-model="organisationRadio" class="mt-0">
                    <v-radio :label="$t('Select organisation')" :value="'select'"></v-radio>
                    <v-radio :label="$t('Other')" :value="'other'"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="6" v-if="organisationRadio === 'select'">
                  <v-autocomplete
                    :value="getTerm('orgunits', value)"
                    :required="required"
                    v-on:input="$emit('input-organisation-select', $event )"
                    :rules="required ? [ v => !!v || 'Required'] : []"
                    :items="vocabularies['orgunits'].terms"
                    :loading="loading"
                    :filter="autocompleteFilter"
                    hide-no-data
                    :label="$t('Please choose')"
                    filled
                    return-object
                    clearable
                    :disabled="disabled"
                  >
                    <template slot="item" slot-scope="{ item }">
                      <v-list-item-content two-line>
                        <v-list-item-title  v-html="`${getLocalizedTermLabel('orgunits', item['@id'])}`"></v-list-item-title>
                        <v-list-item-subtitle  v-html="`${item['@id']}`"></v-list-item-subtitle>
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
                    :value="organisation"
                    :label="$t('Organisation')"
                    v-on:blur="$emit('input-organisation',$event.target.value)"
                    filled
                  ></v-text-field>
                </v-col>
              </template>
              <v-col cols="4">
                <v-text-field
                  :value="identifier"
                  :label="$t('Identifier')"
                  v-on:blur="$emit('input-identifier',$event.target.value)"
                filled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="typeModel === 'schema:Person'">
              <v-col cols="2">
                <v-radio-group v-model="affiliationRadio" class="mt-0">
                  <v-radio :label="$t('Select affiliation')" :value="'select'"></v-radio>
                  <v-radio :label="$t('Other')" :value="'other'"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="8" v-if="affiliationRadio === 'select'">
                <v-autocomplete
                  :value="getTerm('orgunits', value)"
                  :required="required"
                  v-on:input="$emit('input-affiliation-select', $event )"
                  :rules="required ? [ v => !!v || 'Required'] : []"
                  :items="vocabularies['orgunits'].terms"
                  :loading="loading"
                  :filter="autocompleteFilter"
                  hide-no-data
                  :label="$t('Please choose')"
                  filled
                  return-object
                  clearable
                  :disabled="disabled"
                >
                  <template slot="item" slot-scope="{ item }">
                    <v-list-item-content two-line>
                      <v-list-item-title  v-html="`${getLocalizedTermLabel('orgunits', item['@id'])}`"></v-list-item-title>
                      <v-list-item-subtitle  v-html="`${item['@id']}`"></v-list-item-subtitle>
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
                  :value="affiliation"
                  :label="$t('Affiliation')"
                  v-on:blur="$emit('input-affiliation-other',$event.target.value)"
                  filled
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
    organisation: {
      type: String
    },
    organisationLabel: {
      type: String
    },
    identifier: {
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
    showidentifier: {
      type: Boolean,
      default: true
    },
    showname: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      vocabulary: 'rolepredicate',
      typeModel: this.type,
      affiliationRadio: 'select',
      organisationRadio: 'select'
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if(!this.vocabularies['orgunits'].loaded ){
        this.$store.dispatch('loadOrgUnits')
      }
      this.loading = !this.vocabularies['rolepredicate'].loaded
      // emit input to set skos:prefLabel in parent
      if (this.role) {
        this.$emit('input', this.getTerm('rolepredicate', this.role))
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
