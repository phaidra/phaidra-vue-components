<template>
 
    <p-d-jsonld-layout v-if="jsonld">
      <template v-for="(o, p) in jsonld" >

        <template v-if="p==='dcterms:type'" slot="dcterms:type">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="'type'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='edm:hasType'" slot="edm:hasType">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="'genre'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dce:title'" slot="dce:title">
          <p-d-title :o="t" v-for="(t, j) in o" :key="'title'+j"></p-d-title>
        </template>

        <template v-else-if="p.startsWith('role:')" slot="role">
          <p-d-entity :role="p" :entity="e" v-for="(e, j) in o" :key="'entity'+p+j" ></p-d-entity>
        </template>

        <template v-else-if="p==='bf:note'" slot="bf:note">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="'text'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dce:subject'" slot="dce:subject">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="'subject'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dcterms:language'" slot="dcterms:language">
          <p-d-labeled-value :p="p" :o="item" v-for="(item, j) in o" :key="'lan'+j" ></p-d-labeled-value>
        </template>

        <template v-else-if="p==='dcterms:date'" slot="dcterms:date">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'date'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:created'" slot="dcterms:created">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'created'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:modified'" slot="dcterms:modified">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'modified'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:available'" slot="dcterms:available">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'available'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:issued'" slot="dcterms:issued">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'issued'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:valid'" slot="dcterms:valid">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'valid'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:dateAccepted'" slot="dcterms:dateAccepted">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'dateAccepted'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:dateCopyrighted'" slot="dcterms:dateCopyrighted">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'dateCopyrighted'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:dateSubmitted'" slot="dcterms:dateSubmitted">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'dateSubmitted'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='phaidra:dateAccessioned'" slot="phaidra:dateAccessioned">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'phaidra:dateAccessioned'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:temporal'" slot="dcterms:temporal">
          <p-d-lang-value :p="p" :o="item" v-for="(item, j) in o" :key="'temporal'+j" ></p-d-lang-value>
        </template>

        <template v-else-if="p==='frapo:isOutputOf'" slot="frapo:isOutputOf">
          <p-d-project :p="p" :o="item" v-for="(item, j) in o" :key="'project'+j" ></p-d-project>
        </template>

        <template v-else-if="p==='frapo:hasFundingAgency'" slot="frapo:hasFundingAgency">
          <p-d-funder :p="p" :o="item" v-for="(item, j) in o" :key="'funder'+j" ></p-d-funder>
        </template>

        <template v-else-if="p==='bf:physicalLocation'" slot="bf:physicalLocation">
          <p-d-lang-value :p="p" :o="item" v-for="(item, j) in o" :key="'physloc'+j" ></p-d-lang-value>
        </template>

        <template v-else-if="p==='bf:shelfMark'" slot="bf:shelfMark">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'callnr'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:provenance'" slot="dcterms:provenance">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="'prov'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dcterms:spatial'" slot="dcterms:spatial">
          <p-d-georeference :p="p" :o="item" v-for="(item, j) in o" :key="'spatial'+j" ></p-d-georeference>
        </template>

        <template v-else-if="p==='vra:placeOfCreation'" slot="vra:placeOfCreation">
          <p-d-georeference :p="p" :o="item" v-for="(item, j) in o" :key="'placeOfCreation'+j" ></p-d-georeference>
        </template>

        <template v-else-if="p==='vra:placeOfRepository'" slot="vra:placeOfRepository">
          <p-d-georeference :p="p" :o="item" v-for="(item, j) in o" :key="'placeOfRepository'+j" ></p-d-georeference>
        </template>

        <template v-else-if="p==='vra:placeOfSite'" slot="vra:placeOfSite">
          <p-d-georeference :p="p" :o="item" v-for="(item, j) in o" :key="'placeOfSite'+j" ></p-d-georeference>
        </template>

        <template v-else-if="p==='ebucore:filename'" slot="ebucore:filename">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'filename'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='ebucore:hasMimeType'" slot="ebucore:hasMimeType">
          <p-d-labeled-value :p="p" :o="item" v-for="(item, j) in o" :key="'mime'+j"></p-d-labeled-value>
        </template>

        <template v-else-if="p==='opaque:cco_accessionNumber'" slot="opaque:cco_accessionNumber">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'accnr'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='vra:hasInscription'" slot="vra:hasInscription">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="'inscr'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='vra:material'" slot="vra:material">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="'material'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='vra:hasTechnique'" slot="vra:hasTechnique">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="'techn'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='schema:width'" slot="schema:width">
          <p-d-dimension :p="p" :o="item" v-for="(item, j) in o" :key="'width'+j" ></p-d-dimension>
        </template>

        <template v-else-if="p==='schema:height'" slot="schema:height">
          <p-d-dimension :p="p" :o="item" v-for="(item, j) in o" :key="'height'+j" ></p-d-dimension>
        </template>

        <template v-else-if="p==='schema:depth'" slot="schema:depth">
          <p-d-dimension :p="p" :o="item" v-for="(item, j) in o" :key="'depth'+j" ></p-d-dimension>
        </template>

        <template v-else-if="p==='schema:weight'" slot="schema:weight">
          <p-d-dimension :p="p" :o="item" v-for="(item, j) in o" :key="'weight'+j" ></p-d-dimension>
        </template>

        <template v-else-if="p==='edm:rights'" slot="edm:rights">
          <p-d-license :p="p" :o="item" v-for="(item, j) in o" :key="'license'+j"></p-d-license>
        </template>

        <template v-else-if="p==='dce:rights'" slot="dce:rights">
          <p-d-lang-value :p="p" :o="item" v-for="(item, j) in o" :key="'type'+j" ></p-d-lang-value>
        </template>

        <template v-else-if="p==='dcterms:subject'" slot="phaidra:Subject">
          
          <template v-for="(subject, j) in o">
            <v-card class="mt-3" v-if="subject['@type']==='phaidra:Subject'" :key="'psubject'+j">
              <v-toolbar dense flat>
                <v-layout>
                  <v-toolbar-title class="font-weight-light">Subject</v-toolbar-title>
                </v-layout>
              </v-toolbar>
              <v-card-text class="ma-2">
                <p-d-jsonld :jsonld="subject" ></p-d-jsonld>
              </v-card-text>
            </v-card>
            <p-d-skos-preflabel v-else :p="p" :o="subject" :key="'subject'+j" ></p-d-skos-preflabel>
          </template>
            
        </template>

        <template v-else-if="p==='prov:wasDerivedFrom'" slot="prov:wasDerivedFrom">
          <template v-for="(derivedfrom, j) in o">
            <v-card class="mt-3" :key="'derivedfrom' + j">
              <v-toolbar dense flat>
                  <v-layout>
                    <v-toolbar-title class="font-weight-light">Digitized object</v-toolbar-title>
                  </v-layout>
                </v-toolbar>
                <v-card-text class="ma-2">
                  <p-d-jsonld :jsonld="derivedfrom" :key="p"></p-d-jsonld>
                </v-card-text>
            </v-card>
          </template>
        </template>

        <template v-else-if="p==='@type'"></template>

        <template v-else slot="unknown-predicate">
          <v-container :key="p">
            <v-alert :type="'error'" :value="true" transition="fade-transition">Uknown predicate <b>{{p}}</b></v-alert>
          </v-container>
        </template>
      </template>
    </p-d-jsonld-layout>

