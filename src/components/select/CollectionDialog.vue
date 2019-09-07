<template>
  <v-dialog v-model="dialog" width="700px">
    <v-card>
      <v-card-title class="grey white--text">{{ $t('Select a collection') }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="collectionsSearch"
          append-icon="search"
          :label="$t('Search...')"
          single-line
          hide-details
          class="mb-4"
        ></v-text-field>
        <v-data-table
          hide-default-header
          :headers="collectionsHeaders"
          :items="collections"
          :search="collectionsSearch"
          :custom-filter="filterTitle"
          :loading="loading"
          :loading-text="$t('Loading...')"
          :items-per-page="5"
        >
          <template v-slot:item.title="{ item }">
            <span v-if="item.dc_title">{{ item.dc_title[0] | truncate(50) }}</span>
          </template>
          <template v-slot:item.created="{ item }">
            {{ item.created | date }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn text color="primary" @click="selectCollection(item)">{{ $t('Select') }}</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-container>
          <v-row justify="end" class="px-4">
            <v-btn color="grey" dark @click="dialog = false">{{ $t('Cancel') }}</v-btn>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import qs from 'qs'

export default {
  name: 'collection-dialog',
  computed: {
    instance: function () {
      return this.$store.state.instanceconfig
    }
  },
  data () {
    return {
      dialog: false,
      loading: false,
      collectionsSearch: '',
      collectionsHeaders: [
        { text: 'Pid', align: 'left', value: 'pid' },
        { text: 'Title', align: 'left', value: 'title' },
        { text: 'Created', align: 'right', value: 'created' },
        { text: 'Actions', align: 'right', value: 'actions', sortable: false }
      ],
      collections: []
    }
  },
  methods: {
    filterTitle (value, search, item) {
      if (item.dc_title) {
        if (item.dc_title.length > 0) {
          return item.dc_title[0].indexOf(search) !== -1
        } else {
          return false
        }
      } else {
        return false
      }
    },
    open: async function () {
      this.dialog = true
      this.loading = true
      try {
        let params = {
          q: '*:*',
          defType: 'edismax',
          wt: 'json',
          start: 0,
          rows: 1000,
          sort: 'created desc',
          fq: [ 'resourcetype:collection', 'owner:' + this.$store.state.user.username ]
        }
        let query = qs.stringify(params, { encodeValuesOnly: true, indices: false })
        let response = await fetch(this.instance.solr + '/select', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: query
        })
        let json = await response.json()
        this.collections = json.response.docs
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    selectCollection: function (item) {
      this.$emit('collection-selected', item)
      this.dialog = false
    }
  }
}
</script>