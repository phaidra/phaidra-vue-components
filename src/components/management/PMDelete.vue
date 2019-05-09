<template>
  <v-card >
    <v-card-title class="subheading grey white--text">{{ $t('Delete') }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <v-alert :type="'info'" :value="true" transition="slide-y-transition" v-if="(cmodel === 'Container') || (cmodel === 'Collection') && (members.length > 0)">{{ $t('MEMBERS_DELETE_ALERT', { cmodel: cmodel, nrmembers: members.length }) }}</v-alert>
      <v-flex v-else>{{ $t('Here you can delete this object.') }}</v-flex>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-flex>
        <v-dialog v-model="dialog" width="500" >
          <template v-slot:activator="{ on }">
            <v-btn color="red" class="white--text" v-on="on" :disabled="(members.length > 0) || !pid || !cmodel">{{ $t('Delete') }}</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title >{{ $t('Delete') }}</v-card-title>
            <v-card-text>{{ $t('Are you sure you want to permanently delete object ') + 'https://' + instance.baseurl + '/' + pid + '?'}}</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" class="white--text" :loading="loading" :disabled="loading" @click="deleteObject(pid)">{{ $t('Delete') }}</v-btn>
              <v-btn :disabled="loading" @click="dialog = false">{{ $t('Cancel') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'p-m-delete',
  props: {
    pid: {
      type: String
    },
    cmodel: {
      type: String
    },
    members: {
      type: Array,
      default: []
    }
  },
  computed: {
    instance: function() {
      return this.$store.state.settings.instance
    }
  },
  data () {
    return {
      loading: false,
      dialog: false
    }
  },
  methods: {
    deleteObject: function (pid) {
      var self = this
      self.loading = true
      var url = self.$store.state.settings.instance.api + '/object/' + pid + '/delete'
      var promise = fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'X-XSRF-TOKEN': this.$store.state.user.token
        }
      })
      .then(function (response) { return response.json() })
      .then(function (json) {
        if (json.status === 200) {
          self.$emit('object-deleted', self.pid)
        } else {
          if (json.alerts && json.alerts.length > 0) {
            self.$store.commit('setAlerts', json.alerts)
          }
        }
        self.loading = false
        self.dialog = false
        self.$vuetify.goTo(0)
      })
      .catch(function (error) {
        self.$store.commit('setAlerts', [{ type: 'danger', msg: 'Error deleting object: ' + error}])
        console.log(error)
        self.loading = false
        self.dialog = false
        self.$vuetify.goTo(0)
      })
      return promise
    }
  }
}
</script>
