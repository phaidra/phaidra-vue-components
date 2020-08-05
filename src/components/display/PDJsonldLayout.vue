<template>
  <v-container fluid>
    <slot name="dce:title"></slot>
    <slot name="role"></slot>
    <slot name="bf:note"></slot>
    <slot name="bf:tableOfContents"></slot>

    <slot name="edm:hasType"></slot>
    <slot name="schema:genre"></slot>

    <slot name="dcterms:language"></slot>
    <slot name="schema:subtitleLanguage"></slot>
    <slot name="dce:subject"></slot>

    <slot name="dcterms:date"></slot>
    <slot name="dcterms:created"></slot>
    <slot name="dcterms:modified"></slot>
    <slot name="dcterms:available"></slot>
    <slot name="dcterms:issued"></slot>
    <slot name="dcterms:valid"></slot>
    <slot name="dcterms:dateAccepted"></slot>
    <slot name="dcterms:dateCopyrighted"></slot>
    <slot name="dcterms:dateSubmitted"></slot>
    <slot name="rdau:P60071"></slot>
    <slot name="phaidra:dateAccessioned"></slot>
    <slot name="dcterms:temporal"></slot>

    <slot name="schema:pageStart"></slot>
    <slot name="schema:pageEnd"></slot>
    <slot name="rdau:P60193"></slot>
    <slot name="rdau:P60101"></slot>
    <slot name="cito:cites"></slot>
    <slot name="cito:isCitedBy"></slot>
    <slot name="bf:provisionActivity"></slot>
    <slot name="rdau:P60227"></slot>

    <slot name="frapo:hasFundingAgency"></slot>
    <slot name="frapo:isOutputOf"></slot>
    <slot name="rdax:P00009"></slot>
    <slot name="dcterms:provenance"></slot>

    <slot name="dcterms:spatial"></slot>
    <slot name="vra:placeOfCreation"></slot>
    <slot name="vra:placeOfRepository"></slot>
    <slot name="vra:placeOfSite"></slot>

    <slot name="rdau:P60550"></slot>
    <slot name="schema:numberOfPages"></slot>
    <slot name="bf:soundCharacteristic"></slot>
    <slot name="bf:supplementaryContent"></slot>
    <slot name="bf:awards"></slot>
    <slot name="dcterms:audience"></slot>
    <slot name="rdau:P60059"></slot>

    <slot name="ebucore:filename"></slot>
    <slot name="ebucore:hasMimeType"></slot>

    <slot name="opaque:cco_accessionNumber"></slot>
    <slot name="bf:shelfMark"></slot>
    <slot name="bf:physicalLocation"></slot>

    <slot name="vra:hasInscription"></slot>
    <slot name="vra:material"></slot>
    <slot name="vra:hasTechnique"></slot>
    <slot name="dce:format"></slot>
    <slot name="rdau:P60048"></slot>
    <slot name="schema:width"></slot>
    <slot name="schema:height"></slot>
    <slot name="schema:depth"></slot>
    <slot name="vra:diameter"></slot>
    <slot name="schema:weight"></slot>
    <slot name="schema:duration"></slot>
    <slot name="bf:scale"></slot>
    <slot name="rdfs:seeAlso"></slot>

    <slot name="dcterms:type"></slot>
    <slot name="pid"></slot>
    <slot name="rdam:P30004"></slot>

    <slot name="oaire:version"></slot>
    <slot name="dcterms:accessRights"></slot>
    <slot name="edm:rights"></slot>
    <slot name="dce:rights"></slot>

    <slot name="dcterms:subject"></slot>

    <slot name="phaidra:systemTag"></slot>

    <slot name="unknown-predicate"></slot>
  </v-container>
</template>
<script>
export default {
  name: 'p-d-jsonld-layout'
}
</script>
