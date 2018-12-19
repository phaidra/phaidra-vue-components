<template>
  <div id="app">
    <v-app>
      <v-container>
        <v-layout column>
          <v-flex>
            <h3>Phaidra Vue Components</h3>
            <v-flex row>
              <v-text-field :value="pid" :label="'PID'" box ></v-text-field>
              <v-btn raised color="primary lighten-2" @click="load()">Load</v-btn>
            </v-flex>
          </v-flex>
          <v-flex>
            <h4>Display</h4>
            <p-d-jsonld :pid="pid"></p-d-jsonld>
          </v-flex>
          <v-flex>
            <h4>Edit</h4>
            <p-i-form :definition="loadedform"></p-i-form>
          </v-flex>
          <v-flex>
            <h4>Submit</h4>
            <p-i-form :definition="form"></p-i-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import PIForm from '@/components/input/PIForm'
import PDJsonld from '@/components/display/PDJsonld'

export default {
  name: 'app',
  components: {
    PIForm,
    PDJsonld
  },
  data () {
    return {
      form: {
        sections: []
      },
      loadedform: {
        sections: []
      },
      pid: ''
    }
  }
}
</script>

<style>
#app {
  font-family: "Roboto", sans-serif, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
