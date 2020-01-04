<template>
  <v-container>
    <v-row v-for="(ch, i) in children" :key="ch.xmlname+i">
      <template v-if="ch.input_type === 'static'">
        <v-col>
          <v-text-field 
            v-model="ch.ui_value" 
            :label="ch.labels.en"
            :readonly="true"
            outlined
          ></v-text-field>
        </v-col>
      </template>
      <template v-else-if="ch.input_type === 'input_text_lang'">
        <v-col cols="12" md="10">
          <v-text-field 
            v-model="ch.ui_value" 
            :label="ch.labels.en"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            v-model="ch.value_lang"
            :label="'Language'"
            outlined
          ></v-select>
        </v-col>
      </template>
      <template v-else-if="ch.input_type === 'input_textarea_lang'">
        <v-col cols="12" md="10">
          <v-textarea
            v-model="ch.ui_value" 
            :label="ch.labels.en"
            outlined
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            v-model="ch.value_lang"
            :label="'Language'"
            outlined
          ></v-select>
        </v-col>
      </template>
      <template v-else-if="ch.input_type === 'node'">
        <v-card class="ma-3" :width="'100%'">
          <v-card-title class="font-weight-light grey white--text">{{ ch.labels.en }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <template v-if="ch.children">
              <p-uwm-field-renderer :children="ch.children"></p-uwm-field-renderer>
            </template>
          </v-card-text>
        </v-card>
      </template>
      <v-alert v-else dense type="error" :value="true">Unknown field type {{ch.xmlname}} {{ch.input_type}}</v-alert>
    </v-row>
  </v-container>
</template>

<script>
import arrays from '../../utils/arrays'

export default {
  name: 'p-uwm-field-renderer',
  props: {
    children: {
      type: Array
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {

  },
  mounted: function () {
    //this.$store.dispatch('loadLanguages', this.$i18n.locale)
  }
}
</script>

