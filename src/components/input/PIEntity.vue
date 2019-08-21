<template>
  <v-row >
    <v-col cols="4" v-if="!hideRole">
      <v-autocomplete
        :disabled="disablerole"
        v-on:input="$emit('input-role', $event)"
        :label="$t('Role')"
        :items="vocabularies['rolepredicate'].terms"
        :value="getTerm('rolepredicate', role)"
        :filter="autocompleteFilter"
       filled
        return-object
        clearable
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-item-content two-line>
            <v-list-item-title  v-html="`${getLocalizedTermLabel('rolepredicate', item['@id'])}`"></v-list-item-title>
            <v-list-item-subtitle  v-html="`${item['@id']}`"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <template slot="selection" slot-scope="{ item }">
          <v-list-item-content>
            <v-list-item-title v-html="`${getLocalizedTermLabel('rolepredicate', item['@id'])}`"></v-list-item-title>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-col>
    <template v-if="type === 'schema:Person'">
      <template v-if="showname">
        <v-col cols="4" >
          <v-text-field
            :value="name"
            :label="$t('Name')"
            v-on:blur="$emit('input-name',$event.target.value)"
           filled
          ></v-text-field>
        </v-col>
      </template>
      <template v-else>
        <v-col cols="2">
          <v-text-field
            :value="firstname"
            :label="$t('Firstname')"
            v-on:blur="$emit('input-firstname',$event.target.value)"
           filled
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            :value="lastname"
            :label="$t('Lastname')"
            v-on:blur="$emit('input-lastname',$event.target.value)"
           filled
          ></v-text-field>
        </v-col>
      </template>
    </template>
    <v-col cols="4" v-if="type === 'schema:Organisation'">
      <v-text-field
        :value="institution"
        :label="$t( institutionLabel ? institutionLabel : 'Institution' )"
        v-on:blur="$emit('input-institution',$event.target.value)"
       filled
      ></v-text-field>
    </v-col>
    <v-col cols="2" v-if="showidentifier">
      <v-text-field
        :value="identifier"
        :label="$t('Identifier')"
        v-on:blur="$emit('input-identifier',$event.target.value)"
       filled
      ></v-text-field>
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
import { vocabulary } from '../../mixins/vocabulary'
import { fieldproperties } from '../../mixins/fieldproperties'

export default {
  name: 'p-i-entity',
  mixins: [vocabulary, fieldproperties],
  props: {
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    name: {
      type: String
    },
    institution: {
      type: String
    },
    institutionLabel: {
      type: String
    },
    identifier: {
      type: String
    },
    role: {
      type: String
    },
    hideRole: {
      type: Boolean
    },
    type: {
      type: String
    },
    required: {
      type: Boolean
    },
    disablerole: {
      type: Boolean,
      default: false
    },
    showidentifier: {
      type: Boolean,
      default: true
    },
    showname: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      vocabulary: 'rolepredicate'
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.loading = !this.vocabularies[this.vocabulary].loaded
      // emit input to set skos:prefLabel in parent
      if (this.role) {
        this.$emit('input', this.getTerm('rolepredicate', this.role))
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
