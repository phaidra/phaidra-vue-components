<template>
  <v-row v-if="!hidden">
    <v-col cols="4" v-if="!hideRole">
      <v-autocomplete
        :disabled="disablerole"
        v-on:input="$emit('input-role', $event)"
        :label="$t(roleLabel ? roleLabel : 'Role')"
        :items="vocabularies['rolepredicate'].terms"
        :item-value="'@id'"
        :value="getTerm('rolepredicate', role)"
        :filter="autocompleteFilter"
        :filled="inputStyle==='filled'"
        :outlined="inputStyle==='outlined'"
        return-object
        clearable
        :error-messages="roleErrorMessages"
      >
        <template slot="item" slot-scope="{ item }">
          <v-list-item-content two-line>
            <v-list-item-title  v-html="`${getLocalizedTermLabel('rolepredicate', item['@id'])}`"></v-list-item-title>
            <v-list-item-subtitle v-if="showIds" v-html="`${item['@id']}`"></v-list-item-subtitle>
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
        <v-col cols="6" >
          <v-text-field
            :value="name"
            :label="$t(nameLabel ? nameLabel : 'Name')"
            v-on:blur="$emit('input-name',$event.target.value)"
            :filled="inputStyle==='filled'"
            :outlined="inputStyle==='outlined'"
            :error-messages="nameErrorMessages"
          ></v-text-field>
        </v-col>
      </template>
      <template v-else>
        <v-col cols="3">
          <v-text-field
            :value="firstname"
            :label="$t(firstnameLabel ? firstnameLabel : 'Firstname')"
            v-on:blur="$emit('input-firstname',$event.target.value)"
            :filled="inputStyle==='filled'"
            :outlined="inputStyle==='outlined'"
            :error-messages="firstnameErrorMessages"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            :value="lastname"
            :label="$t(lastnameLabel ? lastnameLabel : 'Lastname')"
            v-on:blur="$emit('input-lastname',$event.target.value)"
            :filled="inputStyle==='filled'"
            :outlined="inputStyle==='outlined'"
            :error-messages="lastnameErrorMessages"
          ></v-text-field>
        </v-col>
      </template>
    </template>
    <v-col cols="6" v-if="type === 'schema:Organization'">
      <v-text-field
        :value="organizationText"
        :label="$t( organizationLabel ? organizationLabel : 'Organization' )"
        v-on:blur="$emit('input-organization',$event.target.value)"
        :filled="inputStyle==='filled'"
        :outlined="inputStyle==='outlined'"
        :error-messages="organizationErrorMessages"
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
    roleLabel: {
      type: String
    },
    firstnameLabel: {
      type: String
    },
    lastnameLabel: {
      type: String
    },
    nameLabel: {
      type: String
    },
    organizationText: {
      type: String
    },
    organizationLabel: {
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
    showname: {
      type: Boolean,
      default: false
    },
    showIds: {
      type: Boolean,
      default: false
    },
    nameErrorMessages: {
      type: Array
    },
    firstnameErrorMessages: {
      type: Array
    },
    lastnameErrorMessages: {
      type: Array
    },
    roleErrorMessages: {
      type: Array
    },
    organizationErrorMessages: {
      type: Array
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
