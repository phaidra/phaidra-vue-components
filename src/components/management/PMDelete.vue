<template>
  <v-card >
    <v-card-title class="subheading grey white--text">{{ $t('Delete') }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <v-alert :type="'info'" :value="true" transition="slide-y-transition" v-if="(cmodel === 'Container') && (members.length > 0)">{{ $t('MEMBERS_DELETE_ALERT_CONTAINER', { nrmembers: members.length }) }}</v-alert>
      <v-col v-else>{{ $t('DELETE_OBJECT', { pid: 'https://' + instance.baseurl + '/' + pid }) }}</v-col>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-col>
        <v-dialog v-model="dialog" width="500" >
          <template v-slot:activator="{ on }">
            <v-btn color="red" class="white--text" v-on="on" :disabled="(members.length > 0) || !pid || !cmodel">{{ $t('Delete') }}</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title >{{ $t('Delete') }}</v-card-title>
            <v-card-text>{{ $t('DELETE_OBJECT_CONFIRM', { pid: 'https://' + instance.baseurl + '/' +  pid })}}</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" class="white--text" :loading="loading" :disabled="loading" @click="deleteObject(pid)">{{ $t('Delete') }}</v-btn>
              <v-btn :disabled="loading" @click="dialog = false">{{ $t('Cancel') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
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
      type: Array
    }
  },
  computed: {
    instance: function () {
      return this.$store.state.instanceconfig
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
      var url = self.$store.state.instanceconfig.api + '/object/' + pid + '/delete'
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
          self.$store.commit('setAlerts', [{ type: 'danger', msg: 'Error deleting object: ' + error }])
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
