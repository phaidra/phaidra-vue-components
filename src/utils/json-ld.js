import fields from './fields'

export default {
  json2components: function (jsonld) {
    var components = []

    Object.entries(jsonld).forEach(([key, value]) => {

      if (key !== '@type') {

        var i
        var j
        for (i = 0; i < value.length; i++) {
        
          var f

          switch (key) {

            // dce:title
            case 'dce:title':
              if (value[i]['@type'] === 'bf:Title') {
                f = fields.getField('title')
                if (value[i]['bf:mainTitle']) {
                  for (j = 0; j < value[i]['bf:mainTitle'].length; j++) {
                    f.title = value[i]['bf:mainTitle'][j]['@value']
                    f.language = value[i]['bf:mainTitle'][j]['@language'] ? value[i]['bf:mainTitle'][j]['@language'] : 'eng'
                  }
                }
                if (value[i]['bf:subtitle']) {
                  for (j = 0; j < value[i]['bf:subtitle'].length; j++) {
                    f.subtitle = value[i]['bf:subtitle'][j]['@value']
                  }
                }
                components.push(f)
              }
              break

            // bf:note
            case 'bf:note':
              switch (value[i]['@type']) {
                case 'bf:Note':
                  f = fields.getField('description')
                  break;
                case 'bf:Summary':
                  f = fields.getField('abstract')
                  break;
                case 'phaidra:Remark':
                  f = fields.getField('note')
                  break;
                case 'phaidra:DigitizationNote':
                  f = fields.getField('digitization-note')
                  break;
                case 'phaidra:ConditionNote':
                  f = fields.getField('condition-note')
                  break;
                case 'phaidra:ReproductionNote':
                  f = fields.getField('reproduction-note')
                  break;
              }

              for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                f.value = value[i]['skos:prefLabel'][j]['@value']
                f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
              }
              components.push(f)
              break

            // dcterms:language
            case 'dcterms:language':
              f = fields.getField('language')
              for (j = 0; j < value[i].length; j++) {              
                f.value = value[i]
              }
              components.push(f)
              break

            // dce:subject
            case 'dce:subject':
              if (value[i]['@type'] === 'skos:Concept') {
                f = fields.getField('keyword')
                for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                  f.value = value[i]['skos:prefLabel'][j]['@value']
                  f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
                }
                components.push(f)
              }
              break

            // dcterms:subject
            case 'dcterms:subject':
              if (value[i]['@type'] === 'skos:Concept') {
                f = fields.getField('vocab-ext-readonly')
                f.value = value[i]['skos:exactMatch']
                f['skos:prefLabel'] = value[i]['skos:prefLabel']
                f['rdfs:label'] = value[i]['rdfs:label']
                f.predicate = key
                f.label = 'Classification'
                components.push(f)
                // TODO: add classification
              } else {
                if (value[i]['@type'] === 'phaidra:Subject') {
                  // ignore, handled elsewhere
                }
              }
              break

            // dcterms:temporal
            case 'dcterms:temporal':
              f = fields.getField('temporal-coverage')             
              f.value = value[i]['@value']
              f.language = value[i]['@language'] ? value[i]['@language'] : 'eng'              
              components.push(f)
              break

            // spatial
            case 'dcterms:spatial':
            case 'vra:placeOfCreation':
            case 'vra:placeOfRepository':
            case 'vra:placeOfSite':
              if (value[i]['@type'] === 'schema:Place' && !(value[i]['skos:exactMatch'])){
                // freetext
                f = fields.getField('spatial-text')
                f.type = key
                for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                  f.value = value[i]['skos:prefLabel'][j]['@value']
                  f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
                }
                components.push(f)
              } else {
                if (value[i]['@type'] === 'schema:Place' && value[i]['skos:exactMatch']){
                  // getty
                  f = fields.getField('spatial-getty-readonly')
                  if (value[i]['skos:exactMatch']) {
                    for (j = 0; j < value[i]['skos:exactMatch'].length; j++) { 
                      f.value = value[i]['skos:exactMatch'][j]
                    }
                  }
                  f['skos:prefLabel'] = value[i]['skos:prefLabel']
                  f['rdfs:label'] = value[i]['rdfs:label']
                  f.coordinates = value[i]['schema:geo']
                  f.predicate = key
                  f.type = key
                  f.label = key
                  components.push(f)
                  f = fields.getField('spatial-getty')
                  f.predicate = key
                  f.type = key
                  components.push(f)
                }
              }
              break

            // dcterms:type
            case 'dcterms:type':
              f = fields.getField('resource-type')
              for (j = 0; j < value[i]['skos:exactMatch'].length; j++) {
                f.value = value[i]['skos:exactMatch'][j]
              }
              components.push(f)
              break

            // edm:hasType
            case 'edm:hasType':
              f = fields.getField('genre')
              for (j = 0; j < value[i]['skos:exactMatch'].length; j++) {
                f.value = value[i]['skos:exactMatch'][j]
              }
              components.push(f)
              break

            // edm:rights
            case 'edm:rights':
              f = fields.getField('license')             
              f.value = value[i]
              components.push(f)
              break

            // dce:rights
            case 'dce:rights':
              f = fields.getField('rights')             
              f.value = value[i]['@value']
              f.language = value[i]['@language'] ? value[i]['@language'] : 'eng'              
              components.push(f)
              break

            // frapo:hasFundingAgency
            case 'frapo:hasFundingAgency':
              if (value[i]['@type'] === 'frapo:FundingAgency'){
                f = fields.getField('funder')
                if (value[i]['skos:prefLabel']) {
                  for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                    f.name = value[i]['skos:prefLabel'][j]['@value']
                    f.nameLanguage = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
                  }
                }
                if (value[i]['skos:exactMatch']) {
                  for (j = 0; j < value[i]['skos:exactMatch'].length; j++) {              
                    f.identifier = value[i]['skos:exactMatch'][j]
                  }
                }              
                components.push(f)
              }
              break

            // frapo:isOutputOf
            case 'frapo:isOutputOf':
              if (value[i]['@type'] === 'foaf:Project'){
                f = fields.getField('project')
                if (value[i]['skos:prefLabel']) {
                  for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                    f.name = value[i]['skos:prefLabel'][j]['@value']
                    f.nameLanguage = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
                  }
                }
                if (value[i]['rdfs:comment']) {
                  for (j = 0; j < value[i]['rdfs:comment'].length; j++) {              
                    f.description = value[i]['rdfs:comment'][j]['@value']
                    f.descriptionLanguage = value[i]['rdfs:comment'][j]['@language'] ? value[i]['rdfs:comment'][j]['@language'] : 'eng'              
                  }
                }
                if (value[i]['skos:exactMatch']) {
                  for (j = 0; j < value[i]['skos:exactMatch'].length; j++) {              
                    f.identifier = value[i]['skos:exactMatch'][j]
                  }
                }
                if (value[i]['foaf:homepage']) {
                  for (j = 0; j < value[i]['foaf:homepage'].length; j++) {              
                    f.homepage = value[i]['foaf:homepage'][j]
                  }
                }           
                components.push(f)
              }
              break

            // dcterms:provenance
            // TODO fix skos:prefLabel?
            case 'dcterms:provenance':
              if (value[i]['@type'] === 'dcterms:ProvenanceStatement'){
                f = fields.getField('provenance')
                for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                  f.value = value[i]['skos:prefLabel'][j]['@value']
                  f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
                }
                components.push(f)
              }
              break

            // ebucore:filename
            case 'ebucore:filename':
              f = fields.getField('filename-readonly')
              f.predicate = key
              f.label = key
              f.value = value[i]
              components.push(f)
              break

            // ebucore:hasMimeType
            case 'ebucore:hasMimeType':
              f = fields.getField('mime-type')
              for (j = 0; j < value[i].length; j++) {              
                f.value = value[i]
              }
              components.push(f)
              break

            // opaque:cco_accessionNumber
            case 'opaque:cco_accessionNumber':
              f = fields.getField('accession-number')
              for (j = 0; j < value[i].length; j++) {              
                f.value = value[i]
              }
              components.push(f)
              break
            
            // bf:shelfMark
            case 'bf:shelfMark':
              f = fields.getField('shelf-mark')
              for (j = 0; j < value[i].length; j++) {              
                f.value = value[i]
              }
              components.push(f)
              break

            // bf:physicalLocation
            case 'bf:physicalLocation':
              f = fields.getField('physical-location')             
              f.value = value[i]['@value']
              f.language = value[i]['@language'] ? value[i]['@language'] : 'eng'              
              components.push(f)
              break

            // vra:hasInscription
            case 'vra:hasInscription':
              if (value[i]['@type'] === 'vra:Inscription') {
                f = fields.getField('inscription')
                for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                  f.value = value[i]['skos:prefLabel'][j]['@value']
                  f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
                }
                components.push(f)
              }
              break

            // vra:material
            case 'vra:material':
              if (value[i]['@type'] === 'vra:Material') {
                f = fields.getField('material')
                for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                  f.value = value[i]['skos:prefLabel'][j]['@value']
                  f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
                }
                components.push(f)
              }
              break

            // vra:hasTechnique
            case 'vra:hasTechnique':
              if (value[i]['@type'] === 'vra:Technique' && !(value[i]['skos:exactMatch'])) {
                f = fields.getField('technique-text')
                for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                  f.value = value[i]['skos:prefLabel'][j]['@value']
                  f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
                }
                components.push(f)
              } else {
                // vra:hasTechnique - getty aat
                if (value[i]['@type'] === 'vra:Technique' && (value[i]['skos:exactMatch'])) {
                  f = fields.getField('vocab-ext-readonly')
                  f['skos:exactMatch'] = value[i]['skos:exactMatch']
                  f['skos:prefLabel'] = value[i]['skos:prefLabel']
                  f['rdfs:label'] = value[i]['rdfs:label']
                  f.predicate = key
                  f.label = 'Technique'
                  components.push(f)
                  f = fields.getField('technique-getty')
                  components.push(f)
                }
              }
              break

            // schema:width
            case 'schema:width':
              if (value[i]['@type'] === 'schema:QuantitativeValue') {
                f = fields.getField('width')
                for (j = 0; j < value[i]['schema:unitCode'].length; j++) {              
                  f.unit = value[i]['schema:unitCode'][j]
                }
                for (j = 0; j < value[i]['schema:value'].length; j++) {              
                  f.value = value[i]['schema:value'][j]
                }
                components.push(f)
              }
              break
            
            // schema:height
            case 'schema:height':
              if (value[i]['@type'] === 'schema:QuantitativeValue') {
                f = fields.getField('height')
                for (j = 0; j < value[i]['schema:unitCode'].length; j++) {              
                  f.unit = value[i]['schema:unitCode'][j]
                }
                for (j = 0; j < value[i]['schema:value'].length; j++) {              
                  f.value = value[i]['schema:value'][j]
                }
                components.push(f)
              }
              break

            // schema:depth
            case 'schema:depth':
              if (value[i]['@type'] === 'schema:QuantitativeValue') {
                f = fields.getField('depth')
                for (j = 0; j < value[i]['schema:unitCode'].length; j++) {
                  f.unit = value[i]['schema:unitCode'][j]
                }
                for (j = 0; j < value[i]['schema:value'].length; j++) {
                  f.value = value[i]['schema:value'][j]
                }
                components.push(f)
              }
              break

            // dates
            case 'dcterms:date':
            case 'dcterms:created':
            case 'dcterms:modified':
            case 'dcterms:available':
            case 'dcterms:issued':
            case 'dcterms:valid':
            case 'dcterms:dateAccepted':
            case 'dcterms:dateCopyrighted':
            case 'dcterms:dateSubmitted':
            case 'phaidra:dateAccessioned':
              // only edtf now (later time can be edm:TimeSpan)
              if (typeof value[i] === 'string') {
                f = fields.getField('date-edtf')
                f.type = key
                f.value = value[i]
                components.push(f)
              }
              break

            default:

              // role
              if (key.startsWith('role')) {
                if (value[i]['@type'] === 'schema:Person') {
                  f = fields.getField('role')
                  f.role = key
                  if (value[i]['schema:familyName']) {
                    for (j = 0; j < value[i]['schema:familyName'].length; j++) {
                      f.lastname = value[i]['schema:familyName'][j]['@value']
                    }
                  }
                  if (value[i]['schema:givenName']) {
                    for (j = 0; j < value[i]['schema:givenName'].length; j++) {
                      f.firstname = value[i]['schema:givenName'][j]['@value']
                    }
                  }
                  components.push(f)
                }
              }else{
                // unknown predicate
                f = fields.getField('readonly')
                f.jsonld = value[i]
                f.predicate = key
                f.label = key
                components.push(f)
              }
              break
          }

        }
      }
    })

    return components
  },
  getOrderedComponents: function (components) {
    var predicateOrder = fields.getPredicateOrder()
    var ordered = []
    var i
    var j
    for (i = 0; i < predicateOrder.length; i++) {
      for (j = 0; j < components.length; j++) {
        if (components[j].predicate === predicateOrder[i]) {
          ordered.push(components[j]);
        }
      }
    }
    for (j = 0; j < components.length; j++) {
      if (components[j].component === 'p-unknown-readonly') {
        ordered.push(components[j]);
      }
    }
    return ordered
  },
  json2form: function (jsonld) {

    var levels = {
      digital: {
        components: []
      }
    }

    levels.digital.components = this.json2components(jsonld)

    Object.entries(jsonld).forEach(([key, value]) => {
      var i
      if (key === 'dcterms:subject') {
        levels['subject'] = []
        for (i = 0; i < value.length; i++) {
          if (value[i]['@type'] === 'phaidra:Subject') {
            var subcomp = this.json2components(value[i])
            if (subcomp.length > 0) {
              levels.subject.push( { components: subcomp } )
            }
          }
        }
      }
    })

    var form = {
      sections: []
    }

    var digitalFields = this.getOrderedComponents(levels.digital.components)

    form.sections.push(
      {
        title: 'General metadata',
        id: 1,
        fields: digitalFields
      }
    )

    if (levels['subject']) {
      for (var i = 0; i < levels.subject.length; i++) {
        var subjectFields = this.getOrderedComponents(levels.subject[i].components)
        form.sections.push(
          {
            title: 'Subject',
            type: 'phaidra:Subject',
            id: 'subject-'+i,
            fields: subjectFields
          }
        )
      }
    }

    return form
  },
  get_json_dce_title (title, subtitle, language) {
    var h = {
      '@type': 'bf:Title',
      'bf:mainTitle': [
        {
          '@value': title
        }
      ]
    }
    if (language) {
      h['bf:mainTitle'][0]['@language'] = language
    }
    if (subtitle) {
      h['bf:subtitle'] = [
        {
          '@value': subtitle
        }
      ]
      if (language) {
        h['bf:subtitle'][0]['@language'] = language
      }
    }
    return h
  },
  get_json_bf_note (value, language, type) {
    var h = {}

    if (type) {
      h['@type'] = type
    }

    h['skos:prefLabel'] = [
      {
        '@value': value
      }
    ]

    if (language) {
      h['skos:prefLabel'][0]['@language'] = language
    }

    return h
  },
  get_json_object (preflabels, rdfslabels, type, identifiers) {
    var h = {}

    if (type) {
      h['@type'] = type
    }

    if (preflabels) {
      if (preflabels.length > 0) {
        h['skos:prefLabel'] = []
        for (var j = 0; j < preflabels.length; j++) {
          h['skos:prefLabel'].push(preflabels[j])
        }
      }
    }

    if (rdfslabels) {
      if (rdfslabels.length > 0) {
        h['rdfs:label'] = []
        for (var i = 0; i < rdfslabels.length; i++) {
          h['rdfs:label'].push(rdfslabels[i])
        }
      }
    }

    if (identifiers) {
      if (identifiers.length > 0) {
        h['skos:exactMatch'] = identifiers
      }
    }
    return h
  },
  get_json_spatial (rdfslabels, preflabels, coordinates, type, identifiers) {
    var h = {}

    if (type) {
      h['@type'] = type
    }

    if (preflabels) {
      if (preflabels.length > 0) {
        h['skos:prefLabel'] = []
        for (var i = 0; i < preflabels.length; i++) {
          h['skos:prefLabel'].push(preflabels[i])
        }
      }
    }

    if (rdfslabels) {
      if (rdfslabels.length > 0) {
        h['rdfs:label'] = []
        for (var j = 0; j < rdfslabels.length; j++) {
          h['rdfs:label'].push(rdfslabels[j])
        }
      }
    }

    if (identifiers) {
      if (identifiers.length > 0) {
        h['skos:exactMatch'] = identifiers
      }
    }

    if (coordinates) {
      if (coordinates.length > 0) {
        h['schema:geo'] = coordinates
      }
    }

    return h
  },
  get_json_valueobject (value, language) {
    var h = {
      '@value': value
    }

    if (language) {
      h['@language'] = language
    }

    return h
  },
  get_json_quantitativevalue (value, unitCode) {
    var h = {
      '@type': 'schema:QuantitativeValue',
      'schema:unitCode': [
        unitCode
      ],
      'schema:value': [
        value
      ]
    }

    return h
  },
  get_json_role (type, firstname, lastname, institution, date, identifiers) {
    var h = {
      '@type': type
    }
    if (firstname) {
      h['schema:givenName'] = [
        {
          '@value': firstname
        }
      ]
    }
    if (lastname) {
      h['schema:familyName'] = [
        {
          '@value': lastname
        }
      ]
    }
    if (institution) {
      h['schema:name'] = [
        {
          '@value': institution
        }
      ]
    }
    if (date) {
      h['dcterms:date'] = [
        date
      ]
    }
    if (identifiers) {
      h['skos:exactMatch'] = identifiers
    }
    return h
  },
  get_json_project (name, nameLanguage, description, descriptionLanguage, identifiers, homepage) {
    var h = {
      '@type': 'foaf:Project'
    }
    if (name) {
      h['skos:prefLabel'] = [
        {
          '@value': name
        }
      ]
    }
    if (nameLanguage) {
      h['skos:prefLabel'][0]['@language'] = nameLanguage
    }
    if (description) {
      h['rdfs:comment'] = [
        {
          '@value': description
        }
      ]
    }
    if (descriptionLanguage) {
      h['rdfs:comment'][0]['@language'] = descriptionLanguage
    }
    if (identifiers) {
      h['skos:exactMatch'] = identifiers
    }
    if (homepage) {
      h['foaf:homepage'] = [
        homepage
      ]
    }
    return h
  },
  get_json_funder (name, nameLanguage, identifiers) {
    var h = {
      '@type': 'frapo:FundingAgency'
    }
    if (name) {
      h['skos:prefLabel'] = [
        {
          '@value': name
        }
      ]
    }
    if (nameLanguage) {
      h['skos:prefLabel'][0]['@language'] = nameLanguage
    }
    if (identifiers) {
      h['skos:exactMatch'] = identifiers
    }
    return h
  },
  validate_object (object) {
    if (!object['@type']) {
      // console.error('JSON-LD validation: missing @type attribute', object)
      return false
    }
    return true
  },
  push_object (jsonld, predicate, object) {
    if (this.validate_object(object)) {
      if (!jsonld[predicate]) {
        jsonld[predicate] = []
      }
      jsonld[predicate].push(object)
    }
  },
  push_literal (jsonld, predicate, value) {
    if (!jsonld[predicate]) {
      jsonld[predicate] = []
    }
    jsonld[predicate].push(value)
  },
  push_value (jsonld, predicate, valueobject) {
    if (!jsonld[predicate]) {
      jsonld[predicate] = []
    }
    jsonld[predicate].push(valueobject)
  },
  containerForm2json (formData) {
    var jsonlds = {}
    jsonlds['container'] = {}

    for (var i = 0; i < formData.sections.length; i++) {
      var s = formData.sections[i]
      var jsonldid = 'container'
      if (s.type === 'member') {
        jsonldid = 'member_' + s.id
        jsonlds[jsonldid] = {}
      }
      if (s.type === 'phaidra:Subject') {
        jsonldid = 'subject-' + i
        jsonlds[jsonldid] = {
          '@type': 'phaidra:Subject'
        }
      }
      // this should be more recursive - member can also have subject metadata
      this.fields2json(jsonlds[jsonldid], s)
    }

    Object.keys(jsonlds).forEach(function (key) {
      if (key.startsWith('subject-')) {
        if (Object.keys(jsonlds[key]).length > 1) {
          if (!jsonlds['container']['dcterms:subject']) {
            jsonlds['container']['dcterms:subject'] = []
          }
          jsonlds['container']['dcterms:subject'].push(jsonlds[key])
        }
        delete jsonlds[key]
      }
    })

    return jsonlds
  },
  form2json (formData) {
    var jsonlds = {}
    var i
    for (i = 0; i < formData.sections.length; i++) {
      var s = formData.sections[i]
      var jsonldid
      if (s.type === 'phaidra:Subject') {
        jsonldid = 'subject-' + i
        jsonlds[jsonldid] = {
          '@type': 'phaidra:Subject'
        }
        this.fields2json(jsonlds[jsonldid], s)
      }else {
        this.fields2json(jsonlds, s)
      }
    }

    Object.keys(jsonlds).forEach(function (key) {
      if (key.startsWith('subject-')) {
        if (Object.keys(jsonlds[key]).length > 1) {
          if (!jsonlds['dcterms:subject']) {
            jsonlds['dcterms:subject'] = []
          }
          jsonlds['dcterms:subject'].push(jsonlds[key])
        }
        delete jsonlds[key]
      }
    })

    return jsonlds
  },
  fields2json (jsonld, formData) {
    for (var j = 0; j < formData.fields.length; j++) {
      var f = formData.fields[j]

      switch (f.predicate) {

        case 'dce:title':
          if (f.title) {
            this.push_object(jsonld, f.predicate, this.get_json_dce_title(f.title, f.subtitle, f.language))
          }
          break

        case 'bf:note':
          if (f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_bf_note(f.value, f.language, f.type))
          }
          break

        case 'dcterms:language':
          if (f.value) {
            this.push_literal(jsonld, f.predicate, f.value)
          }
          break

        case 'dcterms:type':
        case 'edm:hasType':
          if (f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_object(f['skos:prefLabel'], null, 'skos:Concept', [f.value]))
          }
          break

        case 'role':
          if (f.role && (f.firstname || f.lastname || f.institution || f.identifier)) {
            this.push_object(jsonld, f.role, this.get_json_role(f.type, f.firstname, f.lastname, f.institution, f.date, f.identifier ? [f.identifier] : null))
          }
          break

        case 'edm:rights':
          if (f.value) {
            this.push_literal(jsonld, f.predicate, f.value)
          }
          break

        case 'dce:rights':
        case 'dcterms:temporal':
          if (f.value) {
            this.push_value(jsonld, f.predicate, this.get_json_valueobject(f.value, f.language))
          }
          break

        case 'dce:subject':
          if (f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_object([{ '@value': f.value, '@language': f.language }], null, 'skos:Concept'))
          }
          break

        case 'frapo:isOutputOf':
          if (f.name || f.identifier || f.description || f.homepage) {
            this.push_object(jsonld, f.predicate, this.get_json_project(f.name, f.nameLanguage, f.description, f.descriptionLanguage, [f.identifier], f.homepage))
          }
          break

        case 'frapo:hasFundingAgency':
          if (f.name || f.identifier) {
            this.push_object(jsonld, f.predicate, this.get_json_funder(f.name, f.nameLanguage, [f.identifier]))
          }
          break

        case 'opaque:cco_accessionNumber':
          if (f.value) {
            this.push_literal(jsonld, f.predicate, f.value)
          }
          break

        case 'bf:shelfMark':
          if (f.value) {
            this.push_literal(jsonld, f.predicate, f.value)
          }
          break

        case 'bf:physicalLocation':
          if (f.value) {
            this.push_value(jsonld, f.predicate, this.get_json_valueobject(f.value, f.language))
          }
          break

        case 'vra:hasInscription':
          if (f.component === 'p-select' && f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_object(null, null, 'vra:Inscription', f.value))
          } else {
            if (f.value) {
              this.push_object(jsonld, f.predicate, this.get_json_object([{ '@value': f.value, '@language': f.language }], null, 'vra:Inscription'))
            }
          }
          break

        case 'vra:material':
          if (f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_object([{ '@value': f.value, '@language': f.language }], null, 'vra:Material'))
          }
          break

        case 'vra:hasTechnique':
          if (f.component === 'p-select' && f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_object(f['skos:prefLabel'], null, 'vra:Technique', [ f.value ]))
          } else {
            if (f.component === 'p-vocab-ext-readonly') {
              this.push_object(jsonld, f.predicate, this.get_json_object(f['skos:prefLabel'], f['rdfs:label'], 'vra:Technique', f['skos:exactMatch']))
            } else {
              if (f.value) {
                this.push_object(jsonld, f.predicate, this.get_json_object([{ '@value': f.value, '@language': f.language }], null, 'vra:Technique'))
              }
            }
          }
          break

        case 'schema:width':
        case 'schema:height':
        case 'schema:depth':
        case 'schema:weight':
          if (f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_quantitativevalue(f.value, f.unit))
          }
          break

        case 'date':
        case 'dcterms:date':
        case 'dcterms:created':
        case 'dcterms:modified':
        case 'dcterms:available':
        case 'dcterms:issued':
        case 'dcterms:valid':
        case 'dcterms:dateAccepted':
        case 'dcterms:dateCopyrighted':
        case 'dcterms:dateSubmitted':
        case 'phaidra:dateAccessioned':
          if (f.value) {
            this.push_literal(jsonld, f.type, f.value)
          }
          break

        case 'dcterms:provenance':
          if (f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_object([{ '@value': f.value, '@language': f.language }], null, 'dcterms:ProvenanceStatement'))
          }
          break

        case 'spatial':
        case 'dcterms:spatial':
        case 'vra:placeOfCreation':
        case 'vra:placeOfRepository':
        case 'vra:placeOfSite':
          if (((f.component === 'p-spatial-getty') || (f.component === 'p-spatial-getty-readonly')) && f.value) {
            this.push_object(jsonld, f.type, this.get_json_spatial(f['rdfs:label'], f['skos:prefLabel'], f.coordinates, 'schema:Place', [f.value]))
          } else {
            if (f.value) {
              this.push_object(jsonld, f.type, this.get_json_object([{ '@value': f.value, '@language': f.language }], null, 'schema:Place'))
            }
          }
          break

        case 'ebucore:filename':
          if (f.value) {
            this.push_literal(jsonld, f.predicate, f.value)
          }
          break

        case 'ebucore:hasMimeType':
          if (f.value) {
            this.push_literal(jsonld, f.predicate, f.value)
          }
          break

        default:
          if (f.value) {
            jsonld[f.predicate] = f.value
          }
          break
      }
    }
    return jsonld
  }
}
