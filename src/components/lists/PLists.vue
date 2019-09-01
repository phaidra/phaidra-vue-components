<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="title font-weight-light grey white--text">
            {{ $t('Manage object lists') }}
            <div class="flex-grow-1"></div>
          </v-card-title>
          <v-card-text>
            <v-data-table
              hide-default-header
              :headers="listsHeaders"
              :items="lists"
              :search="listsSearch"
              :loading="listsLoading"
              :loading-text="$t('Loading object lists...')"
            >
            <template v-slot:top>
              <v-toolbar flat>
                <v-text-field
                  v-model="listsSearch"
                  append-icon="search"
                  :label="$t('Search...')"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="createDialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">{{ $t('New list') }}</v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="title font-weight-light grey white--text">
                      {{ $t('Create new object list') }}
                    </v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-model="newListName"
                        :label="$t('Enter object list name...')"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn dark @click="createDialog = false" color="grey">{{ $t('Cancel') }}</v-btn>
                      <v-btn @click="createList()" color="primary">{{ $t('Create') }}</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
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
                <v-btn text color="primary" @click="loadedList = item">{{ $t('Select') }}</v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="loadedList">
      <v-card>
        <v-card-title>
          {{ loadedList.name }}
          <div class="flex-grow-1"></div>
          <v-text-field
            v-model="membersSearch"
            append-icon="search"
            :label="$t('Search...')"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          hide-default-header
          :headers="membersHeaders"
          :items="members"
          :search="membersSearch"
          :loading="membersLoading"
          :loading-text="$t('Loading object list members...')"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn text color="primary" @click="removeMember(item)">{{ $t('Remove') }}</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'p-lists',
  computed: {
    instance: function () {
      return this.$store.state.instanceconfig
    }
  },
  watch: {
    selectedList: async function () {
      if (this.loadedList) {
        this.membersLoading = true
        try {
          let response = await fetch(this.instance.api + '/list/' + loadedList.listid, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'X-XSRF-TOKEN': this.$store.state.user.token
            }
          })
          let json = await response.json()
          if ( response.status === 200 ) {
            this.members = json.members
          } else {
            if (json.alerts && json.alerts.length > 0) {
              this.$store.commit('setAlerts', json.alerts)
            }
          }
          this.membersLoading = false  
        } catch (error) {
          console.log(error)
          this.membersLoading = false
        }
      }
    }
  },
  data () {
    return {
      createDialog: false,
      newListName: '',
      listsLoading: false,
      listsSearch: '',
      deleteListConfirm: false,
      listsHeaders: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Created', align: 'right', value: 'created' },
        { text: 'Updated', align: 'right', value: 'updated' },
        { text: 'Actions', align: 'right', value: 'actions', sortable: false }
      ],
      lists: [],
      loadedList: null,
      membersLoading: false,
      membersSearch: '',
      deleteMembersConfirm: false,
      membersHeaders: [
        { text: 'PID', align: 'left', value: 'pid' },
        { text: 'Title', align: 'right', value: 'title' },
        { text: 'Actions', align: 'right', value: 'actions', sortable: false }
      ],
      members: []
    }
  },
  methods: {
    createList: async function () {
      try {
        this.createDialog = false
        this.listsLoading = true
        var httpFormData = new FormData()
        httpFormData.append('name', this.newListName)
        let response = await fetch(this.instance.api + '/list/add', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'X-XSRF-TOKEN': this.$store.state.user.token
          },
          body: httpFormData
        })
        let json = await response.json()
        if ( response.status !== 200 ) {
          if (json.alerts && json.alerts.length > 0) {
            this.$store.commit('setAlerts', json.alerts)
          }
        } else {
          this.newListName = ''
        }
        response = await fetch(this.instance.api + '/lists', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'X-XSRF-TOKEN': this.$store.state.user.token
          }
        })
        json = await response.json()
        if ( response.status === 200 ) {
          this.lists = json.lists
        }
        this.listsLoading = false  
      } catch (error) {
        console.log(error)
        this.listsLoading = false
      }
    },
    deleteList: async function (listid) {
      if (confirm(this.$t('Are you sure you want to delete this object list?'))) {
        try {
          let response = await fetch(this.instance.api + '/list/' + listid + '/remove', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'X-XSRF-TOKEN': this.$store.state.user.token
            }
          })
          let json = await response.json()
          if ( response.status !== 200 ) {
            if (json.alerts && json.alerts.length > 0) {
              this.$store.commit('setAlerts', json.alerts)
            }
          }
          response = await fetch(this.instance.api + '/lists', {
            method: 'GET',
            mode: 'cors',
            headers: {
              'X-XSRF-TOKEN': this.$store.state.user.token
            }
          })
          json = await response.json()
          if ( response.status === 200 ) {
            this.lists = json.lists
          }
          this.listsLoading = false  
        } catch (error) {
          console.log(error)
          this.listsLoading = false
        }
      }
    },
    removeMember: async function (member) {
      try {
        this.membersLoading = true
        var httpFormData = new FormData()
        httpFormData.append('members', JSON.stringify([{ pid: member.pid}]))
        let response = await fetch(this.instance.api + '/list/' + loadedList.listid + '/members/remove', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'X-XSRF-TOKEN': this.$store.state.user.token
          },
          body: httpFormData
        })
        let json = await response.json()
        if ( response.status !== 200 ) {
          if (json.alerts && json.alerts.length > 0) {
            this.$store.commit('setAlerts', json.alerts)
          }
        }
        response = await fetch(this.instance.api + '/list/' + loadedList.listid, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'X-XSRF-TOKEN': this.$store.state.user.token
          }
        })
        json = await response.json()
        if ( response.status === 200 ) {
          this.members = json.members
        }
        this.membersLoading = false  
      } catch (error) {
        console.log(error)
        this.membersLoading = false
      }
    }
  },
  beforeRouteEnter: async function (to, from, next) {
    next(async vm => {
      vm.listsLoading = true
      try {
        let response = await fetch(vm.instance.api + '/lists', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'X-XSRF-TOKEN': vm.$store.state.user.token
          }
        })
        let json = await response.json()
        if ( response.status === 200 ) {
          vm.lists = json.lists
        } else {
          if (json.alerts && json.alerts.length > 0) {
            vm.$store.commit('setAlerts', json.alerts)
          }
        }
        vm.listsLoading = false  
      } catch (error) {
        console.log(error)
        vm.listsLoading = false
      }
    })
  }
}
</script>
