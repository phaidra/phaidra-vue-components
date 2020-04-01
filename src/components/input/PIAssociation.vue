<template>
  <v-row >
    <v-col cols="10">
      <v-autocomplete
        :value="getTerm('orgunits', value)"
        :required="required"
        v-on:input="handleInput($event)"
        :rules="required ? [ v => !!v || 'Required'] : []"
        :items="vocabularies['orgunits'].terms"
        :item-value="'@id'"
        :loading="loading"
        :filter="autocompleteFilter"
        hide-no-data
        :label="$t(label)"
        :filled="inputStyle==='filled'"
        :outlined="inputStyle==='outlined'"
        return-object
        clearable
        :disabled="disabled"
        :messages="path"
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-item-content two-line>
            <v-list-item-title  v-html="`${getLocalizedTermLabel('orgunits', item['@id'])}`"></v-list-item-title>
            <v-list-item-subtitle v-if="showIds" v-html="`${item['@id']}`"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-item-content>
            <v-list-item-title v-html="`${getLocalizedTermLabel('orgunits', item['@id'])}`"></v-list-item-title>
          </v-list-item-content>
        </template>
        <template v-slot:append-outer>
          <v-icon @click="$refs.orgunitstreedialog.open()">mdi-file-tree</v-icon>
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
    <org-units-tree-dialog ref="orgunitstreedialog" @unit-selected="handleInput(getTerm('orgunits', $event))"></org-units-tree-dialog>
  </v-row>
</template>

<script>
import { fieldproperties } from '../../mixins/fieldproperties'
import { vocabulary } from '../../mixins/vocabulary'
import OrgUnitsTreeDialog from '../select/OrgUnitsTreeDialog'

export default {
  name: 'p-i-association',
  mixins: [fieldproperties, vocabulary],
  components: {
    OrgUnitsTreeDialog
  },
  methods: {
    handleInput: function (unit) {
      this.path = ''
      let parentpath = []
      this.getParentPath(unit, parentpath)
      for (let u of parentpath.reverse()) {
        this.path = this.path + u['skos:prefLabel'][this.$i18n.locale] + ' > '
      }
      if (unit['skos:prefLabel']) {
        this.path = this.path + unit['skos:prefLabel'][this.$i18n.locale]
      }
      this.$emit('input', unit)
    },
    getParentPath: function (unit, parentpath) {
      if (unit['parent']) {
        parentpath.push(unit.parent)
        this.getParentPath(unit.parent, parentpath)
      }
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
      path: ''
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if (!this.vocabularies['orgunits'].loaded) {
        this.$store.dispatch('loadOrgUnits', this.$i18n.locale)
      }
      // emit input to set skos:prefLabel in parent
      if (this.value) {
        this.handleInput(this.value)
      }
    })
  }
}
</script>

<style scoped>
.v-btn {
  margin: 0;
}
</style>
