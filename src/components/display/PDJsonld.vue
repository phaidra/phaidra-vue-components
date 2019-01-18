<template>
 
    <p-d-jsonld-layout v-if="objectjson">
      <template v-for="(o, p) in objectjson" >

        <template v-if="p==='dce:title'" slot="dce:title">
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
          <p-d-uri :p="p" :o="item" v-for="(item, j) in o" :key="'lan'+j" ></p-d-uri>
        </template>

        <template v-else-if="p==='dcterms:type'" slot="dcterms:type">
          <p-d-uri :p="p" :o="item" v-for="(item, j) in o" :key="'type'+j" ></p-d-uri>
        </template>

        <template v-else-if="p==='dcterms:issued'" slot="dcterms:issued">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'issued'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='edm:rights'" slot="edm:type">
          <p-d-license :dclicense="item" v-for="(item, j) in o" :key="'license'+j"></p-d-license>
        </template>

        <template v-else-if="p==='dce:rights'" slot="dce:rights">
          <p-d-lang-value :p="p" :o="item" v-for="(item, j) in o" :key="'type'+j" ></p-d-lang-value>
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

        <template v-else-if="p==='schema:temporalCoverage'" slot="schema:temporalCoverage">
          <p-d-lang-value :p="p" :o="item" v-for="(item, j) in o" :key="'temporal'+j" ></p-d-lang-value>
        </template>

        <template v-else-if="p==='dcterms:spatial'" slot="dcterms:spatial">
          <p-d-georeference :p="p" :o="item" v-for="(item, j) in o" :key="'geo'+j" ></p-d-georeference>
        </template>

        <template v-else-if="p==='dcterms:provenance'" slot="dcterms:provenance">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="'prov'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='ebucore:filename'" slot="ebucore:filename">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'filename'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='ebucore:hasMimeType'" slot="ebucore:hasMimeType">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'mime'+j"></p-d-value>
        </template>

        <template v-else-if="p==='opaque:cco_accessionNumber'" slot="opaque:cco_accessionNumber">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="'accnr'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='vra:hasInscription'" slot="vra:hasInscription">
          <p-d-skos-preflabel v-if="item['skos:prefLabel']" :p="p" :o="item" v-for="(item, j) in o" :key="'inscr'+j" ></p-d-skos-preflabel>
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
import PDUri from './PDUri'
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
    PDLicense,
    PDEntity,
    PDJsonldLayout,
    PDSkosPreflabel,
    PDLangValue,
    PDValue,
    PDDimension,
    PDGeoreference,
    PDUri,
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
        self.metadata = json.metadata
      })
      .catch(function (error) {
        //console.log(error)
      })

      return promise
    }
  },
  data () {
    return {
      metadata: []
    }
  },
  computed: {
    objectjson: function () {
      if (this.pid) {
        if (this.metadata) {
          return this.metadata['JSON-LD']
        }
      } else {
        return this.jsonld
      }
      return {}
    },
    instance () {
      return this.$store.state.settings.instance
    }
  },
  mounted: function () {
    if (this.pid) {
      this.loadMetadata(this.pid)
    }
  }
}
</script>
