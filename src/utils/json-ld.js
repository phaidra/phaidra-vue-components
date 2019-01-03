import fields from '@/utils/fields'
import { nextTick } from 'q';

export default {
  json2components: function (jsonld) {
    var components = []

    Object.entries(jsonld).forEach(([key, value]) => {

      if (key !== '@type') {

        var i
        var j
        for (i = 0; i < value.length; i++) {
        
          var f

          // dce:title
          if (key === 'dce:title') {
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
          }

          // role
          if (key.startsWith('role')) {
            var pred_role = key.split(':')
            if (pred_role[1] && (value[i]['@type'] === 'schema:Person')) {
              f = fields.getField('role')
              f.role = pred_role[1]
              if (value[i]['schema:familyName']) {
                for (j = 0; j < value[i]['schema:familyName'].length; j++) {
                  f.firstname = value[i]['schema:familyName'][j]['@value']
                }
              }
              if (value[i]['schema:givenName']) {
                for (j = 0; j < value[i]['schema:givenName'].length; j++) {
                  f.lastname = value[i]['schema:givenName'][j]['@value']
                }
              }
              if (value[i]['dcterms:date']) {
                for (j = 0; j < value[i]['dcterms:date'].length; j++) {
                  f.date = value[i]['dcterms:date'][j]
                }
              }
              components.push(f)
            }
          }

          // bf:note
          if (key === 'bf:note') {
            switch (value[i]['@type']) {
              case 'bf:Note':
                f = fields.getField('description')
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
          }

          // dcterms:language
          if (key === 'dcterms:language') {
            f = fields.getField('language')
            for (j = 0; j < value[i].length; j++) {              
              f.value = value[i]
            }
            components.push(f)
          }

          // dce:subject
          if (key === 'dce:subject') {
            if (value[i]['@type'] === 'skos:Concept') {
              f = fields.getField('keyword')
              for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                f.value = value[i]['skos:prefLabel'][j]['@value']
                f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
              }
              components.push(f)
            }
          }

          // schema:temporalCoverage
          if (key === 'schema:temporalCoverage') {
            f = fields.getField('temporal-coverage')             
            f.value = value[i]['@value']
            f.language = value[i]['@language'] ? value[i]['@language'] : 'eng'              
            components.push(f)
          }

          // dcterms:spatial
          if (key === 'dcterms:spatial') {
            if (value[i]['@type'] === 'schema:Place' && !(value[i]['skos:exactMatch'])){
              f = fields.getField('spatial-text')
              for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                f.value = value[i]['skos:prefLabel'][j]['@value']
                f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
              }
              components.push(f)
            }
          }

          // dcterms:spatial - getty
          // TODO fix readonly
          /*
          if (key === 'dcterms:spatial') {
            if (value[i]['@type'] === 'schema:Place' && value[i]['skos:exactMatch']){
              f = fields.getField('spatial-getty-tgn-readonly')
              for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                f.value = value[i]['skos:prefLabel'][j]['@value']
              }
              components.push(f)
              f = fields.getField('spatial-getty-tgn')
              components.push(f)
            }
          }
          */

          // dcterms:type
          if (key === 'dcterms:type') {
            f = fields.getField('resource-type')
            for (j = 0; j < value[i].length; j++) {              
              f.value = value[i]
            }
            components.push(f)
          }

          // dcterms:issued

          // edm:rights
          if (key === 'edm:rights') {
            f = fields.getField('license')
            for (j = 0; j < value[i].length; j++) {              
              f.value = value[i]
            }
            components.push(f)
          }

          // dce:rights
          if (key === 'dce:rights') {
            f = fields.getField('rights')             
            f.value = value[i]['@value']
            f.language = value[i]['@language'] ? value[i]['@language'] : 'eng'              
            components.push(f)
          }

          // frapo:hasFundingAgency
          if (key === 'frapo:hasFundingAgency') {
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
          }

          // frapo:isOutputOf
          if (key === 'frapo:isOutputOf') {
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
          }

          // dcterms:provenance
          // TODO fix skos:prefLabel
          if (key === 'dcterms:provenance') {
            if (value[i]['@type'] === 'dcterms:ProvenanceStatement'){
              f = fields.getField('provenance')
              for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                f.value = value[i]['skos:prefLabel'][j]['@value']
                f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
              }
              components.push(f)
            }
          }

          // ebucore:filename
          // TODO fix readonly

          // ebucore:hasMimeType
          if (key === 'ebucore:hasMimeType') {
            f = fields.getField('mime-type')
            for (j = 0; j < value[i].length; j++) {              
              f.value = value[i]
            }
            components.push(f)
          }

          // opaque:cco_accessionNumber
          if (key === 'opaque:cco_accessionNumber') {
            f = fields.getField('accession-number')
            for (j = 0; j < value[i].length; j++) {              
              f.value = value[i]
            }
            components.push(f)
          }
          
          // bf:shelfMark
          if (key === 'bf:shelfMark') {
            f = fields.getField('shelf-mark')
            for (j = 0; j < value[i].length; j++) {              
              f.value = value[i]
            }
            components.push(f)
          }

          // bf:physicalLocation
          if (key === 'bf:physicalLocation') {
            f = fields.getField('physical-location')             
            f.value = value[i]['@value']
            f.language = value[i]['@language'] ? value[i]['@language'] : 'eng'              
            components.push(f)
          }

          // vra:hasInscription
          if (key === 'vra:hasInscription') {
            if (value[i]['@type'] === 'vra:Inscription') {
              f = fields.getField('inscription')
              for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                f.value = value[i]['skos:prefLabel'][j]['@value']
                f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
              }
              components.push(f)
            }
          }

          // vra:material
          if (key === 'vra:material') {
            if (value[i]['@type'] === 'vra:Material') {
              f = fields.getField('material')
              for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                f.value = value[i]['skos:prefLabel'][j]['@value']
                f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
              }
              components.push(f)
            }
          }

          // vra:hasTechnique
          if (key === 'vra:hasTechnique') {
            if (value[i]['@type'] === 'vra:Technique' && !(value[i]['skos:exactMatch'])) {
              f = fields.getField('technique-text')
              for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                f.value = value[i]['skos:prefLabel'][j]['@value']
                f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
              }
              components.push(f)
            }
          }

          // vra:hasTechnique - getty aat
          // TODO: fix readonly
          /*
          if (key === 'vra:hasTechnique') {
            if (value[i]['@type'] === 'vra:Technique' && (value[i]['skos:exactMatch'])) {
              f = fields.getField('readonly')
              for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {              
                f.value = value[i]['skos:prefLabel'][j]['@value']
                f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'              
              }
              f = fields.getField('technique-getty-aat')
              components.push(f)
            }
          }
          */

          // schema:width
          if (key === 'schema:width') {
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
          }
          
          // schema:height
          if (key === 'schema:height') {
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
          }

          // schema:depth
          if (key === 'schema:depth') {
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
          }
        
          // TODO: Handle unknown! Predicate + type
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
    
    return ordered
  },
  json2form: function (jsonld) {

    var levels = {
      digital: {
        components: []
      },
      analog: [],
      subject: []
    }

    levels.digital.components = this.json2components(jsonld)

    Object.entries(jsonld).forEach(([key, value]) => {
      var i
      if (key === 'prov:wasDerivedFrom') {
        for (i = 0; i < value.length; i++) {
          if (value[i]['@type'] === 'phaidra:DigitizedObject') {
            levels.analog.push( { components: this.json2components(value[i]) } )
          }
        }
      }
    })

    Object.entries(jsonld).forEach(([key, value]) => {
      var i
      if (key === 'dcterms:subject') {
        for (i = 0; i < value.length; i++) {
          if (value[i]['@type'] === 'phaidra:Subject') {
            levels.subject.push( { components: this.json2components(value[i]) } )
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

    var i
    for (i = 0; i < levels.analog.length; i++) {
      var analogFields = this.getOrderedComponents(levels.analog[i].components)
      form.sections.push(
        {
          title: 'Digitized object',
          type: 'phaidra:DigitizedObject',
          id: 'analog-'+i,
          fields: analogFields
        }
      )
    }

    for (i = 0; i < levels.subject.length; i++) {
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
  get_json_object (rdfslabels, preflabels, type, identifiers) {
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
      h['skos:prefLabel'] = []
      for (var i = 0; i < rdfslabels.length; i++) {
        h['skos:prefLabel'].push(rdfslabels[i])
      }
    }

    if (identifiers) {
      h['skos:exactMatch'] = identifiers
    }
    return h
  },
  get_json_spatial (rdfslabels, preflabels, coordinates, type, identifiers) {
    var h = {}

    if (type) {
      h['@type'] = type
    }

    h['skos:prefLabel'] = []
    for (var i = 0; i < rdfslabels.length; i++) {
      h['skos:prefLabel'].push(rdfslabels[i])
    }

    if (preflabels) {
      if (preflabels.length > 0) {
        h['skos:prefLabel'] = []
        for (var j = 0; j < preflabels.length; j++) {
          h['skos:prefLabel'].push(preflabels[j])
        }
      }
    }

    if (identifiers) {
      h['skos:exactMatch'] = identifiers
    }

    if (coordinates) {
      h['schema:geo'] = [
        {
          '@type': 'schema:GeoCoordinates',
          'schema:latitude': [
            coordinates['schema:latitude']
          ],
          'schema:longitude': [
            coordinates['schema:longitude']
          ]
        }
      ]
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
      if (s.type === 'phaidra:DigitizedObject') {
        jsonldid = 'digitized-object'
        jsonlds[jsonldid] = {
          '@type': 'phaidra:DigitizedObject'
        }
      }

      this.fields2json(jsonlds[jsonldid], s)
    }

    Object.keys(jsonlds).forEach(function (key) {
      if (key === 'digitized-object') {
        if (!jsonlds['container']['prov:wasDerivedFrom']) {
          jsonlds['container']['prov:wasDerivedFrom'] = []
        }
        jsonlds['container']['prov:wasDerivedFrom'].push(jsonlds[key])
        delete jsonlds[key]
      }
      if (key.startsWith('subject-')) {
        if (!jsonlds['container']['dcterms:subject']) {
          jsonlds['container']['dcterms:subject'] = []
        }
        jsonlds['container']['dcterms:subject'].push(jsonlds[key])
        delete jsonlds[key]
      }
    })

    return jsonlds
  },
  form2json (formData) {
    var jsonlds = {}

    for (var i = 0; i < formData.sections.length; i++) {
      var s = formData.sections[i]
      var jsonldid
      if (s.type === 'phaidra:Subject') {
        jsonldid = 'subject-' + i
        jsonlds[jsonldid] = {
          '@type': 'phaidra:Subject'
        }
        this.fields2json(jsonlds[jsonldid], s)
      } else { 
        if (s.type === 'phaidra:DigitizedObject') {
          jsonldid = 'digitized-object'
          jsonlds[jsonldid] = {}
          this.fields2json(jsonlds[jsonldid], s)
        }else{
          this.fields2json(jsonlds, s)
        }
      }
    }

    Object.keys(jsonlds).forEach(function (key) {
      if (key === 'digitized-object') {
        jsonlds['prov:wasDerivedFrom'] = jsonlds[key]
        jsonlds['prov:wasDerivedFrom']['@type'] = 'phaidra:DigitizedObject'
        delete jsonlds[key]
      }
      if (key.startsWith('subject-')) {
        if (!jsonlds['dcterms:subject']) {
          jsonlds['dcterms:subject'] = []
        }
        jsonlds['dcterms:subject'].push(jsonlds[key])
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
          if (f.value) {
            this.push_literal(jsonld, f.predicate, f.value)
          }
          break

        case 'role':
          if (f.role && (f.firstname || f.lastname || f.institution || f.identifier)) {
            this.push_object(jsonld, 'role:' + f.role, this.get_json_role(f.type, f.firstname, f.lastname, f.institution, f.date, f.identifier ? [f.identifier] : null))
          }
          break

        case 'edm:rights':
          if (f.value) {
            this.push_literal(jsonld, f.predicate, f.value)
          }
          break

        case 'dce:rights':
        case 'schema:temporalCoverage':
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
            this.push_object(jsonld, f.predicate, this.get_json_object(f['skos:prefLabel'], null, 'vra:Technique', f.value))
          } else {
            if (f.value) {
              this.push_object(jsonld, f.predicate, this.get_json_object([{ '@value': f.value, '@language': f.language }], null, 'vra:Technique'))
            }
          }
          break

        case 'schema:width':
        case 'schema:height':
        case 'schema:depth':
        case 'schema:weight':
          if (f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_quantitativevalue(f.value, f.unitCode))
          }
          break

        case 'dcterms:provenance':
          if (f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_object([{ '@value': f.value, '@language': f.language }], null, 'dcterms:ProvenanceStatement'))
          }
          break

        case 'dcterms:spatial':
          if (f.component === 'p-gbv-suggest-getty' && f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_spatial(f['skos:prefLabel'], f['skos:prefLabel'], f.coordinates, 'schema:Place', [f.value]))
          } else {
            if (f.value) {
              this.push_object(jsonld, f.predicate, this.get_json_object([{ '@value': f.value, '@language': f.language }], null, 'schema:Place'))
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
          // console.error('form2json: unrecognized predicate ', f.predicate, f)
      }
    }
    return jsonld
  }
}
