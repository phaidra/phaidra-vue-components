<template>
  <v-row v-if="!hidden">
    <v-col cols="3">
      <v-text-field
        :value="title"
        v-on:blur="$emit('input-title',$event.target.value)"
        :label="$t(titleLabel)"
        :filled="inputStyle==='filled'"
        :outlined="inputStyle==='outlined'"
      ></v-text-field>
    </v-col>
    <v-col cols="4">
      <v-text-field
        :value="url"
        v-on:blur="$emit('input-url',$event.target.value)"
        :label="$t(urlLabel)"
        :filled="inputStyle==='filled'"
        :outlined="inputStyle==='outlined'"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="1" v-if="actions.length">
      <v-row>
        <v-col v-if="multilingual" cols="6">
          <v-btn text @click="$refs.langdialog.open()">
            <span class="grey--text text--darken-1">
              ({{ titleLanguage }})
            </span>
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn icon @click="showMenu">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-menu :position-x="menux" :position-y="menuy" absolute offset-y v-model="showMenuModel">
        <v-list>
          <v-list-item v-for="(action, i) in actions" :key="i" @click="$emit(action.event, $event)">
            <v-list-item-title>{{ action.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <select-language ref="langdialog" @language-selected="$emit('input-title-language', $event)"></select-language>
    </v-col>
  </v-row>
</template>

<script>
import { vocabulary } from '../../mixins/vocabulary'
import { fieldproperties } from '../../mixins/fieldproperties'
import SelectLanguage from '../select/SelectLanguage'

export default {
  name: 'p-i-see-also',
  mixins: [fieldproperties, vocabulary],
  components: {
    SelectLanguage
  },
  props: {
    url: {
      type: String
    },
    urlLabel: {
      type: String,
      default: 'URL'
    },
    title: {
      type: String
    },
    titleLabel: {
      type: String,
      default: 'Title'
    },
    titleLanguage: {
      type: String,
      default: 'Title'
    },
    multilingual: {
      type: Boolean
    },
    showIds: {
      type: Boolean,
      default: false
    }
  }
}
</script>
