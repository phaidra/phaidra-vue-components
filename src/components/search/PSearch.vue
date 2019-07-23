<template>
    <v-layout row >
      <v-flex xs9 class="border-right" pr-2>
        <v-layout column>
          <v-flex xs9 offset-xs2>
            <autocomplete
              placeholder="Search..."
              name="autocomplete"
              :initValue="q"
              :suggester="'titlesuggester'"
              :customParams="{ token: 'dev' }"
              :classes="{ input: 'form-control', wrapper: 'input-wrapper'}"
              :onSelect="handleSelect"
            ></autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-layout row class="pt-3 pb-2">
              <v-flex xs2><span>{{ total }} {{ $t('objects') }}</span></v-flex>
              <v-spacer />
              <v-flex xs4>
                <search-toolbar
                  :setSort="setSort"
                  :sortIsActive="sortIsActive"
                  :link="link" />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-pagination
                v-if="total>pagesize"
                v-bind:length="totalPages"
                total-visible="10"
                v-model="page"
                class="mb-3"
                flat />
            </v-layout>
            <v-flex v-if="inCollection" class="display-2 primary--text">{{ $t('Members of') }} {{ inCollection }} <icon name="material-navigation-close" class="primary--text" height="100%" @click.native="removeCollectionFilter()"></icon></v-flex>
            <search-results :docs="docs"></search-results>
            <v-flex class="text-xs-center">
              <v-pagination
                v-if="total>pagesize"
                v-bind:length="totalPages"
                total-visible="10"
                v-model="page"
                class="mb-3" />
            </v-flex>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs3 class="pa-2">
        <h3 class="border-bottom display-2 pa-2 primary--text">Filters</h3>
        <search-filters
          :search="search"
          :facetQueries="facetQueries"
          :pers_authors="pers_authors"
          :corp_authors="corp_authors"
          :rolesProp="roles"
          :ownerProp="owner"
          ></search-filters>
      </v-flex>
    </v-layout>
</template>

<script>
import qs from 'qs'
import Autocomplete from './Autocomplete'
import SearchResults from './SearchResults'
import SearchFilters from './SearchFilters'
import SearchToolbar from './SearchToolbar'
import '@/compiled-icons/fontello-sort-name-up'
import '@/compiled-icons/fontello-sort-name-down'
import '@/compiled-icons/fontello-sort-number-up'
import '@/compiled-icons/fontello-sort-number-down'
import '@/compiled-icons/material-content-link'
import '@/compiled-icons/material-action-bookmark'
import { facetQueries, updateFacetQueries, pers_authors, corp_authors } from './facets'
import { buildParams, buildSearchDef, sortdef } from './utils'
import { setSearchParams } from './location'

export default {
  name: 'p-search',
  components: {
    Autocomplete,
    SearchResults,
    SearchFilters,
    SearchToolbar
  },
  computed: {
    page: {
      get () {
        return this.currentPage
      },
      set (value) {
        this.currentPage = value
        this.search()
      }
    },
    totalPages: function () {
      return Math.ceil(this.total / this.pagesize)
    },
    solr: function () { // TODO: pass in app settings
      return this.$root.$store.state.settings.instance.solr
    },
  },
  props: {
    collection: {
      type: String,
      default: ''
    }
  },
  methods: {
    search: async function (options) {
      // `options` are combined into the PSearch component. The later are sent
      // over from child components: e.g. SearchFilters.
      // This allows us the buildSearchDef/buildParams functions to pick out
      // whatever properties they might need.

      // exclude 'collection' from above manipulation, since it's passed a prop
      let { collection } = options || {}
      if (collection) {
        this.inCollection = collection
        delete options.collection
      }

      Object.assign(this, options)

      let { searchdefarr, ands } = buildSearchDef(this)
      let params = buildParams(this, ands)
      
      this.link = location.protocol + '//' + location.host + '/#/search?' + searchdefarr.join('&')
      window.history.replaceState(null, this.$t('Search results'), this.link)
      
      let query = qs.stringify(params, { encodeValuesOnly: true, indices: false })
      let url = this.solr + '/select?' + query
      let response = await fetch(url, { method: 'GET', mode: 'cors' })
      let json = await response.json()
      this.docs = json.response.docs
      this.total = json.response.numFound
      this.facet_counts = json.facet_counts
      updateFacetQueries(json.facet_counts.facet_queries, facetQueries)
    },
    handleSelect: function ({ term, payload }) {
      // called from Autocomplete
      // When an item has been clicked on explicitly - issue a quoted search on it's title,
      // otherwise too many unrealted results are returned
      this.q = payload ? `"${payload}"` : term
      this.search()
    },
    setSort: function (sort) {
      for (let i = 0; i < this.sortdef.length; i++) {
        if (this.sortdef[i].id === sort) {
          this.sortdef[i].active = !this.sortdef[i].active
        } else {
          this.sortdef[i].active = false
        }
      }
      this.search()
    },
    sortIsActive: function (sort) {
      for (let i = 0; i < this.sortdef.length; i++) {
        if (this.sortdef[i].id === sort) {
          return this.sortdef[i].active
        }
      }
    },
    removeCollectionFilter: function () {
      this.inCollection = ''
      this.search()
    }
  },
  mounted: function () {
    setSearchParams(this, this.$route.query)
    
    // This call is delayed because at this point
    // `setInstanceSolr` has not yet been executed and
    // the solr url is missing.
    setTimeout(() => { this.search()} , 100)
  },
  watch: {
    collection: function (col) { // used by demo app
      this.inCollection = col
      this.search()
    }
  },
  data () {
    return {
      link: '',
      linkdialog: false,
      q: '',
      inCollection: this.collection,
      currentPage: 1,
      pagesize: 10,
      sortdef,
      lang: 'en',
      facetQueries,
      
      corp_authors,
      pers_authors,
      roles: [],
      owner: '',
      
      docs: [],
      total: 0,
      facet_counts: null,
    }
  }
}
</script>

<style scoped>
.border-right {
  border-right: 1px solid #bdbdbd;
}

.border-bottom {
  border-bottom: 1px solid #bdbdbd;
}

svg {
  cursor: pointer
}
</style>
