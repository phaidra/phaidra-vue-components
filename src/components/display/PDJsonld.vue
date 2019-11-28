<template>

  <p-d-jsonld-layout v-if="jsonld">

    <template v-if="pid" slot="pid">
      <v-row>
        <v-col md="2" cols="12" class="pdlabel primary--text text-right">{{ $t('Persistent identifier') }}</v-col>
        <v-col md="10" cols="12">https://{{ instance.baseurl }}/{{ pid }}</v-col>
      </v-row>
    </template>

    <template v-for="(o, p) in jsonld">

        <template v-if="p==='rdam:P30004'" slot="rdam:P30004">
          <p-d-identifier :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'hasid'+j" ></p-d-identifier>
        </template>

        <template v-else-if="p==='dcterms:type'" slot="dcterms:type">
          <!--<p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'type'+j" ></p-d-skos-preflabel>-->
        </template>

        <template v-else-if="p==='edm:hasType'" slot="edm:hasType">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'objtyp'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='schema:genre'" slot="schema:genre">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'genre'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='oaire:version'" slot="oaire:version">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'oairev'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dcterms:accessRights'" slot="dcterms:accessRights">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'dtar'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='rdau:P60059'" slot="rdau:P60059">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'P60059'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dce:title'" slot="dce:title">
          <p-d-title :o="t" v-for="(t, j) in o" :key="componentid+'title'+j"></p-d-title>
        </template>

        <template v-else-if="p.startsWith('role:')" slot="role">
          <p-d-entity :role="p" :entity="e" :hideLabel="j !== 0" v-for="(e, j) in getEntities(p, o)" :key="componentid+'entity'+p+j" ></p-d-entity>
          <v-row v-if="entitiesLimited[p] && !showAllEntities[p]" :key="componentid+'entitymore'+p">
            <v-col md="10" offset-md="2">
              <span class="mx-2 primary--text" @click="setShowAllEntities(p)">... {{ $t('show all') }}</span>
            </v-col>
          </v-row>
        </template>

        <template v-else-if="p==='bf:note'" slot="bf:note">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'text'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='bf:tableOfContents'" slot="bf:tableOfContents">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'toc'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dce:subject'" slot="dce:subject">
          <p-d-keyword :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'keyword'+j" ></p-d-keyword>
        </template>

        <template v-else-if="p==='dcterms:language'" slot="dcterms:language">
          <p-d-labeled-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'lan'+j" ></p-d-labeled-value>
        </template>

        <template v-else-if="p==='schema:subtitleLanguage'" slot="schema:subtitleLanguage">
          <p-d-labeled-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'sublan'+j" ></p-d-labeled-value>
        </template>

        <template v-else-if="p==='dcterms:date'" slot="dcterms:date">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'date'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:created'" slot="dcterms:created">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'created'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:modified'" slot="dcterms:modified">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'modified'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:available'" slot="dcterms:available">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'available'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:issued'" slot="dcterms:issued">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'issued'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:valid'" slot="dcterms:valid">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'valid'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:dateAccepted'" slot="dcterms:dateAccepted">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'dateAccepted'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:dateCopyrighted'" slot="dcterms:dateCopyrighted">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'dateCopyrighted'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:dateSubmitted'" slot="dcterms:dateSubmitted">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'dateSubmitted'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='rdau:P60071'" slot="rdau:P60071">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'dateOfProduction'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='phaidra:dateAccessioned'" slot="phaidra:dateAccessioned">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'phaidra:dateAccessioned'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:temporal'" slot="dcterms:temporal">
          <p-d-lang-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'temporal'+j" ></p-d-lang-value>
        </template>

        <template v-else-if="p==='rdau:P60193'" slot="rdau:P60193">
          <p-d-series :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'series'+j" ></p-d-series>
        </template>

        <template v-else-if="p==='rdau:P60101'" slot="rdau:P60101">
          <p-d-contained-in :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'contained-in'+j" ></p-d-contained-in>
        </template>

        <template v-else-if="p==='bf:provisionActivity'" slot="bf:provisionActivity">
          <p-d-bf-publication :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'bfpubl'+j" ></p-d-bf-publication>
        </template>

        <template v-else-if="p==='cito:cites'" slot="cito:cites">
          <p-d-citation :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'cites'+j" ></p-d-citation>
        </template>

        <template v-else-if="p==='cito:isCitedBy'" slot="cito:isCitedBy">
          <p-d-citation :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'citedby'+j" ></p-d-citation>
        </template>

        <template v-else-if="p==='rdau:P60227'" slot="rdau:P60227">
          <p-d-adaptation :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'adaptation'+j" ></p-d-adaptation>
        </template>

        <template v-else-if="p==='frapo:isOutputOf'" slot="frapo:isOutputOf">
          <template v-for="(item, j) in o">
            <template v-if="item['@type']==='aaiso:Programme'">
              <p-d-study-plan :p="p" :o="item" :key="componentid+'study-plan'+j" ></p-d-study-plan>
            </template>
            <template v-else-if="item['@type']==='foaf:Project'">
              <p-d-project :p="p" :o="item" :key="componentid+'project'+j" ></p-d-project>
            </template>
          </template>
        </template>

        <template v-else-if="p==='frapo:hasFundingAgency'" slot="frapo:hasFundingAgency">
          <p-d-funder :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'funder'+j" ></p-d-funder>
        </template>

        <template v-else-if="p==='rdax:P00009'" slot="rdax:P00009">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'association'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='bf:physicalLocation'" slot="bf:physicalLocation">
          <p-d-lang-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'physloc'+j" ></p-d-lang-value>
        </template>

        <template v-else-if="p==='rdau:P60550'" slot="rdau:P60550">
          <p-d-lang-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'extent'+j" ></p-d-lang-value>
        </template>

        <template v-else-if="p==='bf:shelfMark'" slot="bf:shelfMark">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'callnr'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='dcterms:provenance'" slot="dcterms:provenance">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'prov'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dcterms:spatial'" slot="dcterms:spatial">
          <p-d-georeference :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'spatial'+j" ></p-d-georeference>
        </template>

        <template v-else-if="p==='vra:placeOfCreation'" slot="vra:placeOfCreation">
          <p-d-georeference :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'placeOfCreation'+j" ></p-d-georeference>
        </template>

        <template v-else-if="p==='vra:placeOfRepository'" slot="vra:placeOfRepository">
          <p-d-georeference :p="p" :o="item" v-for="(item, j) in o" :key="'placeOfRepository'+j" ></p-d-georeference>
        </template>

        <template v-else-if="p==='vra:placeOfSite'" slot="vra:placeOfSite">
          <p-d-georeference :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'placeOfSite'+j" ></p-d-georeference>
        </template>

        <template v-else-if="p==='ebucore:filename'" slot="ebucore:filename">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'filename'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='ebucore:hasMimeType'" slot="ebucore:hasMimeType">
          <p-d-labeled-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'mime'+j"></p-d-labeled-value>
        </template>

        <template v-else-if="p==='opaque:cco_accessionNumber'" slot="opaque:cco_accessionNumber">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'accnr'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='vra:hasInscription'" slot="vra:hasInscription">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'inscr'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='vra:material'" slot="vra:material">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'material'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='vra:hasTechnique'" slot="vra:hasTechnique">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'techn'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dce:format'" slot="dce:format">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'format'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='rdau:P60048'" slot="rdau:P60048">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'carriertype'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='rdau:P60059'" slot="rdau:P60059">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'regenc'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='schema:width'" slot="schema:width">
          <p-d-dimension :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'width'+j" ></p-d-dimension>
        </template>

        <template v-else-if="p==='schema:height'" slot="schema:height">
          <p-d-dimension :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'height'+j" ></p-d-dimension>
        </template>

        <template v-else-if="p==='schema:depth'" slot="schema:depth">
          <p-d-dimension :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'depth'+j" ></p-d-dimension>
        </template>

        <template v-else-if="p==='schema:weight'" slot="schema:weight">
          <p-d-dimension :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'weight'+j" ></p-d-dimension>
        </template>

        <template v-else-if="p==='schema:duration'" slot="schema:duration">
          <p-d-duration :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'duration'+j" ></p-d-duration>
        </template>

        <template v-else-if="p==='schema:numberOfPages'" slot="schema:numberOfPages">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'numberOfPages'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='bf:soundCharacteristic'" slot="bf:soundCharacteristic">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'soundCharacteristic'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='schema:pageStart'" slot="schema:pageStart">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'pageStart'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='schema:pageEnd'" slot="schema:pageEnd">
          <p-d-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'pageEnd'+j" ></p-d-value>
        </template>

        <template v-else-if="p==='bf:supplementaryContent'" slot="bf:supplementaryContent">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'supplementaryContent'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='dcterms:audience'" slot="dcterms:audience">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'audience'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='bf:awards'" slot="bf:awards">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'awards'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='bf:scale'" slot="bf:scale">
          <p-d-skos-preflabel :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'scale'+j" ></p-d-skos-preflabel>
        </template>

        <template v-else-if="p==='edm:rights'" slot="edm:rights">
          <p-d-license :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'license'+j"></p-d-license>
        </template>

        <template v-else-if="p==='dce:rights'" slot="dce:rights">
          <p-d-lang-value :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'rights'+j" ></p-d-lang-value>
        </template>

        <template v-else-if="p==='dcterms:subject'" slot="dcterms:subject">

          <template v-for="(subject, j) in o">
            <v-card class="my-4" v-if="subject['@type']==='phaidra:Subject'" :key="componentid+'psubject'+j">
              <v-card-title class="title font-weight-light grey white--text">
                <span>{{ $t('Subject') }}</span>
              </v-card-title>
              <v-card-text class="ma-2">
                <p-d-jsonld :jsonld="subject" ></p-d-jsonld>
              </v-card-text>
            </v-card>
            <p-d-skos-preflabel v-else :p="p" :o="subject" :key="componentid+'subject'+j" ></p-d-skos-preflabel>
          </template>

        </template>

        <template v-else-if="p==='@type'"></template>

        <template v-else-if="p==='phaidra:systemTag'" slot="phaidra:systemTag">
          <p-d-value v-if="showSystemFields" :p="p" :o="item" v-for="(item, j) in o" :key="componentid+'systemTag'+j" ></p-d-value>
        </template>

        <template v-else slot="unknown-predicate">
          <v-container class="my-4" :key="p">
            <v-alert :type="'error'" :value="true" transition="fade-transition">Unknown predicate <b>{{p}}</b></v-alert>
            <p-i-unknown-readonly :jsonld="o" :label="p" ></p-i-unknown-readonly>
          </v-container>
        </template>

    </template>
  </p-d-jsonld-layout>

