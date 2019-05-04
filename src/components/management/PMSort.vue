<template>
  <v-card >
    <v-card-title class="subheading grey white--text">{{ $t('Sort') }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <v-flex>{{ $t('Here you can sort members of this object.') }}</v-flex>
      <v-data-table
        :headers="headers"
        :items="members"
        :loading="loading"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.dc_title[0] }}</td>
          <td class="text-xs-right">{{ props.item.created | unixtime }}</td>
          <td class="text-xs-right">{{ props.item.pid }}</td>
          <td class="text-xs-right" ><v-btn :to="{ name: router-link-manage, params: { pid: props.item.pid }}" color="primary" raised>{{ $t('manage') }}</v-btn><v-btn flat color="red" @click="deleteObject(props.item.pid)">{{ $t('delete') }}</v-btn></td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: 'p-m-sort',
  props: {
    pid: {
      type: String,
      required: true
    }
  },
  computed: {
    instance: function() {
      return this.$store.state.settings.instance
    }
  },
  data () {
    return {
      headers: [
        { text: 'Title', align: 'left', value: 'name' },
        { text: 'Created', align: 'right', value: 'created' },
        { text: 'PID', align: 'rght', value: 'pid' },
        { text: 'Actions', align: 'right', value: 'load', sortable: false }
      ],
      members: [],
      loading: false
    }
  },
  methods: {
    sort: function (tid) {
      var self = this
      
    },
    loadMembers: function (pid) {
      var self = this
      this.loading = true
      for (let member of self.members) {
        member['jsonld'] = {}
      }

      var params = {
        q: 'ismemberof:"' + pid + '"',
        defType: 'edismax',
        wt: 'json',
        qf: 'ismemberof^5',
        fl: 'pid,cmodel'
      }

      var query = qs.stringify(params, { encodeValuesOnly: true, indices: false })
      var url = self.instance.solr + '/select?' + query
      var promise = fetch(url, {
        method: 'GET',
        mode: 'cors'
      })
      .then(function (response) { return response.json() })
      .then(function (json) {
        if (json.response.numFound > 0) {
          self.members = json.response.docs
        } else {
          self.members = []
        }
        self.loading = false
      })
      .catch(function (error) {
        self.loading = false
        console.log(error)
      })

      return promise
    }
  },
  mounted: function () {
    if (this.$store.state.user.token) {
      this.loadMembers(pid)
    }
  }
}
</script>
