<template>

  <v-row>
    <v-col cols="12">
      <v-card >
        <v-card-title class="title font-weight-light grey white--text">
            <span>{{ $t(label) }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <v-row>
            <v-col>
              <v-row >
                <v-col cols="12" :md="multilingual ? 4 : 6">
                  <v-text-field
                    :value="title"
                    :label="$t('Title')"
                    v-on:blur="$emit('input-title',$event.target.value)"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" :md="multilingual ? 4 : 6">
                  <v-text-field
                    :value="subtitle"
                    :label="$t('Subtitle')"
                    v-on:blur="$emit('input-subtitle',$event.target.value)"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="4" v-if="multilingual">
                  <v-autocomplete
                    :value="getTerm('lang', titleLanguage)"
                    v-on:input="$emit('input-title-language', $event)"
                    :items="vocabularies['lang'].terms"
                    :filter="autocompleteFilter"
                    hide-no-data
                    :label="$t('Language')"
                    filled
                    return-object
                    clearable
                    :item-value="'@id'"
                  >
                    <template slot="item" slot-scope="{ item }">
                      <v-list-item-content two-line>
                        <v-list-item-title  v-html="`${getLocalizedTermLabel('lang', item['@id'])}`"></v-list-item-title>
                        <v-list-item-subtitle v-if="showIds" v-html="`${item['@id']}`"></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                    <template slot="selection" slot-scope="{ item }">
                      <v-list-item-content>
                        <v-list-item-title v-html="`${getLocalizedTermLabel('lang', item['@id'])}`"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
              <v-row v-for="(role, i) in roles" :key="'role'+i">
                <v-col cols="4">
                  <v-autocomplete
                    :disabled="disablerole"
                    v-on:input="$emit('input-role', { role: role, roleTerm: $event })"
                    :label="$t('Role')"
                    :items="vocabularies['rolepredicate'].terms"
                    :value="getTerm('rolepredicate', role.role)"
                    :filter="autocompleteFilter"
                   filled
                    return-object
                    clearable
                    :item-value="'@id'"
                  >
                    <template slot="item" slot-scope="{ item }">
                      <v-list-item-content two-line>
                        <v-list-item-title  v-html="`${getLocalizedTermLabel('rolepredicate', item['@id'])}`"></v-list-item-title>
                        <v-list-item-subtitle v-if="showIds" v-html="`${item['@id']}`"></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                    <template slot="selection" slot-scope="{ item }">
                      <v-list-item-content>
                        <v-list-item-title v-html="`${getLocalizedTermLabel('rolepredicate', item['@id'])}`"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
                <template v-if="showname">
                  <v-col cols="4" >
                    <v-text-field
                      :value="role.name"
                      :label="$t('Name')"
                      v-on:blur="$emit('input-role',{ role: role, name: $event.target.value })"
                     filled
                    ></v-text-field>
                  </v-col>
                </template>
                <template v-else>
                  <v-col cols="3">
                    <v-text-field
                      :value="role.firstname"
                      :label="$t('Firstname')"
                      v-on:blur="$emit('input-role',{ role: role, firstname: $event.target.value })"
                     filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      :value="role.lastname"
                      :label="$t('Lastname')"
                      v-on:blur="$emit('input-role',{ role: role, lastname: $event.target.value })"
                     filled
                    ></v-text-field>
                  </v-col>
                </template>
                <v-col cols="1" v-if="roleActions.length">
                  <v-menu open-on-hover bottom offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item v-for="(action, i) in roleActions" :key="i" @click="$emit(action.event, role)">
                        <v-list-item-title>{{ action.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <v-card>
                <v-card-title class="title font-weight-light grey white--text">
                  <span>{{ $t(seriesLabel) }}</span>
                  <v-spacer></v-spacer>
                  <span>
                    <v-icon dark v-show="collapseSeriesModel" @click="collapseSeriesModel=!collapseSeriesModel">mdi-arrow-right-drop-circle</v-icon>
                    <v-icon dark v-show="!collapseSeriesModel" @click="collapseSeriesModel=!collapseSeriesModel">mdi-arrow-down-drop-circle</v-icon>
                  </span>
                </v-card-title>
                <v-card-text class="mt-4" v-show="!collapseSeriesModel">
                  <v-container>
                    <v-row >
                      <v-col cols="12" :md="multilingual ? 10 : 12">
                        <v-text-field
                          :value="seriesTitle"
                          :label="$t('Title')"
                          v-on:blur="$emit('input-series-title',$event.target.value)"
                          filled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="2" v-if="multilingual">
                        <v-autocomplete
                          :value="getTerm('lang', seriesTitleLanguage)"
                          v-on:input="$emit('input-series-title-language', $event )"
                          :items="vocabularies['lang'].terms"
                          :item-value="'@id'"
                          :filter="autocompleteFilter"
                          hide-no-data
                          :label="$t('Language')"
                          filled
                          return-object
                          clearable
                        >
                          <template slot="item" slot-scope="{ item }">
                            <v-list-item-content two-line>
                              <v-list-item-title  v-html="`${getLocalizedTermLabel('lang', item['@id'])}`"></v-list-item-title>
                              <v-list-item-subtitle v-if="showIds" v-html="`${item['@id']}`"></v-list-item-subtitle>
                            </v-list-item-content>
                          </template>
                          <template slot="selection" slot-scope="{ item }">
                            <v-list-item-content>
                              <v-list-item-title v-html="`${getLocalizedTermLabel('lang', item['@id'])}`"></v-list-item-title>
                            </v-list-item-content>
                          </template>
                        </v-autocomplete>
                      </v-col>

                    </v-row>

                    <v-row >

                      <v-col cols="4" v-if="!hideSeriesVolume">
                        <v-text-field
                          :value="seriesVolume"
                          :label="$t('Volume')"
                          v-on:blur="$emit('input-series-volume',$event.target.value)"
                          filled
                        ></v-text-field>
                      </v-col>

                      <v-col cols="4" v-if="!hideSeriesIssue">
                        <v-text-field
                          :value="seriesIssue"
                          :label="$t('Issue')"
                          v-on:blur="$emit('input-series-issue',$event.target.value)"
                          filled
                        ></v-text-field>
                      </v-col>

                      <v-col cols="4" v-if="!hideSeriesIssued">

                        <v-text-field
                          :value="seriesIssued"
                          v-on:blur="$emit('input-series-issued',$event.target.value)"
                          :label="$t(seriesIssuedDateLabel ? seriesIssuedDateLabel : 'Issued')"
                          :hint="'Format YYYY-MM-DD'"
                          :rules="[validationrules.date]"
                          filled
                        ></v-text-field>

                      </v-col>

                    </v-row>

                    <v-row >

                      <v-col cols="4" v-if="!hideSeriesIssn">
                        <v-text-field
                          :value="seriesIssn"
                          :label="$t('ISSN')"
                          v-on:blur="$emit('input-series-issn',$event.target.value)"
                          filled
                        ></v-text-field>
                      </v-col>

                      <v-col cols="4" v-if="!hideSeriesIdentifier">
                        <v-text-field
                          :value="seriesIdentifier"
                          :label="$t('Identifier')"
                          v-on:blur="$emit('input-series-identifier',$event.target.value)"
                          filled
                        ></v-text-field>
                      </v-col>

                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'
import { validationrules } from '../../mixins/validationrules'

export default {
  name: 'p-i-contained-in',
  mixins: [vocabulary, validationrules],
  props: {
    type: {
      type: String
    },
    multilingual: {
      type: Boolean
    },
    label: {
      type: String
    },
    title: {
      type: String
    },
    subtitle: {
      type: String
    },
    titleLanguage: {
      type: String
    },
    roles: {
      type: Array
    },
    disablerole: {
      type: Boolean,
      default: false
    },
    showname: {
      type: Boolean,
      default: false
    },
    showIds: {
      type: Boolean,
      default: false
    },
    seriesLabel: {
      type: String
    },
    seriesTitle: {
      type: String
    },
    seriesTitleLanguage: {
      type: String
    },
    hideSeriesVolume: {
      type: Boolean
    },
    seriesVolume: {
      type: String
    },
    hideSeriesIssue: {
      type: Boolean
    },
    seriesIssue: {
      type: String
    },
    hideSeriesIssued: {
      type: Boolean
    },
    seriesIssued: {
      type: String
    },
    seriesIssuedDateLabel: {
      type: String
    },
    hideSeriesIssn: {
      type: Boolean
    },
    seriesIssn: {
      type: String
    },
    hideSeriesIdentifier: {
      type: Boolean,
      default: true
    },
    seriesIdentifier: {
      type: String
    },
    collapseSeries: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    roleActions: function () {
      var arr = []
      arr.push({ title: this.$t('Remove'), event: 'remove-role' })
      arr.push({ title: this.$t('Duplicate'), event: 'add-role' })
      arr.push({ title: this.$t('Move up'), event: 'up-role' })
      arr.push({ title: this.$t('Move down'), event: 'down-role' })
      return arr
    }
  },
  data () {
    return {
      collapseSeriesModel: this.collapseSeries
    }
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
.vertical-center {
 align-items: center;
}
</style>
