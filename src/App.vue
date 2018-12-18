<template>
  <div id="app">
    <h1>phaidra-vue-components</h1>
    <p-i-form :definition="form"></p-i-form>
    <p-d-jsonld :pid="pid"></p-d-jsonld>
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
