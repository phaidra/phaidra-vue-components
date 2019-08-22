<template>

  <v-data-table
    :headers="headers"
    :items="templates"
    :loading="loading"
    class="elevation-1"
  >
    <template v-slot:item.name="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">{{ item.name }}</span>
        </template>
        <span>{{ item.tid }}</span>
      </v-tooltip>
    </template>
    <template v-slot:item.created="{ item }">
      {{ item.created | unixtime }}
    </template>
    <template v-slot:item.load="{ item }">
      <v-btn text color="primary" @click="loadTemplate(item.tid)">{{ $t('Load') }}</v-btn>
      <v-btn text color="grey" @click="deleteTemplate(item.tid)">{{ $t('Delete') }}</v-btn>
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
          console.log(error)
          self.loading = false
        })
      return promise
    },
    deleteTemplate: function (tid) {
      if (confirm(this.$t('Are you sure you want to delete this template?'))) {
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
            console.log(error)
            self.loading = false
          })
        return promise
      }
    },
    loadTemplates: function () {
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
          console.log(error)
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
