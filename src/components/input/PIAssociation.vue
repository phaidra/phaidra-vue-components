<template>
  <v-row >
    <v-col cols="8">
      <v-autocomplete
        :value="getTerm(value)"
        :required="required"
        v-on:input="handleInput($event)"
        :rules="required ? [ v => !!v || 'Required'] : []"
        :items="orgunits"
        :loading="loading"
        :filter="autocompleteFilter"
        hide-no-data
        :label="$t(label)"
       filled
        return-object
        clearable
        :disabled="disabled"
        :messages="path"
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-item-content two-line>
            <v-list-item-title  v-html="`${getLocalizedTermLabel(item)}`"></v-list-item-title>
            <v-list-item-subtitle v-if="showIds" v-html="`${item['@id']}`"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-item-content>
            <v-list-item-title v-html="`${getLocalizedTermLabel(item)}`"></v-list-item-title>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col cols="1" v-if="actions.length">
      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
            <v-list-item-title>{{ action.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-association',
  mixins: [fieldproperties],
  methods: {
    autocompleteFilter: function (item, queryText) {
      const lab = item['skos:prefLabel'][this.$i18n.locale] ? item['skos:prefLabel'][this.$i18n.locale].toLowerCase() : item['skos:prefLabel']['eng'].toLowerCase()
      const query = queryText.toLowerCase()
      return lab.indexOf(query) > -1
    },
    getTerm: function (v) {
      for (let u of this.orgunits) {
        if (u['@id'] === v) {
          return u
        }
      }
    },
    getLocalizedTermLabel: function (item) {
      return item['skos:prefLabel'][this.$i18n.locale] ? item['skos:prefLabel'][this.$i18n.locale] : item['skos:prefLabel']['eng']
    },
    addToOrgunits: function (units, parent) {
      for (let u of units) {
        this.orgunits.push(u)
        u.parent = parent
        if (u['subunits']) {
          if (u.subunits.length > 0) {
            this.addToOrgunits(u.subunits, u)
          }
        }
      }
    },
    handleInput: function (unit) {
      this.path = ''
      let parentpath = []
      this.getParentPath(unit, parentpath)
      for (let u of parentpath.reverse()) {
        this.path = this.path + u['skos:prefLabel'][this.$i18n.locale] + ' > '
      }
      this.path = this.path + unit['skos:prefLabel'][this.$i18n.locale]
      this.$emit('input', unit)
    },
    getParentPath: function (unit, parentpath) {
      if (unit['parent']) {
        parentpath.push(unit.parent)
        this.getParentPath(unit.parent, parentpath)
      }
    },
    loadOrgUnits: function () {
      var self = this
      this.loading = true
      var url = self.$store.state.instanceconfig.api + '/directory/org_get_units'
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
          self.loading = false
          self.templatedialog = false
          self.addToOrgunits(json.units, null)
        })
        .catch(function (error) {
          console.log(error)
        })
      return promise
    }
  },
  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showIds: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      orgunits: [],
      path: ''
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      let self = this
      this.loadOrgUnits().then(function () {
        if (self.value) {
          let term = self.getTerm(self.value)
          // emit input to set skos:prefLabel in parent
          self.handleInput(term)
        }
      })
    })
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>
