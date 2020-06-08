<template>
  <v-container>
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
        <v-row no-gutters>
          <v-col>
            <icon @click.native="toggleOwnerFilter()" v-if="showOwnerFilter" name="univie-stop2" class="primary--text"></icon>
            <icon @click.native="toggleOwnerFilter()" v-if="!showOwnerFilter" name="univie-checkbox-unchecked" class="primary--text"></icon>
            <span @click="toggleOwnerFilter()" class="facet-label primary--text" :class="{ active: showOwnerFilter }">{{ $t('Owner') }}</span>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <p-search-autocomplete
            class="mt-4"
            v-if="showOwnerFilter"
            searchaction="search"
            placeholder="Search..."
            name="autocomplete"
            :initValue="owner"
            :suggester="'ownersuggester'"
            :customParams="{ token: 'dev' }"
            :classes="{ input: 'form-control', wrapper: 'input-wrapper'}"
            :onSelect="handleOwnerSelect"
          ></p-search-autocomplete>
        </v-row>
      </li>
      <li>
        <v-row no-gutters>
          <v-col>
            <icon @click.native="toggleAuthorFilter()" v-if="showAuthorFilter" name="univie-stop2" class="primary--text"></icon>
            <icon @click.native="toggleAuthorFilter()" v-if="!showAuthorFilter" name="univie-checkbox-unchecked" class="primary--text"></icon>
            <span @click="toggleAuthorFilter()" class="facet-label primary--text" :class="{ active: showAuthorFilter }">{{ $t('Authors') }}</span>
          </v-col>
        </v-row>
        <v-row no-gutters v-if="showAuthorFilter">
          <v-col cols="12">
            <v-combobox
              class="mt-4"
              :placeholder="$t('ADD_PREFIX') + ' '  + $t('Author') + ' ' + $t('ADD_SUFFIX') + '...'"
              :hint="$t('Personal')"
              persistent-hint
              chips
              clearable
              deletable-chips
              multiple
              filled
              single-line
              v-model="persAuthors.values"
              @input="setPersAuthors()"/>
          </v-col>
        </v-row>
        <v-row no-gutters v-if="showAuthorFilter">
          <v-col cols="12">
            <v-combobox
              class="mt-4"
              :placeholder="$t('ADD_PREFIX') + ' '  + $t('Author') + ' ' + $t('ADD_SUFFIX') + '...'"
              :hint="$t('Corporate')"
              persistent-hint
              chips
              clearable
              deletable-chips
              multiple
              filled
              single-line
              v-model="corpAuthors.values"
              @input="setCorpAuthors()"/>
          </v-col>
        </v-row>
      </li>
      <li>
        <v-row no-gutters>
          <v-col>
            <icon @click.native="toggleRoleFilter()" v-if="showRoleFilter" name="univie-stop2" class="primary--text"></icon>
            <icon @click.native="toggleRoleFilter()" v-if="!showRoleFilter" name="univie-checkbox-unchecked" class="primary--text"></icon>
            <span @click="toggleRoleFilter()" class="facet-label primary--text" :class="{ active: showRoleFilter }">{{ $t('Roles') }}</span>
          </v-col>
        </v-row>
        <v-row no-gutters v-if="showRoleFilter">
          <v-select
            class="mt-4"
            :placeholder="$t('Add role') + '...'"
            :hint="$t('Personal')"
            :items="marcRolesArray"
            v-model="selectedRole.pers"
            @input="addRoleFilter('pers')"
            :menu-props="{maxHeight:'400'}"
            persistent-hint
            filled
            single-line
          ></v-select>
          <v-select
            class="mt-4"
            :placeholder="$t('Add role') + '...'"
            :hint="$t('Corporate')"
            :items="marcRolesArray"
            v-model="selectedRole.corp"
            @input="addRoleFilter('corp')"
            :menu-props="{maxHeight:'400'}"
            persistent-hint
            filled
            single-line
          ></v-select>
          <div v-for="(role, i) in roles" :key="i" v-if="roles.length > 0" >
            <v-row no-gutters>
              <v-col cols="10">
                <v-combobox
                  :hint="role.type === 'pers' ? $t('Personal') : $t('Corporate')"
                  persistent-hint
                  class="mt-4"
                  :placeholder="$t('ADD_PREFIX') + ' '  + $t(role.label) + ' ' + $t('ADD_SUFFIX') + '...'"
                  chips
                  clearable
                  deletable-chips
                  multiple
                  filled
                  single-line
                  :items="role.values"
                  v-model="role.values"
                  @input="setRoleFilterValues(role)"
                />
              </v-col>
              <v-col cols="2">
                <icon name="material-navigation-close" class="primary--text" height="100%" @click.native="removeRoleFilter(role)"></icon>
              </v-col>
            </v-row>
          </div>
        </v-row>
      </li>
    </ul>
  </v-container>
</template>

<script>
import PSearchAutocomplete from './PSearchAutocomplete'
import '@/compiled-icons/univie-stop2'
import '@/compiled-icons/univie-checkbox-unchecked'
import '@/compiled-icons/material-action-account-balance'
import '@/compiled-icons/material-social-person'
import '@/compiled-icons/material-navigation-close'
import { marcRoles } from './filters'
import { toggleFacet, showFacet } from './facets'

export default {
  name: 'p-search-filters',
  components: {
    PSearchAutocomplete
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
    persAuthorsProp: {
      type: Object,
      required: true
    },
    corpAuthorsProp: {
      type: Object,
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
      persAuthors: {},
      corpAuthors: {},
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
      if (query['payload']) {
        this.owner = query.payload
      } else {
        this.owner = query.term
      }
      this.search({ owner: this.owner })
    },
    toggleOwnerFilter: function () {
      this.showOwnerFilter = !this.showOwnerFilter
      if (!this.showOwnerFilter) {
        this.owner = '' // TODO change '' to null whereever it's used
        this.search({ owner: this.owner })
      }
    },
    toggleAuthorFilter: function () {
      this.showAuthorFilter = !this.showAuthorFilter
      if (!this.showAuthorFilter) {
        this.persAuthors.values = []
        this.corpAuthors.values = []
        this.search({ persAuthors: this.persAuthors, corpAuthors: this.corpAuthors })
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
    setPersAuthors: function () {
      this.search({ persAuthors: this.persAuthors })
    },
    setCorpAuthors: function () {
      this.search({ corpAuthors: this.corpAuthors })
    }
  },
  mounted () {
    for (let role in this.marcRoles) {
      this.marcRolesArray.push({ value: role, text: this.$t(this.marcRoles[role]) })
    }
    this.persAuthors = this.persAuthorsProp
    this.corpAuthors = this.corpAuthorsProp
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
      this.showOwnerFilter = v.length
    },
    persAuthorsProp: function (v) {
      this.persAuthors = v
      if (v.length) {
        this.showAuthorFilter = true
      }
    },
    corpAuthorsProp: function (v) {
      this.corpAuthors = v
      if (v.length) {
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
