<template>
 
    <p-d-jsonld-layout v-if="jsonld">
      <template v-for="(o, p) in jsonld" >

        <template v-if="p==='dcterms:type'" slot="dcterms:type">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'type'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='edm:hasType'" slot="edm:hasType">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'objtyp'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='schema:genre'" slot="schema:genre">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'genre'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='rdau:P60059'" slot="rdau:P60059">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'P60059'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dce:title'" slot="dce:title">
          <p-d-title :o="t" v-for="(t, j) in o" :key="currentpid+'title'+j"></p-d-title>
        </template>

        <template v-else-if="p.startsWith('role:')" slot="role">
          <p-d-entity :role="p" :entity="e" v-for="(e, j) in o" :key="currentpid+'entity'+p+j" ></p-d-entity>
        </template>

        <template v-else-if="p==='bf:note'" slot="bf:note">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'text'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dce:subject'" slot="dce:subject">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'keyword'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dcterms:language'" slot="dcterms:language">
          <p-d-labeled-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'lan'+j" ></p-d-labeled-value>
        </template>

        <template v-else-if="p==='schema:subtitleLanguage'" slot="schema:subtitleLanguage">
          <p-d-labeled-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'sublan'+j" ></p-d-labeled-value>
        </template>

        <template v-else-if="p==='dcterms:date'" slot="dcterms:date">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'date'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:created'" slot="dcterms:created">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'created'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:modified'" slot="dcterms:modified">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'modified'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:available'" slot="dcterms:available">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'available'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:issued'" slot="dcterms:issued">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'issued'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:valid'" slot="dcterms:valid">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'valid'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:dateAccepted'" slot="dcterms:dateAccepted">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'dateAccepted'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:dateCopyrighted'" slot="dcterms:dateCopyrighted">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'dateCopyrighted'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:dateSubmitted'" slot="dcterms:dateSubmitted">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'dateSubmitted'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='phaidra:dateAccessioned'" slot="phaidra:dateAccessioned">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'phaidra:dateAccessioned'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:temporal'" slot="dcterms:temporal">
          <p-d-lang-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'temporal'+j" ></p-d-lang-value>
        </template>

        <template v-else-if="p==='rdau:P60193'" slot="rdau:P60193">
          <p-d-series :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'series'+j" ></p-d-series>
        </template>

        <template v-else-if="p==='rdau:P60227'" slot="rdau:P60227">
          <p-d-adaptation :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'adaptation'+j" ></p-d-adaptation>
        </template>

        <template v-else-if="p==='frapo:isOutputOf'" slot="frapo:isOutputOf">
          <template v-for="(item, j) in o">
            <template v-if="item['@type']==='aaiso:Programme'">
              <p-d-study-plan :p="p" :o="item" :key="currentpid+'study-plan'+j" ></p-d-study-plan>
            </template>
            <template v-else-if="item['@type']==='foaf:Project'">
              <p-d-project :p="p" :o="item" :key="currentpid+'project'+j" ></p-d-project>
            </template>
          </template>
        </template>

        <template v-else-if="p==='frapo:hasFundingAgency'" slot="frapo:hasFundingAgency">
          <p-d-funder :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'funder'+j" ></p-d-funder>
        </template>

        <template v-else-if="p==='bf:physicalLocation'" slot="bf:physicalLocation">
          <p-d-lang-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'physloc'+j" ></p-d-lang-value>
        </template>

        <template v-else-if="p==='bf:shelfMark'" slot="bf:shelfMark">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'callnr'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:provenance'" slot="dcterms:provenance">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'prov'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dcterms:spatial'" slot="dcterms:spatial">
          <p-d-georeference :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'spatial'+j" ></p-d-georeference>
        </template>

        <template v-else-if="p==='vra:placeOfCreation'" slot="vra:placeOfCreation">
          <p-d-georeference :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'placeOfCreation'+j" ></p-d-georeference>
        </template>

        <template v-else-if="p==='vra:placeOfRepository'" slot="vra:placeOfRepository">
          <p-d-georeference :p="p" :o="item" v-for="(item, j) in o" :key="'placeOfRepository'+j" ></p-d-georeference>
        </template>

        <template v-else-if="p==='vra:placeOfSite'" slot="vra:placeOfSite">
          <p-d-georeference :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'placeOfSite'+j" ></p-d-georeference>
        </template>

        <template v-else-if="p==='ebucore:filename'" slot="ebucore:filename">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'filename'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='ebucore:hasMimeType'" slot="ebucore:hasMimeType">
          <p-d-labeled-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'mime'+j"></p-d-labeled-value>
        </template>

        <template v-else-if="p==='opaque:cco_accessionNumber'" slot="opaque:cco_accessionNumber">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'accnr'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='vra:hasInscription'" slot="vra:hasInscription">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'inscr'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='vra:material'" slot="vra:material">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'material'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='vra:hasTechnique'" slot="vra:hasTechnique">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'techn'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='schema:width'" slot="schema:width">
          <p-d-dimension :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'width'+j" ></p-d-dimension>
        </template>

        <template v-else-if="p==='schema:height'" slot="schema:height">
          <p-d-dimension :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'height'+j" ></p-d-dimension>
        </template>

        <template v-else-if="p==='schema:depth'" slot="schema:depth">
          <p-d-dimension :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'depth'+j" ></p-d-dimension>
        </template>

        <template v-else-if="p==='schema:weight'" slot="schema:weight">
          <p-d-dimension :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'weight'+j" ></p-d-dimension>
        </template>

        <template v-else-if="p==='schema:duration'" slot="schema:duration">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'duration'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='schema:numberOfPages'" slot="schema:numberOfPages">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'numberOfPages'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='bf:soundCharacteristic'" slot="bf:soundCharacteristic">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'soundCharacteristic'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='bf:supplementaryContent'" slot="bf:supplementaryContent">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'supplementaryContent'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dcterms:audience'" slot="dcterms:audience">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'audience'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='bf:awards'" slot="bf:awards">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'awards'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='edm:rights'" slot="edm:rights">
          <p-d-license :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'license'+j"></p-d-license>
        </template>

        <template v-else-if="p==='dce:rights'" slot="dce:rights">
          <p-d-lang-value :p="p" :o="item" v-for="(item, j) in o" :key="currentpid+'rights'+j" ></p-d-lang-value>
        </template>

        <template v-else-if="p==='dcterms:subject'" slot="dcterms:subject">
          
          <template v-for="(subject, j) in o">
            <v-card class="mt-3" v-if="subject['@type']==='phaidra:Subject'" :key="currentpid+'psubject'+j">
              <v-toolbar dense flat>
                <v-layout>
                  <v-toolbar-title class="font-weight-light">Subject</v-toolbar-title>
                </v-layout>
              </v-toolbar>
              <v-card-text class="ma-2">
                <p-d-jsonld :jsonld="subject" ></p-d-jsonld>
              </v-card-text>
            </v-card>
            <p-d-skos-preflabel v-else :p="p" :o="subject" :key="currentpid+'subject'+j" ></p-d-skos-preflabel>
          </template>
            
        </template>

        <template v-else-if="p==='@type'"></template>

        <template v-else slot="unknown-predicate">
          <v-container :key="p">
            <v-alert :type="'error'" :value="true" transition="fade-transition">Uknown predicate <b>{{p}}</b></v-alert>
            <p-i-unknown-readonly :jsonld="o" :label="p" ></p-i-unknown-readonly>
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
import PDStudyPlan from './PDStudyPlan'
import PDSeries from './PDSeries'
import PDAdaptation from './PDAdaptation'
import PDJsonldLayout from './PDJsonldLayout'
import PIUnknownReadonly from '../input/PIUnknownReadonly'
import { vocabulary } from '../../mixins/vocabulary'

export default {
  name: 'p-d-jsonld',
  mixins: [vocabulary],
  props: {
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
    PDProject,
    PDStudyPlan,
    PDSeries,
    PDAdaptation,
    PIUnknownReadonly
  }, 
  data () {
    return {
      currentpid: ''
    }
  },
  methods: {
    loadMetadata: function (pid) {
      this.currentpid = pid
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
  }
}
</script>
