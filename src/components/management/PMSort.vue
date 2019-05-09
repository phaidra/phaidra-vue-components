<template>
  <v-card >
    <v-card-title class="subheading grey white--text">{{ $t('Sort') }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4" v-if="members.length > 0">
      <v-flex>{{ $t('Here you can sort members of this object (drag & drop).') }}</v-flex>
      <SortableList lockAxis="y" v-model="memberscomputed">
        <SortableSolrDoc v-for="(item, index) in memberscomputed" :index="index" :key="index" :item="item"/>
      </SortableList>
    </v-card-text>
    <v-card-actions v-if="members.length > 0">
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="loading" :loading="loading" @click="save()">{{ $t('Save') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import SortableList from '../utils/SortableList'
import SortableSolrDoc from '../utils/SortableSolrDoc'

export default {
  name: 'p-m-sort',
  components: {
    SortableSolrDoc,
    SortableList
  },
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
    },
    memberscomputed: {
      get: function () {
        if (this.membersdata.length === 0) {
          this.membersdata = this.members
        }
        return this.membersdata
      },
      set: function (newValue) {
        this.membersdata = newValue
      }
    }
  },
  data () {
    return {
      loading: false,
      membersdata: []
    }
  },
  methods: {
    save: function () {
      var self = this
      self.loading = true
      let colorder = []
      let i = 0
      for (let m of this.membersdata) {
        i++
        colorder.push({pid: m.pid, pos: i})
      }
      var httpFormData = new FormData()
      httpFormData.append('metadata', JSON.stringify({metadata: {members: colorder}}))      
      fetch(self.instance.api + '/' + this.cmodel.toLowerCase() + '/' + self.pid + '/members/order', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'X-XSRF-TOKEN': self.$store.state.user.token
        },
        body: httpFormData
      })
      .then(response => response.json())
      .then(function (json) {
        if (json.alerts && json.alerts.length > 0) {
          if (json.status === 401) {
            json.alerts.push({ type: 'danger', msg: 'Please log in' })
          }
          self.$store.commit('setAlerts', json.alerts)
        }
        self.loading = false
        if (json.status === 200){
          self.$emit('order-saved', self.pid)
        }
        self.$vuetify.goTo(0)
      })
      .catch(function (error) {
        self.$store.commit('setAlerts', [{ type: 'danger', msg: error }])
        self.loading = false
        self.$vuetify.goTo(0)
      })
    }
  }
}
</script>
