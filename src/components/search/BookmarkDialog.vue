<template>
  <v-dialog v-model="dialog" width="500px">
    <v-card>
      <v-card-title class="grey white--text">{{ $t('Select a bookmark list') }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="bookmarklistsearch"
          append-icon="search"
          :label="$t('Search...')"
          single-line
          hide-details
          class="mb-4"
        ></v-text-field>
        <v-data-table
          hide-default-header
          :headers="bookmarklistheaders"
          :items="bookmarklists"
          :search="bookmarklistsearch"
        >
          <template v-slot:item.name="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ item.name }}</span>
              </template>
              <span>{{ item.id }}</span>
            </v-tooltip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn text color="primary" @click="selectBookmarklist(item)">{{ $t('Select') }}</v-btn>
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
export default {
  name: 'bookmark-dialog',
  data () {
    return {
      dialog: false,
      bookmarklistsearch: '',
      bookmarklistheaders: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Actions', align: 'right', value: 'actions', sortable: false }
      ],
      bookmarklists: []
    }
  },
  methods: {
    open: function () {
      this.bookmarklists = [
        { id: 1, name: 'aaa' },
        { id: 2, name: 'bbb' }
      ]
      // hack, see https://github.com/vuetifyjs/vuetify/issues/7021
      // setTimeout(() => this.dialog = true);
      this.dialog = true
    },
    selectBookmarklist: function (item) {
      this.$emit('bookmarklist-selected', item)
      this.dialog = false
    }
  }
}
</script>
