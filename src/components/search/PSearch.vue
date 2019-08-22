<template>
    <v-row  >
      <v-col cols="9" class="border-right pr-2" >
        <v-row>
          <v-col cols="5">
            <autocomplete
              placeholder="Search..."
              name="autocomplete"
              :initValue="q"
              :suggester="'titlesuggester'"
              :customParams="{ token: 'dev' }"
              :classes="{ input: 'form-control', wrapper: 'input-wrapper'}"
              :onSelect="handleSelect"
              solo
            ></autocomplete>
          </v-col>
          <v-col cols="2" align-self="center"><span>{{ total }} {{ $t('objects') }}</span></v-col>
          <v-spacer></v-spacer>
          <v-col cols="4" align-self="center">
            <search-toolbar
              :setSort="setSort"
              :sortIsActive="sortIsActive"
              :link="link" />
          </v-col>
          <v-col cols="12">
            <v-col v-if="inCollection" class="title font-weight-light primary--text">{{ $t('Members of') }} {{ inCollection }} <icon name="material-navigation-close" class="primary--text" height="100%" @click.native="removeCollectionFilter()"></icon></v-col>
            <search-results :docs="docs"></search-results>
            <v-col class="text-center">
              <p-pagination
                v-if="total>pagesize"
                v-bind:length="totalPages"
                total-visible="10"
                v-model="page"
                class="mb-3" />
            </v-col>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="3" class="pa-2">
        <h3 class="title font-weight-light primary--text border-bottom pa-2">Filters</h3>
        <search-filters
          :search="search"
          :facetQueries="facetQueries"
          :persAuthorsProp="persAuthors"
          :corpAuthorsProp="corpAuthors"
          :rolesProp="roles"
          :ownerProp="owner"
          ></search-filters>
      </v-col>
    </v-row>
</template>

<script>
import qs from 'qs'
import Autocomplete from './Autocomplete'
import SearchResults from './SearchResults'
import SearchFilters from './SearchFilters'
import SearchToolbar from './SearchToolbar'
import PPagination from '../utils/PPagination'
import '@/compiled-icons/fontello-sort-name-up'
import '@/compiled-icons/fontello-sort-name-down'
import '@/compiled-icons/fontello-sort-number-up'
import '@/compiled-icons/fontello-sort-number-down'
import '@/compiled-icons/material-content-link'
import '@/compiled-icons/material-action-bookmark'
import { facetQueries, updateFacetQueries, persAuthors, corpAuthors } from './facets'
import { buildParams, buildSearchDef, sortdef } from './utils'
import { setSearchParams } from './location'

export default {
  name: 'p-search',
  components: {
    Autocomplete,
    SearchResults,
    SearchFilters,
    SearchToolbar,
    PPagination
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
      return this.$root.$store.state.instanceconfig.solr
    }
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

      this.link = location.protocol + '//' + location.host + '/search?' + searchdefarr.join('&')
      window.history.replaceState(null, this.$t('Search results'), this.link)

      let query = qs.stringify(params, { encodeValuesOnly: true, indices: false })
      let url = this.solr + '/select'
      let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: query
      })
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
    setTimeout(() => { this.search() }, 100)
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

      corpAuthors,
      persAuthors,
      roles: [],
      owner: '',

      docs: [],
      total: 0,
      facet_counts: null
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

.theme--light.v-pagination .v-pagination__item--active {
  box-shadow: none;
  -webkit-box-shadow: none;
}
</style>
