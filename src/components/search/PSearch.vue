<template>
    <v-layout row >
      <v-flex xs9 class="border-right" pr-2>
        <v-layout column>
          <v-flex xs9 offset-xs2>
            <autocomplete
              placeholder="Search..."
              name="autocomplete"
              :initValue="query"
              :suggester="'titlesuggester'"
              :customParams="{ token: 'dev' }"
              :classes="{ input: 'form-control', wrapper: 'input-wrapper'}"
              :onSelect="handleSelect"
            ></autocomplete>
          </v-flex>

          <v-flex xs12 class="pt-5">
            <v-layout row>
              <v-flex xs2><span>{{ total }} {{ $t('objects') }}</span></v-flex>
              <v-flex xs6>
                <v-pagination v-if="total>pagesize" v-bind:length.number="totalPages" total-visible="9" v-model="page" class="mb-3" flat></v-pagination>
              </v-flex>
              <v-flex xs4>
                <v-container grid-list-md>
                  <v-layout row wrap>
                    <v-flex>
                      <v-tooltip bottom>
                        <icon @click.native="setSort('title asc')" name="fontello-sort-name-up" :color="sortIsActive('title asc') ? '#1A74B0' : '#777777'" slot="activator"></icon>
                        <span>{{ $t('Title ascending')}}</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex>
                      <v-tooltip bottom>
                        <icon @click.native="setSort('title desc')" name="fontello-sort-name-down" :color="sortIsActive('title desc') ? '#1A74B0' : '#777777'" slot="activator"></icon>
                        <span>{{ $t('Title descending')}}</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex>
                      <v-tooltip bottom>
                        <icon @click.native="setSort('created asc')" name="fontello-sort-number-up" :color="sortIsActive('created asc') ? '#1A74B0' : '#777777'" slot="activator"></icon>
                        <span>{{ $t('Upload date ascending')}}</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex>
                      <v-tooltip bottom>
                        <icon @click.native="setSort('created desc')" name="fontello-sort-number-down" :color="sortIsActive('created desc') ? '#1A74B0' : '#777777'" slot="activator"></icon>
                        <span>{{ $t('Upload date descending')}}</span>
                      </v-tooltip>
                    </v-flex>
                    <v-flex>
                      <v-dialog v-model="linkdialog" max-width="800px">
                        <v-card>
                          <v-card-title>
                            <h3 class="display-2">{{ $t('Link to search results') }}</h3>
                          </v-card-title>
                          <v-card-text>{{ searchDef.link }}</v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" flat @click.stop="linkdialog=false">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-tooltip bottom>
                        <icon @click.native="linkdialog=true" name="material-content-link" slot="activator"></icon>
                        <span>{{ $t('Link to search results')}}</span>
                      </v-tooltip>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
            <v-flex v-if="inCollection" class="display-2 primary--text">{{ $t('Members of') }} {{ inCollection }} <icon name="material-navigation-close" class="primary--text" height="100%" @click.native="removeCollectionFilter()"></icon></v-flex>
            <search-results></search-results>
            <v-flex class="text-xs-center">
              <v-pagination v-if="total>pagesize" v-bind:length.number="totalPages" total-visible="13" v-model="page" class="mb-3"></v-pagination>
            </v-flex>
          </v-flex>

        </v-layout>

      </v-flex>
      <v-flex xs3 class="pa-2">
        <h3 class="border-bottom display-2 pa-2 primary--text">Filters</h3>
        <search-filters></search-filters>
      </v-flex>
    </v-layout>
</template>

<script>
import Autocomplete from './Autocomplete'
import SearchResults from './SearchResults'
import SearchFilters from './SearchFilters'
// import '@/compiled-icons/fontello-sort-name-up'
// import '@/compiled-icons/fontello-sort-name-down'
// import '@/compiled-icons/fontello-sort-number-up'
// import '@/compiled-icons/fontello-sort-number-down'
// import '@/compiled-icons/material-content-link'
// import '@/compiled-icons/material-action-bookmark'

export default {
  name: 'p-search',
  components: {
    Autocomplete,
    SearchResults,
    SearchFilters
  },
  computed: {
    query: function () {
      return this.$store.state.search.q
    },
    page: {
      get () {
        return this.$store.state.search.page
      },
      set (value) {
        this.$store.dispatch('setPage', value)
      }
    },
    totalPages: function () {
      return Math.ceil(this.$store.state.search.total / this.$store.state.search.pagesize)
    },
    total: function () {
      return this.$store.state.search.total
    },
    pagesize: function () {
      return this.$store.state.search.pagesize
    },
    searchDef: function () {
      return this.$store.state.search.searchDef
    },
    inCollection: function () {
      return this.$store.state.search.collection
    }
  },
  methods: {
    handleSelect: function (query) {
      this.$store.commit('setQuery', query.term)
      this.$store.dispatch('search').then(() => {
        window.history.replaceState('Search', 'Search results', this.searchDef.link)
      })
    },
    setSort: function (sort) {
      this.$store.dispatch('setSort', sort)
    },
    sortIsActive: function (sort) {
      for (var i = 0; i < this.$store.state.search.sortdef.length; i++) {
        if (this.$store.state.search.sortdef[i].id === sort) {
          return this.$store.state.search.sortdef[i].active
        }
      }
    },
    removeCollectionFilter: function () {
      this.$store.dispatch('setCollection', '')
    }
  },
  beforeCreate: function () {
    // this.$store.commit('setSearchParams', this.$route.query) FIXME this.$route is not defined
    this.$store.dispatch('search')
  },
  props: {
    label: {
      type: String,
      required: false
    },
  },
  data () {
    return {
      linkdialog: false
    }
  },
  mounted: function () {
    console.log('mounted')
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
