<template>
  <v-card>
    <v-card-title class="title font-weight-light grey white--text">{{ $t('Access rights') }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <v-container>
        <v-row class="title font-weight-light">{{ $t('Here you can restrict access to this object. Any other objects, like members (if this is a container or a collection), pages (if this is a book) different versions or related objects will not be affected.') }}</v-row>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="title font-weight-light grey white--text">{{ $t('The following entities have access to the object') }}</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="mt-4">
                <v-data-table
                  hide-default-footer
                  :items="rightsArray"
                  :headers="rightsHeaders"
                  :loading="loading"
                  :loading-text="$t('Loading...')"
                  :items-per-page="1000"
                >
                  <template v-slot:item.expires="{ item }">
                    {{ item.expires | date }}
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn text color="primary" @click="setExpiration(item)">{{ $t('Set exipiration date') }}</v-btn>
                    <v-btn text color="error" @click="removeRight(item)">{{ $t('Remove') }}</v-btn>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="title font-weight-light grey white--text">{{ $t('Restrict access rights to organisational units/subunits') }}</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="mt-4">
                <v-container>
                  <v-row>
                    <v-col cols="8">
                      <v-autocomplete
                        v-on:input="handleInput($event)"
                        :items="vocabularies['orgunits'].terms"
                        :item-value="'@id'"
                        :loading="loading"
                        :filter="autocompleteFilter"
                        :label="$t('Select organizational unit')"
                        :messages="path"
                        filled
                        hide-no-data
                        return-object
                        clearable
                      >
                        <template slot="item" slot-scope="{ item }">
                          <v-list-item-content two-line>
                            <v-list-item-title  v-html="`${getLocalizedTermLabel('orgunits', item['@id'])}`"></v-list-item-title>
                            <v-list-item-subtitle v-html="`${item['@id']}`"></v-list-item-subtitle>
                          </v-list-item-content>
                        </template>
                        <template slot="selection" slot-scope="{ item }">
                          <v-list-item-content>
                            <v-list-item-title v-html="`${getLocalizedTermLabel('orgunits', item['@id'])}`"></v-list-item-title>
                          </v-list-item-content>
                        </template>
                        <template v-slot:append-outer>
                          <v-icon @click="$refs.orgunitstreedialog.open()">mdi-file-tree</v-icon>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <org-units-tree-dialog ref="orgunitstreedialog" @unit-selected="handleInput(getTerm('orgunits', $event))"></org-units-tree-dialog>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'
import OrgUnitsTreeDialog from '../select/OrgUnitsTreeDialog'

export default {
  name: 'p-m-rights',
  mixins: [vocabulary],
  components: {
    OrgUnitsTreeDialog
  },
  props: {
    pid: {
      type: String,
      required: true
    }
  },
  computed: {
    instance: function () {
      return this.$store.state.instanceconfig
    }
  },
  data () {
    return {
      loading: false,
      rightsjson: {},
      path: '',
      rightsArray: [],
      rightsHeaders: [
        { text: 'Notation', align: 'left', value: 'notation', sortable: false },
        { text: 'Description', align: 'left', value: 'description', sortable: false },
        { text: 'Expires', align: 'left', value: 'expires', sortable: false },
        { text: '', align: 'right', value: 'actions', sortable: false }
      ]
    }
  },
  methods: {
    handleInput: function (unit) {
      this.path = ''
      let parentpath = []
      this.getParentPath(unit, parentpath)
      for (let u of parentpath.reverse()) {
        this.path = this.path + u['skos:prefLabel'][this.$i18n.locale] + ' > '
      }
      if (unit['skos:prefLabel']) {
        this.path = this.path + unit['skos:prefLabel'][this.$i18n.locale]
      }
      this.$emit('input', unit)
    },
    getParentPath: function (unit, parentpath) {
      if (unit['parent']) {
        parentpath.push(unit.parent)
        this.getParentPath(unit.parent, parentpath)
      }
    },
    getNameFromUsername: async function (username) {
      this.loading = true
      try {
        let response = await this.$http.get(this.instance.api + '/directory/user/' + username + '/name', {
          headers: {
            'X-XSRF-TOKEN': this.$store.state.user.token
          }
        })
        if (response.data.alerts && response.data.alerts.length > 0) {
          commit('setAlerts', response.data.alerts)
        }
        return response.data.name
      } catch (error) {
        console.log(error)
        this.$store.commit('setAlerts', [{ type: 'danger', msg: error }])
      } finally {
        this.loading = false
      }
    },
    getGroupName: async function (groupid) {
      this.loading = true
      try {
        let response = await this.$http.get(this.instance.api + '/group/' + groupid, {
          headers: {
            'X-XSRF-TOKEN': this.$store.state.user.token
          }
        })
        if (response.data.alerts && response.data.alerts.length > 0) {
          commit('setAlerts', response.data.alerts)
        }
        return response.data.group.name
      } catch (error) {
        console.log(error)
        this.$store.commit('setAlerts', [{ type: 'danger', msg: error }])
      } finally {
        this.loading = false
      }
    },
    loadRights: async function () {
      this.loading = true
      try {
        let response = await this.$http.request({
          method: 'GET',
          url: this.instance.api + '/object/' + this.pid + '/rights',
          headers: {
            'X-XSRF-TOKEN': this.$store.state.user.token
          }
        })
        if (response.data.metadata.status === 200) {
          this.rightsjson = response.data.metadata.rights
          // 'username' => 1, 'department' => 1, 'faculty' => 1, 'gruppe' => 1, 'spl' => 1, 'kennzahl' => 1, 'perfunk' => 1
          if (this.rightsjson['username']) {
            for ( let r of this.rightsjson['username']) {
              let notation = ''
              let name = ''
              let expires = ''
              if (r['value']) {
                notation = r['value']
                expires = r['expires']
              } else {
                notation = r
              }
              name = await this.getNameFromUsername(notation)
              this.rightsArray.push( { notation: notation, description: name, expires: expires } )
            }
          }
          if (this.rightsjson['department']) {
            for ( let r of this.rightsjson['department']) {
              let notation = ''
              let name = ''
              let expires = ''
              if (r['value']) {
                notation = r['value']
                expires = r['expires']
              } else {
                notation = r
              }
              if (notation === 'A-1') {
                name = this.$t('Whole University')
              } else {
                name = this.$store.getters.getLocalizedTermLabelByNotation('orgunits', notation.replace('A',''), this.$i18n.locale)
              }
              this.rightsArray.push( { notation: notation, description: name, expires: expires } )
            }
          }
          if (this.rightsjson['faculty']) {
            for ( let r of this.rightsjson['faculty']) {
              let notation = ''
              let name = ''
              let expires = ''
              if (r['value']) {
                notation = r['value']
                expires = r['expires']
              } else {
                notation = r
              }
              if (notation === 'A-1') {
                name = this.$t('Whole University')
              } else {
                name = this.$store.getters.getLocalizedTermLabelByNotation('orgunits', notation.replace('A',''), this.$i18n.locale)
              }
              this.rightsArray.push( { notation: notation, description: name, expires: expires } )
            }
          }
          if (this.rightsjson['gruppe']) {
            for ( let r of this.rightsjson['gruppe']) {
              let notation = ''
              let name = ''
              let expires = ''
              if (r['value']) {
                notation = r['value']
                expires = r['expires']
              } else {
                notation = r
              }
              name = await this.getGroupName(notation)
              this.rightsArray.push( { notation: notation, description: name, expires: expires } )
            }
          }
        } else {
          if (response.data.alerts && response.data.alerts.length > 0) {
            this.$store.commit('setAlerts', response.data.alerts)
          }
        }
      } catch (error) {
        console.log(error)
        this.$store.commit('setAlerts', [{ type: 'danger', msg: error }])
      } finally {
        this.loading = false
      }
    }
  },
  mounted: async function () {    
    this.$nextTick(function () {
      if (!this.vocabularies['orgunits'].loaded) {
        this.$store.dispatch('loadOrgUnits', this.$i18n.locale)
      }
      this.loadRights()
    })
  }
}
</script>
