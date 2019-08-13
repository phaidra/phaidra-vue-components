<template>

  <v-data-table
    :headers="headers"
    :items="templates"
    :loading="loading"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ props.item.name }}</span>
          </template>
          <span>{{ props.item.tid }}</span>
        </v-tooltip>
      </td>
      <td class="text-xs-right">{{ props.item.created | unixtime }}</td>
      <td class="text-xs-right" >
        <v-btn flat color="primary" @click="loadTemplate(props.item.tid)">{{ $t('Load') }}</v-btn>
        <v-btn flat color="grey" @click="deleteTemplate(props.item.tid)">{{ $t('Delete') }}</v-btn>
        <!-- for some reason opening the dialog from here causes infinite cycle.. looks like vuetify bug..
        <v-dialog v-model="deletetempconfirm" width="300" >
          <template v-slot:activator="{ on }">
            <v-btn flat color="grey" v-on="on">{{ $t('Delete') }}</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title >{{ $t('Delete') }}</v-card-title>
            <v-card-text>{{ $t('Are you sure you want to delete template') }} "{{props.item.name}}" ?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" class="white--text" :loading="loading" :disabled="loading" @click="deleteTemplate(props.item.tid)">{{ $t('Delete') }}</v-btn>
              <v-btn :disabled="loading" @click="deletetempconfirm = false">{{ $t('Cancel') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        -->
      </td>
    </template>
  </v-data-table>

</template>

<script>

export default {
  name: 'p-t-list',
  data () {
    return {
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Created', align: 'right', value: 'created' },
        { text: 'Actions', align: 'right', value: 'load', sortable: false }
      ],
      templates: [],
      deletetempconfirm: false,
      loading: false
    }
  },
  methods: {
    loadTemplate: function (tid) {
      var self = this
      this.loading = true
      var url = self.$store.state.instanceconfig.api + '/jsonld/template/' + tid
      var promise = fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'X-XSRF-TOKEN': this.$store.state.user.token
        }
      })
      .then(function (response) { return response.json() })
      .then(function (json) {
        if (json.alerts && json.alerts.length > 0) {
          self.$store.commit('setAlerts', json.alerts)
        }
        self.$emit('load-template', json.template.form)
        self.loading = false
      })
      .catch(function (error) {
        //console.log(error)
        self.loading = false
      })
      return promise
    },
    deleteTemplate: function (tid) {
      var self = this
      this.loading = true
      var url = self.$store.state.instanceconfig.api + '/jsonld/template/' + tid + '/remove'
      var promise = fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'X-XSRF-TOKEN': this.$store.state.user.token
        }
      })
      .then(function (response) { return response.json() })
      .then(function (json) {
         if (json.alerts && json.alerts.length > 0) {
          self.$store.commit('setAlerts', json.alerts)
        }
        self.loading = false
        self.deletetempconfirm = false
        self.loadTemplates()
      })
      .catch(function (error) {
        //console.log(error)
        self.loading = false
      })
      return promise
    },
    loadTemplates: function (pid) {
      var self = this
      this.loading = true
      var url = self.$store.state.instanceconfig.api + '/jsonld/templates'
      var promise = fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'X-XSRF-TOKEN': this.$store.state.user.token
        }
      })
      .then(function (response) { return response.json() })
      .then(function (json) {
        self.templates = json.templates
        self.loading = false
      })
      .catch(function (error) {
        //console.log(error)
        self.loading = false
      })
      return promise
    }
  },
  mounted: function () {
    if (this.$store.state.user.token) {
      this.loadTemplates()
    }
  }
}
</script>
