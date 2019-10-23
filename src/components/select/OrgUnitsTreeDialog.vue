<template>
  <v-dialog v-model="dialog" width="700px">
    <v-card :loading="loading">
      <v-card-title class="grey white--text">{{ $t('Select an organizational unit') }}</v-card-title>
      <v-card-text>
        <v-treeview :items="orgunits" item-children="subunits" item-key="@id" hoverable activatable @update:active="selectUnit($event)"></v-treeview>
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
  name: 'org-units-tree-dialog',
  computed: {
    instance: function () {
      return this.$store.state.instanceconfig
    }
  },
  data () {
    return {
      dialog: false,
      loading: false,
      orgunits: []
    }
  },
  methods: {
    open: async function () {
      this.dialog = true
      this.loading = true
      var url = this.$store.state.instanceconfig.api + '/directory/org_get_units'
      try {
        let response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'X-XSRF-TOKEN': this.$store.state.user.token
          }
        })
        let json = await response.json()
        if (json.alerts && json.alerts.length > 0) {
          this.$store.commit('setAlerts', json.alerts)
        }
        this.orgunits = json.units
        this.addNames(this.orgunits)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    addNames: function (units) {
      for (let u of units) {
        if (u['skos:prefLabel']) {
          u['name'] = u['skos:prefLabel'][this.$i18n.locale]
        }
        if (u['subunits']) {
          if (u.subunits.length > 0) {
            this.addNames(u.subunits)
          }
        }
      }
    },
    selectUnit: function (item) {
      this.$emit('unit-selected', item[0])
      this.dialog = false
    }
  }
}
</script>
