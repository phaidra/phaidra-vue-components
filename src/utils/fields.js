import uuid from '@/utils/uuid'

const fields = [
  {
    id: 'resource-type',
    predicate: 'dcterms:type',
    component: 'p-select',
    vocabulary: 'http://purl.org/coar/resource_type',
    required: true,
    multiplicable: false,
    label: 'Resource type',
    value: '',
    'skos:prefLabel': []
  },
  {
    id: 'title',
    predicate: 'dce:title',
    component: 'p-title',
    required: true,
    multiplicable: true,
    multilingual: true,
    ordergroup: 'title',
    label: 'Title',
    title: '',
    subtitle: '',
    language: 'eng'
  },
  {
    id: 'description',
    predicate: 'bf:note',
    type: 'bf:Note',
    component: 'p-text-field',
    multiplicable: true,
    multilingual: true,
    multiline: true,
    label: 'Description',
    value: '',
    language: 'eng'
  },
  {
    id: 'note',
    predicate: 'bf:note',
    type: 'phaidra:Remark',
    component: 'p-text-field',
    multilingual: true,
    multiline: true,
    label: 'Note',
    value: '',
    language: 'eng'
  },
  {
    id: 'digitization-note',
    predicate: 'bf:note',
    type: 'phaidra:DigitizationNote',
    component: 'p-text-field',
    multilingual: true,
    multiline: true,
    label: 'Digitization note',
    value: '',
    language: 'eng'
  },
  {
    id: 'condition-note',
    predicate: 'bf:note',
    type: 'phaidra:ConditionNote',
    component: 'p-text-field',
    multilingual: true,
    multiline: true,
    label: 'Condition',
    value: '',
    language: 'eng'
  },
  {
    id: 'reproduction-note',
    predicate: 'bf:note',
    type: 'phaidra:ReproductionNote',
    component: 'p-select',
    vocabulary: 'original-copy',
    label: 'Reproduction note',
    value: '',
    'skos:prefLabel': []
  },
  {
    id: 'language',
    predicate: 'dcterms:language',
    component: 'p-select',
    vocabulary: 'lang',
    required: true,
    multiplicable: true,
    label: 'Language',
    value: 'eng'
  },
  {
    id: 'role',
    predicate: 'role',
    type: 'schema:Person',
    component: 'p-entity',
    multiplicable: true,
    showidentifier: false,
    ordered: true,
    label: 'Contributions',
    firstname: '',
    lastname: '',
    role: '',
    date: ''
  },
  {
    id: 'keyword',
    predicate: 'dce:subject',
    component: 'p-text-field-suggest',
    suggester: 'keywordsuggester',
    multiplicable: true,
    multilingual: true,
    label: 'Keyword',
    value: '',
    language: 'eng'
  },
  {
    id: 'project',
    predicate: 'frapo:isOutputOf',
    component: 'p-project',
    name: '',
    nameLanguage: 'eng',
    description: '',
    descriptionLanguage: 'eng',
    identifier: '',
    homepage: ''
  },
  {
    id: 'funder',
    predicate: 'frapo:hasFundingAgency',
    component: 'p-funder',
    name: '',
    nameLanguage: 'eng',
    identifier: ''
  },
  {
    id: 'shelf-mark',
    predicate: 'bf:shelfMark',
    component: 'p-text-field',
    multiplicable: true,
    label: 'Call number',
    value: ''
  },
  {
    id: 'temporal-coverage',
    predicate: 'schema:temporalCoverage',
    component: 'p-text-field',
    label: 'Temporal coverage',
    multilingual: true,
    value: '',
    language: 'eng'
  },
  {
    id: 'provenance',
    predicate: 'dcterms:provenance',
    component: 'p-text-field',
    multiline: true,
    multilingual: true,
    label: 'Provenance',
    value: '',
    language: 'eng'
  },
  {
    id: 'physical-location',
    predicate: 'bf:physicalLocation',
    component: 'p-text-field',
    label: 'Physical location',
    multilingual: true,
    value: '',
    language: 'eng'
  },
  {
    id: 'accession-number',
    predicate: 'opaque:cco_accessionNumber',
    component: 'p-text-field',
    label: 'Accession number',
    value: ''
  },
  {
    id: 'technique-getty-aat',
    predicate: 'vra:hasTechnique',
    type: 'vra:Technique',
    component: 'p-select',
    vocabulary: 'getty-aat-photo',
    label: 'Technique',
    value: '',
    'skos:prefLabel': []
  },
  {
    id: 'technique-text',
    predicate: 'vra:hasTechnique',
    type: 'vra:Technique',
    component: 'p-text-field',
    multilingual: true,
    multiplicable: true,
    label: 'Technique',
    value: '',
    language: 'eng',
    'skos:prefLabel': []
  },
  {
    id: 'material',
    predicate: 'vra:material',
    type: 'vra:Material',
    component: 'p-text-field',
    multilingual: true,
    multiplicable: true,
    label: 'Material description',
    value: '',
    language: 'eng'
  },
  {
    id: 'height',
    predicate: 'schema:height',
    component: 'p-dimension',
    label: 'Height',
    unit: 'CMT',
    value: ''
  },
  {
    id: 'width',
    predicate: 'schema:width',
    component: 'p-dimension',
    label: 'Width',
    unit: 'CMT',
    value: ''
  },
  {
    id: 'depth',
    predicate: 'schema:depth',
    component: 'p-dimension',
    label: 'Depth',
    unit: 'CMT',
    value: ''
  },
  {
    id: 'inscription',
    predicate: 'vra:hasInscription',
    component: 'p-text-field-suggest',
    suggester: 'inscriptionsuggester',
    multiplicable: true,
    multilingual: true,
    label: 'Inscription/Stamp',
    value: '',
    language: 'eng'
  },
  {
    id: 'spatial-getty-tgn',
    predicate: 'dcterms:spatial',
    component: 'p-gbv-suggest-getty',
    multiplicable: true,
    voc: 'tgn',
    label: 'Place',
    value: '',
    'rdfs:label': [],
    'skos:prefLabel': []
  },
  {
    id: 'spatial-text',
    predicate: 'dcterms:spatial',
    component: 'p-text-field',
    multilingual: true,
    multiplicable: true,
    label: 'Place',
    value: '',
    language: 'eng'
  },    
  {
    id: 'mime-type',
    predicate: 'ebucore:hasMimeType',
    component: 'p-select',
    vocabulary: 'mime-types',
    label: 'MIME type',
    value: '',
    'skos:prefLabel': []
  },
  {
    id: 'license',
    predicate: 'edm:rights',
    component: 'p-select',
    vocabulary: 'licenses',
    label: 'License',
    value: '',
    'skos:prefLabel': []
  },
  {
    id: 'rights',
    predicate: 'dce:rights',
    component: 'p-text-field',
    multiline: true,
    multilingual: true,
    label: 'Rights statement',
    value: '',
    language: 'eng'
  },
  {
    id: 'file',
    predicate: 'ebucore:filename',
    component: 'input-file',
    label: 'Filename',
    value: ''
  }
]

const predicateOrder = [
  'dce:title',
  'role',
  'bf:note',
        
  'dcterms:language',
  'dce:subject',
  'schema:temporalCoverage',
  'dcterms:spatial',

  'dcterms:type',

  'dcterms:issued',
  'edm:rights',
  'dce:rights',
  'frapo:hasFundingAgency',
  'frapo:isOutputOf',
  'dcterms:provenance',

  'ebucore:filename',
  'ebucore:hasMimeType',

  'opaque:cco_accessionNumber',
  'bf:shelfMark',
  'bf:physicalLocation',

  'vra:hasInscription',
  'vra:material',
  'vra:hasTechnique',
  'schema:width',
  'schema:height',
  'schema:depth',
  'schema:weight'
]

export default {
  getField: function (id, ordergroup) {
    for (var i = 0; i < fields.length; i++) {
      if (fields[i]['id'] === id) {
        var field = JSON.parse(JSON.stringify(fields[i]))
        field.id = field.id + '_' + uuid.generate();
        field.ordergroup = ordergroup
        return field
      }
    }
  },
  getPredicateOrder: function () {
    return predicateOrder
  }
}
