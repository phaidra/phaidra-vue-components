<template>
  <v-dialog v-model="dialog" width="700px">
    <v-card :loading="loading">
      <v-card-title class="grey white--text">{{ $t('Select a term') }}</v-card-title>
      <v-card-text>
        <v-treeview item-key="@id" :items="items" hoverable activatable @update:active="selectTerm($event)"></v-treeview>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-container fluid>
          <v-row justify="end" class="px-4">
            <v-btn color="grey" dark @click="dialog = false">{{ $t('Cancel') }}</v-btn>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'

export default {
  name: 'oefos-tree-dialog',
  mixins: [ vocabulary ],
  computed: {
    instance: function () {
      return this.$store.state.instanceconfig
    },
    items: function () {
      return this.vocabularies['oefos']['tree']
    }
  },
  data () {
    return {
      dialog: false,
      loading: false
    }
  },
  methods: {
    open: async function () {
      this.dialog = true
      this.addNames(this.items)
    },
    addNames: function (terms) {
      for (let t of terms) {
        if (t['skos:prefLabel']) {
          t['name'] = t['skos:notation'][0] + '. ' + t['skos:prefLabel'][this.$i18n.locale]
        }
        if (t['children']) {
          if (t.children.length > 0) {
            this.addNames(t.children)
          }
        }
      }
    },
    selectTerm: function (term) {
      this.$emit('term-selected', term[0])
      this.dialog = false
    }
  }
}
</script>
