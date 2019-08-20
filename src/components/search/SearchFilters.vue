<template>
  <v-container fluid >
    <ul class="main-ul">
      <li v-for="(f, i) in facetQueries" :key="i">
        <icon @click.native="showFacet(f)" v-if="f.show" name="univie-stop2" class="primary--text"></icon>
        <icon @click.native="showFacet(f)" v-if="!f.show" name="univie-checkbox-unchecked" class="primary--text"></icon>
        <span @click="showFacet(f)" class="facet-label primary--text" :class="{ active: f.show }">{{ $t(f.label) }}</span>
        <ul v-if="f.show">
          <li v-for="(q, j) in f.queries" :key="j">
            <span @click="toggleFacet(q,f)">
              <icon v-if="q.active" name="univie-stop2" class="primary--text"></icon>
              <icon v-if="!q.active" name="univie-checkbox-unchecked" class="primary--text"></icon>
              <span :class="{ active: q.active }" class="facet-label primary--text">{{ $t(q.label) }}</span>
              <span class="facet-count grey--text" v-if="q.count > 0">({{q.count}})</span>
            </span>
            <ul v-if="q.active && q.childFacet" >
              <li v-for="(q1, k) in q.childFacet.queries" :key="k">
                <span @click="toggleFacet(q1,q.childFacet)">
                  <icon v-if="q1.active" name="univie-stop2" class="primary--text"></icon>
                  <icon v-if="!q1.active" name="univie-checkbox-unchecked" class="primary--text"></icon>
                  <span :class="{ active: q1.active }" class="facet-label primary--text">{{ $t(q1.label) }}</span>
                  <span class="facet-count grey--text" v-if="q1.count > 0">({{q1.count}})</span>
                </span>
                <ul v-if="q1.active && q1.childFacet" >
                  <li v-for="(q2, l) in q1.childFacet.queries" :key="l">
                    <span @click="toggleFacet(q2,q1.childFacet)">
                      <icon v-if="q2.active" name="univie-stop2" class="primary--text"></icon>
                      <icon v-if="!q2.active" name="univie-checkbox-unchecked" class="primary--text"></icon>
                      <span :class="{ active: q2.active }" class="facet-label primary--text">{{ $t(q2.label) }}</span>
                      <span class="facet-count grey--text" v-if="q2.count>0">({{q2.count}})</span>
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <v-row>
          <v-col>
            <v-row >
              <v-col>
                <icon @click.native="toggleOwnerFilter()" v-if="showOwnerFilter" name="univie-stop2" class="primary--text"></icon>
                <icon @click.native="toggleOwnerFilter()" v-if="!showOwnerFilter" name="univie-checkbox-unchecked" class="primary--text"></icon>
                <span @click="toggleOwnerFilter()" class="facet-label primary--text" :class="{ active: showOwnerFilter }">{{ $t('Owner') }}</span>
              </v-col>
            </v-row>
            <autocomplete
              v-if="showOwnerFilter"
              searchaction="search"
              placeholder="Search..."
              name="autocomplete"
              :initValue="owner"
              :suggester="'ownersuggester'"
              :customParams="{ token: 'dev' }"
              :classes="{ input: 'form-control', wrapper: 'input-wrapper'}"
              :onSelect="handleOwnerSelect"
            ></autocomplete>
          </v-col>
        </v-row>
      </li>
      <li>
        <v-row>
          <v-col>
            <v-row >
              <v-col>
                <icon @click.native="toggleAuthorFilter()" v-if="showAuthorFilter" name="univie-stop2" class="primary--text"></icon>
                <icon @click.native="toggleAuthorFilter()" v-if="!showAuthorFilter" name="univie-checkbox-unchecked" class="primary--text"></icon>
                <span @click="toggleAuthorFilter()" class="facet-label primary--text" :class="{ active: showAuthorFilter }">{{ $t('Authors') }}</span>
              </v-col>
            </v-row>
            <v-row  v-if="showAuthorFilter">
              <v-col cols="2">
                <icon name="material-social-person" class="primary--text" height="100%"></icon>
              </v-col>
              <v-col cols="10">
                <v-combobox
                  :placeholder="selectPlaceholder('persAuthors')"
                  chips
                  clearable
                  multiple
                  v-model="persAuthorsValues" />
              </v-col>
            </v-row>
            <v-row  v-if="showAuthorFilter">
              <v-col cols="2">
                <icon name="material-action-account-balance" class="primary--text" height="100%"></icon>
              </v-col>
              <v-col cols="10">
                <v-combobox
                  :placeholder="selectPlaceholder('corpAuthors')"
                  chips
                  clearable
                  multiple
                  v-model="corpAuthorsValues" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </li>
      <li>
        <v-row>
          <v-col>
            <v-row >
              <v-col>
                <icon @click.native="toggleRoleFilter()" v-if="showRoleFilter" name="univie-stop2" class="primary--text"></icon>
                <icon @click.native="toggleRoleFilter()" v-if="!showRoleFilter" name="univie-checkbox-unchecked" class="primary--text"></icon>
                <span @click="toggleRoleFilter()" class="facet-label primary--text" :class="{ active: showRoleFilter }">{{ $t('Roles') }}</span>
              </v-col>
            </v-row>
            <v-row v-if="showRoleFilter">
              <v-select
                :placeholder="$t('Add role') + '...'"
                :hint="$t('Personal')"
                :items="marcRolesArray"
                v-model="selectedRole.pers"
                @input="addRoleFilter('pers')"
                :menu-props="{maxHeight:'400'}"
                persistent-hint
              ></v-select>
              <v-select
                :placeholder="$t('Add role') + '...'"
                :hint="$t('Corporate')"
                :items="marcRolesArray"
                v-model="selectedRole.corp"
                @input="addRoleFilter('corp')"
                :menu-props="{maxHeight:'400'}"
                persistent-hint
              ></v-select>
              <div v-for="(role, i) in roles" :key="i" v-if="roles.length > 0" >
                <v-row >
                  <v-col cols="2">
                    <icon v-if="role.type==='pers'" name="material-social-person" class="primary--text" height="100%"></icon>
                    <icon v-if="role.type==='corp'" name="material-action-account-balance" class="primary--text" height="100%"></icon>
                  </v-col>
                  <v-col cols="8">
                    <v-combobox
                      :placeholder="$t('ADD_PREFIX') + ' '  + $t(role.label) + ' ' + $t('ADD_SUFFIX') + '...'"
                      chips
                      clearable
                      multiple
                      :items="role.values"
                      v-model="role.values"
                      @input="setRoleFilterValues(role)" />
                  </v-col>
                  <v-col cols="2">
                    <icon name="material-navigation-close" class="primary--text" height="100%" @click.native="removeRoleFilter(role)"></icon>
                  </v-col>
                </v-row>
              </div>
            </v-row>

          </v-col>
        </v-row>
      </li>
    </ul>
  </v-container>
