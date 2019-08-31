<template>
  <v-dialog v-model="dialog" width="700px">
    <v-card>
      <v-card-title class="grey white--text">{{ $t('Select a list') }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="listsSearch"
          append-icon="search"
          :label="$t('Search...')"
          single-line
          hide-details
          class="mb-4"
        ></v-text-field>
        <v-data-table
          hide-default-header
          :headers="listsHeaders"
          :items="lists"
          :search="listsSearch"
          :loading="loading"
          :loading-text="$t('Loading...')"
        >
          <template v-slot:item.name="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">{{ item.name }}</span>
              </template>
              <span>{{ item.listid }}</span>
            </v-tooltip>
          </template>
          <template v-slot:item.created="{ item }">
            {{ item.created | unixtime }}
          </template>
          <template v-slot:item.updated="{ item }">
            {{ item.updated | unixtime }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn text color="primary" @click="selectList(item)">{{ $t('Select') }}</v-btn>
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
  name: 'list-dialog',
  computed: {
    instance: function () {
      return this.$store.state.instanceconfig
    }
  },
  data () {
    return {
      dialog: false,
      loading: false,
      listsSearch: '',
      listsHeaders: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Created', align: 'right', value: 'created' },
        { text: 'Updated', align: 'right', value: 'updated' },
        { text: 'Actions', align: 'right', value: 'actions', sortable: false }
      ],
      lists: []
    }
  },
  methods: {
    open: async function () {
      this.dialog = true
      this.loading = true
      try {
        let response = await fetch(this.instance.api + '/lists', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'X-XSRF-TOKEN': this.$store.state.user.token
          }
        })
        let json = await response.json()
        this.lists = json.lists
        this.loading = false  
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    selectList: function (item) {
      this.$emit('list-selected', item)
      this.dialog = false
    }
  }
}
</script>