</template>

<script>
import PDLicense from './PDLicense'
import PDTitle from './PDTitle'
import PDSkosPreflabel from './PDSkosPreflabel'
import PDLangValue from './PDLangValue'
import PDValue from './PDValue'
import PDDimension from './PDDimension'
import PDGeoreference from './PDGeoreference'
import PDEntity from './PDEntity'
import PDLabeledValue from './PDLabeledValue'
import PDFunder from './PDFunder'
import PDProject from './PDProject'
import PDJsonldLayout from './PDJsonldLayout'
import { vocabulary } from '../../mixins/vocabulary'

export default {
  name: 'p-d-jsonld',
  mixins: [vocabulary],
  props: {
    pid: {
      type: String
    },
    jsonld: {
      type: Object,
      default: null
    }
  },
  components: {
    PDTitle,
    PDEntity,
    PDJsonldLayout,
    PDSkosPreflabel,
    PDLangValue,
    PDLicense,
    PDValue,
    PDDimension,
    PDGeoreference,
    PDLabeledValue,
    PDFunder,
    PDProject
  },
  methods: {
    loadMetadata: function (pid) {
      var self = this
      var url = self.$store.state.settings.instance.api + '/object/' + pid + '/metadata?mode=resolved'
      var promise = fetch(url, {
        method: 'GET',
        mode: 'cors'
      })
      .then(function (response) { return response.json() })
      .then(function (json) {
        self.$emit('load-jsonld', json.metadata['JSON-LD'])
      })
      .catch(function (error) {
        //console.log(error)
      })

      return promise
    }
  },
  mounted: function () {
    if (this.pid) {
      this.loadMetadata(this.pid)
    }
  }
}
</script>
