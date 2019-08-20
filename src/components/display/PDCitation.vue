<template>
  <v-col>
    <v-row >
      <v-col>
        <template v-for="(pl, i) in o['skos:prefLabel']">
          <v-row :key="'row'+i"  >
            <v-col md="4" cols="12" class="pdlabel primary--text" :key="'mt'+i">{{ $t(p) }}<template v-if="pl['@language']"> ({{ pl['@language'] }})</template></v-col>
            <v-col md="8" cols="12">
              <v-row  :key="'mtv'+i">
                <v-col class="valuefield">{{ pl['@value'] }}<template v-for="(identifier) in o['skos:exactMatch']"> ({{ identifier }})</template></v-col>
              </v-row>
            </v-col>
          </v-row>
        </template>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'p-d-citation',
  props: {
    o: {
      type: Object,
      required: true
    },
    p: {
      type: String
    }
  }
}
</script>