</template>

<script>
import Autocomplete from './Autocomplete'
import '@/compiled-icons/univie-stop2'
import '@/compiled-icons/univie-checkbox-unchecked'
import '@/compiled-icons/material-action-account-balance'
import '@/compiled-icons/material-social-person'
import '@/compiled-icons/material-navigation-close'
import { marcRoles } from './filters'
import { toggleFacet, showFacet } from './facets'

export default {
  name: 'search-filters',
  components: {
    Autocomplete
  },
  computed: {
    persAuthorsValues: {
      get () {
        return this.persAuthors.values()
      },
      set (values) {
        this.persAuthors[0].values = values
      }
    },
    corpAuthorsValues: {
      get () {
        return this.corpAuthors.values()
      },
      set (values) {
        // it seems chips are manipulating the array directly anyways
        // maybe should provide own filtering function
        this.corpAuthors[0].values = values
      }
    }
  },
  props: {
    search: {
      type: Function,
      required: true
    },
    facetQueries: {
      type: Array,
      required: true
    },
    persAuthors: {
      type: Array,
      required: true
    },
    corpAuthors: {
      type: Array,
      required: true
    },
    rolesProp: {
      type: Array,
      required: true
    },
    ownerProp: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showOwnerFilter: false,
      showAuthorFilter: false,
      showRoleFilter: false,
      selectedRole: { pers: '', corp: '' },
      marcRoles,
      marcRolesArray: [],
      roles: [],
      owner: ''
    }
  },
  methods: {
    showFacet: function (f) {
      showFacet(f)
      this.search({ facetQueries: this.facetQueries })
    },
    toggleFacet: function (q, f) {
      toggleFacet(q, f)
      this.search({ page: 1, facetQueries: this.facetQueries })
    },
    handleOwnerSelect: function (query) {
      this.owner = query.payload
      this.search({ owner: this.owner })
    },
    toggleOwnerFilter: function () {
      this.showOwnerFilter = !this.showOwnerFilter
      if (!this.showOwnerFilter) {
        this.owner = '' // TODO change '' to null whereever it's used
        this.search({ owner: this.owner }) // TODO: should this be in if clause?
      }
    },
    toggleAuthorFilter: function () {
      this.showAuthorFilter = !this.showAuthorFilter
      if (!this.showAuthorFilter) {
        this.persAuthors[0].values = []
        this.corpAuthors[0].values = []
        this.search({ persAuthors: this.persAuthors, corpAuthors: this.corpAuthors }) // TODO: should this be in if clause?
      }
    },
    toggleRoleFilter: function () {
      this.showRoleFilter = !this.showRoleFilter
      if (!this.showRoleFilter) {
        this.roles = []
      }
      this.search({ roles: this.roles })
    },
    addRoleFilter: function (type) {
      if (this.selectedRole[type]) {
        this.roles.push({
          field: 'bib_roles_' + type + '_' + this.selectedRole[type],
          label: this.$t(this.marcRoles[this.selectedRole[type]]),
          values: [],
          type: type
        })
      }
    },
    removeRoleFilter: function (role) {
      this.roles.splice(this.roles.indexOf(role), 1)
      this.search({ roles: this.roles })
    },
    setRoleFilterValues: function (role) {
      this.roles[this.roles.indexOf(role)].values = role.values
      this.search({ roles: this.roles })
    },
    removeRoleFilterValue: function (role, value) {
      this.roles[this.roles.indexOf(role)].values.splice(this.roles[this.roles.indexOf(role)].values.indexOf(value), 1)
      this.search({ roles: this.roles })
    },
    selectPlaceholder: function (source) {
      let label = ''
      if (this[source].length) {
        label = this[source][0].label
      } else {
        console.warn(`Label for ${source} not found`, this[source]) // eslint-disable-line no-console
      }
      return this.$t('ADD_PREFIX') + ' ' +
        this.$t(label) + ' ' +
        this.$t('ADD_SUFFIX') + '...'
    }
  },
  mounted () {
    for (let role in this.marcRoles) {
      this.marcRolesArray.push({ value: role, text: this.$t(this.marcRoles[role]) })
    }
  },
  watch: {
    rolesProp: function (v) {
      this.roles = v
      if (v.length) {
        this.showRoleFilter = true
      }
    },
    ownerProp: function (v) {
      this.owner = v
      if (v.length) {
        this.showOwnerFilter = true
      }
    },
    persAuthors: function (v) {
      if (v[0].values.length) {
        this.showAuthorFilter = true
        // this.selectedRole.pers // TODO might need something like this
      }
    },
    corpAuthors: function (v) {
      if (v[0].values.length) {
        this.showAuthorFilter = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  padding-top: 1em
  padding-left: 0

ul
  list-style: none
  padding-left: 1em

.facet-label
  cursor: pointer

.facet-count
  margin-left: 5px

svg
  margin-bottom: 3px
  cursor: pointer

svg.primary--text
  margin-right: 4px
</style>