</template>

<script>
import Vue from 'vue'
import PDLicense from './PDLicense'
import PDTitle from './PDTitle'
import PDSkosPreflabel from './PDSkosPreflabel'
import PDKeyword from './PDKeyword'
import PDLangValue from './PDLangValue'
import PDValue from './PDValue'
import PDDimension from './PDDimension'
import PDDuration from './PDDuration'
import PDGeoreference from './PDGeoreference'
import PDEntity from './PDEntity'
import PDLabeledValue from './PDLabeledValue'
import PDFunder from './PDFunder'
import PDProject from './PDProject'
import PDBfPublication from './PDBfPublication'
import PDStudyPlan from './PDStudyPlan'
import PDSeries from './PDSeries'
import PDContainedIn from './PDContainedIn'
import PDAdaptation from './PDAdaptation'
import PDCitation from './PDCitation'
import PDIdentifier from './PDIdentifier'
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
    },
    limitRoles: {
      type: Number,
      default: 0
    },
    showSystemFields: {
      type: Boolean,
      default: false
    },
    pid: String
  },
  components: {
    PDTitle,
    PDEntity,
    PDJsonldLayout,
    PDSkosPreflabel,
    PDKeyword,
    PDLangValue,
    PDLicense,
    PDValue,
    PDDimension,
    PDDuration,
    PDGeoreference,
    PDLabeledValue,
    PDFunder,
    PDProject,
    PDBfPublication,
    PDStudyPlan,
    PDSeries,
    PDContainedIn,
    PDAdaptation,
    PDIdentifier,
    PDCitation,
    PIUnknownReadonly
  },
  computed: {
    instance: function () {
      return this.$store.state.instanceconfig
    },
    componentid: function () {
      return Math.floor(Math.random() * 10000000)
    }
  },
  data () {
    return {
      nrRoles: 0,
      showAllEntities: {},
      entitiesLimited: {}
    }
  },
  methods: {
    getEntities: function (p, o) {
      if ((this.limitRoles === 0) || this.showAllEntities[p]) {
        return o
      }
      let entities = []
      let i = 0
      for (let e of o) {
        i++
        if (i <= this.limitRoles) {
          entities.push(e)
        } else {
          this.entitiesLimited[p] = true
          break
        }
      }
      return entities
    },
    setShowAllEntities: function (p) {
      Vue.set(this.showAllEntities, p, true)
    }
  },
  mounted: function () {
    this.$store.dispatch('loadLanguages', this.$i18n.locale)
  }
}
</script>

<style>
.valuefield {
  white-space: pre-wrap;
}
</style>
