<template>
  <div id="app">
    <v-app>
      <v-container fluid grid-list-lg>
        <h4 class="text-lg-right subheading mb-3">Phaidra Vue Components {{version}}</h4>
        <v-layout row>
          <v-flex xs4>
            <v-text-field :value="apibaseurl" :label="'API'"></v-text-field>
          </v-flex>
          <v-flex xs2>
            <v-text-field :value="pid" :label="'PID'" :placeholder="'o:123456789'"></v-text-field>
          </v-flex>
          <v-flex xs2> 
            <v-text-field :value="username" :label="'Username'" ></v-text-field>
          </v-flex>
          <v-flex xs2>
            <v-text-field :value="password" :label="'Password'" :type="'password'"></v-text-field>
          </v-flex>
        </v-layout> 
        <v-layout justify-center>
          <v-flex xs6>
            <v-card>
              <v-toolbar flat>
                <v-layout row justify-space-between>
                  <v-toolbar-title>Display</v-toolbar-title>
                  <v-btn raised class="right" color="primary lighten-2" @click="load()">Load</v-btn>
                </v-layout>
              </v-toolbar>
              <v-card-text>
                <p-d-jsonld v-if="pid" :pid="pid" ref="display"></p-d-jsonld>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs6>            
            <v-card>
              <v-toolbar flat>
                <v-toolbar-title>Edit</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <p-i-form :definition="form"></p-i-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import PIForm from '@/components/input/PIForm'
import PDJsonld from '@/components/display/PDJsonld'
import {version} from '../package.json';

export default {
  name: 'app',
  components: {
    PIForm,
    PDJsonld
  },
  data () {
    return {
      form: {
        sections: [
          {
            title: 'General',
            id: 'general',
            fields: [
              {
                id: 211,
                predicate: 'schema:height',
                metadataset: 'analog',
                component: 'p-dimension',
                label: 'Height',
                unit: 'CMT',
                value: ''
              }
            ]
          }
        ]
      },
      pid: 'o:493283',
      apibaseurl: 'https://services.phaidra-sandbox.univie.ac.at/api',
      username: '',
      password: '',
      version: version
    }
  },
  methods: {
    load: function() {
      this.$store.commit('setInstanceApi', this.apibaseurl)
      this.$refs.display.loadMetadata(this.pid);
    }
  }
}
</script>

<style>
#app {
  font-family: "Roboto", sans-serif, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.right {
  float: right;
}
</style>
