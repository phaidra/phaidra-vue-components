<template>

  <v-data-table
    :headers="headers"
    :items="templates"
    :loading="true"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.created }}</td>
      <td class="text-xs-right">{{ props.item.tid }}</td>
      <td class="text-xs-center" @click="$emit('load-template', props.item.tid)">{{ $t('load') }}</td>
      <td class="justify-left" @click="deleteTemplate(props.item.tid)"><v-icon small>delete</v-icon></td>
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
        { text: 'Template ID', align: 'right', value: 'tid' },
        { text: 'Load', align: 'right', value: 'load', sortable: false },
        { text: 'Delete', align: 'right', value: 'delete', sortable: false  }
      ],
      templates: [],
      loading: false
    }
  },
  methods: {
    loadTemplate: function (tid) {
      var self = this
      this.loading = true
      var url = self.$store.state.settings.instance.api + '/jsonld/template/' + tid
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
      var url = self.$store.state.settings.instance.api + '/jsonld/template/' + tid + '/remove'
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
      var url = self.$store.state.settings.instance.api + '/jsonld/templates'
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
