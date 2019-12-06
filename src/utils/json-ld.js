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
            // rdam:P30004
            case 'rdam:P30004':
              f = fields.getField('alternate-identifier')
              f.type = value[i]['@type']
              f.value = value[i]['@value']
              components.push(f)
              break

            // dcterms:type
            case 'dcterms:type':
              f = fields.getField('resource-type')
              for (let em of value[i]['skos:exactMatch']) {
                f.value = em
              }
              components.push(f)
              break

            // edm:hasType
            case 'edm:hasType':
              f = fields.getField('object-type')
              for (let em of value[i]['skos:exactMatch']) {
                f.value = em
              }
              components.push(f)
              break

            // schema:genre
            case 'schema:genre':
              f = fields.getField('genre')
              for (let em of value[i]['skos:exactMatch']) {
                f.value = em
              }
              components.push(f)
              break

            // oaire:version
            case 'oaire:version':
              f = fields.getField('version-type')
              for (let em of value[i]['skos:exactMatch']) {
                f.value = em
              }
              components.push(f)
              break

            // dcterms:accessRights
            case 'dcterms:accessRights':
              f = fields.getField('access-right')
              for (let em of value[i]['skos:exactMatch']) {
                f.value = em
              }
              components.push(f)
              break

            // dce:title
            case 'dce:title':
              if ((value[i]['@type'] === 'bf:Title') || (value[i]['@type'] === 'bf:ParallelTitle')) {
                f = fields.getField('title')
                f.type = value[i]['@type']
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
                  break
                case 'bf:Summary':
                  f = fields.getField('abstract')
                  break
                case 'phaidra:Remark':
                  f = fields.getField('note')
                  break
                case 'phaidra:DigitizationNote':
                  f = fields.getField('digitization-note')
                  break
                case 'arm:ConditionAssessment':
                  f = fields.getField('condition-note')
                  break
                case 'phaidra:ReproductionNote':
                  f = fields.getField('reproduction-note')
                  break
              }

              for (let prefLabel of value[i]['skos:prefLabel']) {
                f.value = prefLabel['@value']
                f.language = prefLabel['@language'] ? prefLabel['@language'] : ''
              }
              components.push(f)
              break

            // bf:tableOfContents
            case 'bf:tableOfContents':
              f = fields.getField('table-of-contents')
              for (let prefLabel of value[i]['skos:prefLabel']) {
                f.value = prefLabel['@value']
                f.language = prefLabel['@language'] ? prefLabel['@language'] : ''
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

            // schema:subtitleLanguage
            case 'schema:subtitleLanguage':
              f = fields.getField('subtitle-language')
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
                f['skos:exactMatch'] = value[i]['skos:exactMatch']
                f['skos:prefLabel'] = value[i]['skos:prefLabel']
                f['rdfs:label'] = value[i]['rdfs:label']
                if (value[i]['skos:exactMatch']) {
                  for (j = 0; j < value[i]['skos:exactMatch'].length; j++) {
                    f.value = value[i]['skos:exactMatch'][j]
                  }
                }
                if (value[i]['skos:notation']) {
                  for (j = 0; j < value[i]['skos:notation'].length; j++) {
                    f['skos:notation'] = value[i]['skos:notation'][j]
                  }
                }
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

            case 'rdau:P60193':
              f = fields.getField('series')
              if (value[i]['dce:title']) {
                for (let t of value[i]['dce:title']) {
                  if (t['bf:mainTitle']) {
                    for (let mt of t['bf:mainTitle']) {
                      if (mt['@value']) {
                        f.title = mt['@value']
                      }
                      if (mt['@language']) {
                        f.titleLanguage = mt['@language']
                      }
                    }
                  }
                }
              }
              if (value[i]['bibo:volume']) {
                for (let v of value[i]['bibo:volume']) {
                  f.volume = v
                }
              }
              if (value[i]['bibo:issue']) {
                for (let v of value[i]['bibo:issue']) {
                  f.issue = v
                }
              }
              if (value[i]['dcterms:issued']) {
                for (let v of value[i]['dcterms:issued']) {
                  f.issued = v
                }
              }
              if (value[i]['identifiers:issn']) {
                for (let v of value[i]['identifiers:issn']) {
                  f.issn = v
                }
              }
              if (value[i]['skos:exactMatch']) {
                for (let v of value[i]['skos:exactMatch']) {
                  f.identifier = v
                }
              }
              components.push(f)
              break

            case 'rdau:P60101':
              f = fields.getField('contained-in')
              if (value[i]['dce:title']) {
                for (let t of value[i]['dce:title']) {
                  if (t['bf:mainTitle']) {
                    for (let mt of t['bf:mainTitle']) {
                      if (mt['@value']) {
                        f.title = mt['@value']
                      }
                      if (mt['@language']) {
                        f.titleLanguage = mt['@language']
                      }
                    }
                  }
                  if (t['bf:subtitle']) {
                    for (let st of t['bf:subtitle']) {
                      if (st['@value']) {
                        f.subtitle = st['@value']
                      }
                    }
                  }
                }
              }
              f.roles = []
              Object.entries(value[i]).forEach(([key, value]) => {
                if (key.startsWith('role')) {
                  let roleidx = 0
                  for (let role of value) {
                    roleidx++
                    let entity = {
                      id: 'contained-in-role-' + roleidx,
                      role: key,
                      ordergroup: 'contained-in-role'
                    }
                    if (role['schema:name']) {
                      for (let name of role['schema:name']) {
                        entity.name = name['@value']
                      }
                    }
                    if (role['schema:familyName']) {
                      for (let lastname of role['schema:familyName']) {
                        entity.lastname = lastname['@value']
                      }
                    }
                    if (role['schema:givenName']) {
                      for (let firstname of role['schema:givenName']) {
                        entity.firstname = firstname['@value']
                      }
                    }
                    f.roles.push(entity)
                  }
                }
              })
              if (value[i]['rdau:P60193']) {
                for (let series of value[i]['rdau:P60193']) {
                  if (series['dce:title']) {
                    for (let t of series['dce:title']) {
                      if (t['bf:mainTitle']) {
                        for (let mt of t['bf:mainTitle']) {
                          if (mt['@value']) {
                            f.seriesTitle = mt['@value']
                          }
                          if (mt['@language']) {
                            f.seriesTitleLanguage = mt['@language']
                          }
                        }
                      }
                    }
                  }
                  if (series['bibo:volume']) {
                    for (let v of series['bibo:volume']) {
                      f.seriesVolume = v
                    }
                  }
                  if (series['bibo:issue']) {
                    for (let v of series['bibo:issue']) {
                      f.seriesIssue = v
                    }
                  }
                  if (series['dcterms:issued']) {
                    for (let v of series['dcterms:issued']) {
                      f.seriesIssued = v
                    }
                  }
                  if (series['identifiers:issn']) {
                    for (let v of series['identifiers:issn']) {
                      f.seriesIssn = v
                    }
                  }
                  if (series['skos:exactMatch']) {
                    for (let v of series['skos:exactMatch']) {
                      f.seriesIdentifier = v
                    }
                  }
                }
              }
              components.push(f)
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
              if (value[i]['@type'] === 'schema:Place' && !(value[i]['skos:exactMatch'])) {
                // freetext
                f = fields.getField('spatial-text')
                f.type = key
                for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {
                  f.value = value[i]['skos:prefLabel'][j]['@value']
                  f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'
                }
                components.push(f)
              } else {
                if (value[i]['@type'] === 'schema:Place' && value[i]['skos:exactMatch']) {
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

            // dce:format
            case 'dce:format':
              f = fields.getField('dce-format-vocab')
              for (let em of value[i]['skos:exactMatch']) {
                f.value = em
              }
              components.push(f)
              break

            // rdau:P60048
            case 'rdau:P60048':
              f = fields.getField('carrier-type')
              for (let em of value[i]['skos:exactMatch']) {
                f.value = em
              }
              components.push(f)
              break

            // edm:rights
            case 'edm:rights':
              f = fields.getField('license')
              f.vocabulary = 'alllicenses'
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

            // bf:provisionActivity
            case 'bf:provisionActivity':
              f = fields.getField('bf-publication')
              if (value[i]['bf:agent']) {
                for (let pub of value[i]['bf:agent']) {
                  if (pub['skos:exactMatch']) {
                    for (let id of pub['skos:exactMatch']) {
                      if (id.startsWith('https://pid.phaidra.org/')) {
                        f.publisherType = 'select'
                        f.publisherOrgUnit = id
                      } else {
                        f.publisherType = 'other'
                        if (pub['schema:name']) {
                          for (let name of pub['schema:name']) {
                            f.publisherName = name['@value']
                          }
                        }
                      }
                    }
                  } else {
                    if (pub['schema:name']) {
                      f.publisherType = 'other'
                      if (pub['schema:name']) {
                        for (let name of pub['schema:name']) {
                          f.publisherName = name['@value']
                        }
                      }
                    }
                  }
                }
              }
              if (value[i]['bf:place']) {
                for (let pl of value[i]['bf:place']) {
                  if (pl['skos:prefLabel']) {
                    for (let pllab of pl['skos:prefLabel']) {
                      f.publishingPlace = pllab['@value']
                    }
                  }
                }
              }
              if (value[i]['bf:date']) {
                for (let pdate of value[i]['bf:date']) {
                  f.publishingDate = pdate
                }
              }
              components.push(f)
              break

            // citation
            case 'cito:cites':
            case 'cito:isCitedBy':
              f = fields.getField('citation')
              f.type = key
              for (let prefLabel of value[i]['skos:prefLabel']) {
                f.citation = prefLabel['@value']
                f.citationLanguage = prefLabel['@language'] ? prefLabel['@language'] : ''
              }
              for (let em of value[i]['skos:exactMatch']) {
                f.identifier = em
              }
              components.push(f)
              break

            // rdau:P60227
            case 'rdau:P60227':
              f = fields.getField('movieadaptation')
              if (value[i]['dce:title']) {
                for (let t of value[i]['dce:title']) {
                  if (t['bf:mainTitle']) {
                    for (let mt of t['bf:mainTitle']) {
                      if (mt['@value']) {
                        f.title = mt['@value']
                      }
                      if (mt['@language']) {
                        f.titleLanguage = mt['@language']
                      }
                    }
                    if (t['bf:subtitle']) {
                      for (let st of t['bf:subtitle']) {
                        if (st['@value']) {
                          f.subtitle = st['@value']
                        }
                      }
                    }
                  }
                }
              }
              for (let [pred, obj] of Object.entries(value[i])) {
                if (pred.startsWith('role')) {
                  for (let role of obj) {
                    if (role['@type'] === 'schema:Person') {
                      f.role = pred
                      if (role['schema:name']) {
                        for (let name of role['schema:name']) {
                          f.name = name['@value']
                          f.showname = true
                        }
                      }
                      if (role['schema:familyName']) {
                        for (let lastname of role['schema:familyName']) {
                          f.lastname = lastname['@value']
                        }
                      }
                      if (role['schema:givenName']) {
                        for (let firstname of role['schema:givenName']) {
                          f.firstname = firstname['@value']
                        }
                      }
                    }
                  }
                }
              }
              components.push(f)
              break

            // frapo:hasFundingAgency
            case 'frapo:hasFundingAgency':
              if (value[i]['@type'] === 'frapo:FundingAgency') {
                f = fields.getField('funder')
                if (value[i]['skos:prefLabel']) {
                  for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {
                    f.name = value[i]['skos:prefLabel'][j]['@value']
                    f.nameLanguage = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'
                  }
                }
                if (value[i]['skos:exactMatch']) {
                  for (let em of value[i]['skos:exactMatch']) {
                    f.identifier = em
                  }
                }
                components.push(f)
              }
              break

            // frapo:isOutputOf
            case 'frapo:isOutputOf':
              if (value[i]['@type'] === 'foaf:Project') {
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
                if (value[i]['frapo:hasFundingAgency']) {
                  for (let funder of value[i]['frapo:hasFundingAgency']) {
                    if (funder['skos:prefLabel']) {
                      for (let pl of funder['skos:prefLabel']) {
                        f.funderName = pl['@value']
                        f.funderNameLanguage = pl['@language'] ? pl['@language'] : 'eng'
                      }
                    }
                    if (funder['skos:exactMatch']) {
                      for (let em of funder['skos:exactMatch']) {
                        f.funderIdentifier = em
                      }
                    }
                  }
                }
                components.push(f)
              } else {
                if (value[i]['@type'] === 'aaiso:Programme') {
                  f = fields.getField('study-plan')
                  if (value[i]['skos:prefLabel']) {
                    for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {
                      f.name = value[i]['skos:prefLabel'][j]['@value']
                      f.nameLanguage = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'
                    }
                  }
                  if (value[i]['skos:notation']) {
                    for (j = 0; j < value[i]['skos:notation'].length; j++) {
                      f.notation = value[i]['skos:notation'][j]
                    }
                  }
                  components.push(f)
                }
              }
              break

            // rdax:P00009
            case 'rdax:P00009':
              f = fields.getField('association')
              for (let em of value[i]['skos:exactMatch']) {
                f.value = em
              }
              components.push(f)
              break

            // dcterms:provenance
            case 'dcterms:provenance':
              if (value[i]['@type'] === 'dcterms:ProvenanceStatement') {
                f = fields.getField('provenance')
                for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {
                  f.value = value[i]['skos:prefLabel'][j]['@value']
                  f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'
                }
                components.push(f)
              }
              break

            // schema:numberOfPages
            case 'schema:numberOfPages':
              f = fields.getField('number-of-pages')
              f.label = key
              f.value = value[i]
              components.push(f)
              break

            // bf:soundCharacteristic
            case 'bf:soundCharacteristic':
              f = fields.getField('sound-characteristic')
              f.label = key
              f.value = value[i]
              components.push(f)
              break

            // bf:supplementaryContent
            case 'bf:supplementaryContent':
              f = fields.getField('supplementary-content')
              for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {
                f.value = value[i]['skos:prefLabel'][j]['@value']
                f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'
              }
              components.push(f)
              break

            // bf:awards
            case 'bf:awards':
              f = fields.getField('award')
              for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {
                f.value = value[i]['skos:prefLabel'][j]['@value']
                f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'
              }
              components.push(f)
              break

            // rdau:P60059
            case 'rdau:P60059':
              f = fields.getField('regional-encoding')
              for (let em of value[i]['skos:exactMatch']) {
                f.value = em
              }
              components.push(f)
              break

            // ebucore:filename
            case 'ebucore:filename':
              f = fields.getField('filename')
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

            // rdau:P60550
            case 'rdau:P60550':
              f = fields.getField('extent')
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

            // bf:scale
            case 'bf:scale':
              if (value[i]['@type'] === 'bf:Scale') {
                f = fields.getField('scale')
                for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {
                  f.value = value[i]['skos:prefLabel'][j]['@value']
                }
                components.push(f)
              }
              break

            // vra:material
            case 'vra:material':
              if (value[i]['@type'] === 'vra:Material') {
                f = fields.getField('material-text')
                for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {
                  f.value = value[i]['skos:prefLabel'][j]['@value']
                  f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'
                }
                components.push(f)
              } else {
                // vra:material - vocab
                if (value[i]['@type'] === 'vra:material' && (value[i]['skos:exactMatch'])) {
                  f = fields.getField('material-vocab')
                  for (let em of value[i]['skos:exactMatch']) {
                    f.value = em
                  }
                  components.push(f)
                }
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
                // vra:hasTechnique - vocab
                if (value[i]['@type'] === 'vra:Technique' && (value[i]['skos:exactMatch'])) {
                  f = fields.getField('technique-vocab')
                  for (let em of value[i]['skos:exactMatch']) {
                    f.value = em
                  }
                  components.push(f)
                }
              }
              break

            // dcterms:audience
            case 'dcterms:audience':
              if (value[i]['@type'] === 'dcterms:audience' && !(value[i]['skos:exactMatch'])) {
                f = fields.getField('audience')
                for (j = 0; j < value[i]['skos:prefLabel'].length; j++) {
                  f.value = value[i]['skos:prefLabel'][j]['@value']
                  f.language = value[i]['skos:prefLabel'][j]['@language'] ? value[i]['skos:prefLabel'][j]['@language'] : 'eng'
                }
                components.push(f)
              } else {
                // dcterms:audience - select
                if (value[i]['@type'] === 'dcterms:audience' && (value[i]['skos:exactMatch'])) {
                  f = fields.getField('audience-vocab')
                  for (let em of value[i]['skos:exactMatch']) {
                    f.value = em
                  }
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
            case 'rdau:P60071':
            case 'phaidra:dateAccessioned':
              // only edtf now (later time can be edm:TimeSpan)
              if (typeof value[i] === 'string') {
                f = fields.getField('date-edtf')
                f.type = key
                f.value = value[i]
                components.push(f)
              }
              break

            // schema:pageStart
            case 'schema:pageStart':
              f = fields.getField('page-start')
              for (j = 0; j < value[i].length; j++) {
                f.value = value[i]
              }
              components.push(f)
              break

            // schema:pageEnd
            case 'schema:pageEnd':
              f = fields.getField('page-end')
              for (j = 0; j < value[i].length; j++) {
                f.value = value[i]
              }
              components.push(f)
              break

            // schema:duration
            case 'schema:duration':
              f = fields.getField('duration')
              for (j = 0; j < value[i].length; j++) {
                f.value = value[i]
              }
              components.push(f)
              break

            // phaidra:systemTag
            case 'phaidra:systemTag':
              f = fields.getField('system-tag')
              for (j = 0; j < value[i].length; j++) {
                f.value = value[i]
              }
              components.push(f)
              break

            default:

              // role
              if (key.startsWith('role')) {
                let role = value[i]
                f = fields.getField('role-extended')
                f.role = key
                f.type = role['@type']
                if (role['@type'] === 'schema:Person') {
                  if (role['schema:name']) {
                    for (let name of role['schema:name']) {
                      f.name = name['@value']
                      f.showname = true
                    }
                  }
                  if (role['schema:familyName']) {
                    for (let lastname of role['schema:familyName']) {
                      f.lastname = lastname['@value']
                    }
                  }
                  if (role['schema:givenName']) {
                    for (let firstname of role['schema:givenName']) {
                      f.firstname = firstname['@value']
                    }
                  }
                  if (role['skos:exactMatch']) {
                    for (let id of role['skos:exactMatch']) {
                      f.identifierType = id['@type']
                      f.identifierText = id['@value']
                    }
                  }
                  if (role['schema:affiliation']) {
                    for (let af of role['schema:affiliation']) {
                      if (af['skos:exactMatch']) {
                        for (let id of af['skos:exactMatch']) {
                          if (id.startsWith('https://pid.phaidra.org/')) {
                            f.affiliationType = 'select'
                            f.affiliation = id
                          } else {
                            f.affiliationType = 'other'
                            if (af['schema:name']) {
                              for (let name of af['schema:name']) {
                                f.affiliationText = name['@value']
                              }
                            }
                          }
                        }
                      } else {
                        if (af['schema:name']) {
                          f.affiliationType = 'other'
                          for (let name of af['schema:name']) {
                            f.affiliationText = name['@value']
                          }
                        }
                      }
                    }
                  }
                }
                if (role['@type'] === 'schema:Organization') {
                  if (role['skos:exactMatch']) {
                    for (let id of role['skos:exactMatch']) {
                      if (id.startsWith('https://pid.phaidra.org/')) {
                        f.organizationType = 'select'
                        f.organization = id
                      } else {
                        f.organizationType = 'other'
                        f.identifierText = id
                        if (role['schema:name']) {
                          for (let name of role['schema:name']) {
                            f.organizationText = name['@value']
                          }
                        }
                      }
                    }
                  } else {
                    if (role['schema:name']) {
                      for (let name of role['schema:name']) {
                        f.organizationText = name['@value']
                      }
                    }
                  }
                }
                components.push(f)
              } else {
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
          ordered.push(components[j])
        }
      }
    }
    for (j = 0; j < components.length; j++) {
      if (components[j].component === 'p-unknown-readonly') {
        ordered.push(components[j])
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
              levels.subject.push({ components: subcomp })
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
            id: 'subject-' + i,
            fields: subjectFields
          }
        )
      }
    }

    return form
  },
  get_json_dce_title (type, title, subtitle, language) {
    var h = {
      '@type': type,
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
  get_json_concept (preflabels, rdfslabels, type, identifiers, notations) {
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

    if (notations) {
      if (notations.length > 0) {
        h['skos:notation'] = notations
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
  get_json_role (f) {
    var h = {
      '@type': f.type
    }
    if (f.type === 'schema:Person') {
      if (f.firstname) {
        h['schema:givenName'] = [
          {
            '@value': f.firstname
          }
        ]
      }
      if (f.lastname) {
        h['schema:familyName'] = [
          {
            '@value': f.lastname
          }
        ]
      }
      if (f.name) {
        h['schema:name'] = [
          {
            '@value': f.name
          }
        ]
      }
      if (f.identifierText) {
        h['skos:exactMatch'] = [
          {
            '@type': f.identifierType,
            '@value': f.identifierText
          }
        ]
      }
      if (f.affiliation || f.affiliationText) {
        let a = {
          '@type': 'schema:Organization'
        }
        if (f.affiliationType === 'select') {
          a['schema:name'] = f.affiliationSelectedName
          a['skos:exactMatch'] = [ f.affiliation ]
        }
        if (f.affiliationType === 'other') {
          a['schema:name'] = [
            {
              '@value': f.affiliationText
            }
          ]
        }
        if (
          (f.affiliationType === 'select' && f.affiliationSelectedName) ||
          (f.affiliationType === 'other' && f.affiliationText)
        ) {
          h['schema:affiliation'] = [ a ]
        }
      }
    }
    if (f.type === 'schema:Organization') {
      if (f.organizationType === 'select') {
        h['schema:name'] = f.organizationSelectedName
        h['skos:exactMatch'] = [ f.organization ]
      }
      if (f.organizationType === 'other') {
        if (f.organizationText) {
          h['schema:name'] = [
            {
              '@value': f.organizationText
            }
          ]
        }
        if (f.identifierText) {
          h['skos:exactMatch'] = [ f.identifierText ]
        }
      }
    }
    return h
  },
  get_json_project (name, nameLanguage, description, descriptionLanguage, identifiers, homepage, funderObject) {
    var h = {
      '@type': 'foaf:Project'
    }
    if (name) {
      h['skos:prefLabel'] = [
        {
          '@value': name
        }
      ]
      if (nameLanguage) {
        h['skos:prefLabel'][0]['@language'] = nameLanguage
      }
    }
    if (description) {
      h['rdfs:comment'] = [
        {
          '@value': description
        }
      ]
      if (descriptionLanguage) {
        h['rdfs:comment'][0]['@language'] = descriptionLanguage
      }
    }
    if (identifiers) {
      if (identifiers.length > 0) {
        h['skos:exactMatch'] = identifiers
      }
    }
    if (homepage) {
      h['foaf:homepage'] = [
        homepage
      ]
    }
    if (funderObject) {
      h['frapo:hasFundingAgency'] = [
        funderObject
      ]
    }
    return h
  },
  get_json_series (type, title, titleLanguage, volume, issue, issued, issn, identifiers) {
    var h = {
      '@type': type
    }
    if (title) {
      let tit = {
        '@type': 'bf:Title',
        'bf:mainTitle': [
          {
            '@value': title
          }
        ]
      }
      if (titleLanguage) {
        tit['bf:mainTitle'][0]['@language'] = titleLanguage
      }
      h['dce:title'] = [ tit ]
    }
    if (volume) {
      h['bibo:volume'] = [ volume ]
    }
    if (issue) {
      h['bibo:issue'] = [ issue ]
    }
    if (issued) {
      h['dcterms:issued'] = [ issued ]
    }
    if (issn) {
      h['identifiers:issn'] = [ issn ]
    }
    if (identifiers) {
      if (identifiers.length > 0) {
        h['skos:exactMatch'] = identifiers
      }
    }
    return h
  },
  get_json_contained_in (f) {
    var h = {
      '@type': f.type
    }
    if (f.title) {
      let tit = {
        '@type': 'bf:Title',
        'bf:mainTitle': [
          {
            '@value': f.title
          }
        ]
      }
      if (f.titleLanguage) {
        tit['bf:mainTitle'][0]['@language'] = f.titleLanguage
      }
      if (f.subtitle) {
        tit['bf:subtitle'] = [
          {
            '@value': f.subtitle
          }
        ]
        if (f.titleLanguage) {
          tit['bf:subtitle'][0]['@language'] = f.titleLanguage
        }
      }
      h['dce:title'] = [ tit ]
    }
    if (f.roles) {
      if (f.roles.length > 0) {
        for (let role of f.roles) {
          if (role.role && (role.firstname || role.lastname || role.name)) {
            let entity = {
              '@type': 'schema:Person'
            }
            if (role.name) {
              entity['schema:name'] = [
                {
                  '@value': role.name
                }
              ]
            }
            if (role.firstname) {
              entity['schema:givenName'] = [
                {
                  '@value': role.firstname
                }
              ]
            }
            if (role.lastname) {
              entity['schema:familyName'] = [
                {
                  '@value': role.lastname
                }
              ]
            }
            if (!h[role.role]) {
              h[role.role] = []
            }
            h[role.role].push(entity)
          }
        }
      }
    }
    if (f.seriesTitle || f.seriesVolume || f.seriesIssue || f.seriesIssued || f.seriesIssn || f.seriesIdentifier) {
      let series = {
        '@type': f.seriesType
      }
      if (f.seriesTitle) {
        let tit = {
          '@type': 'bf:Title',
          'bf:mainTitle': [
            {
              '@value': f.seriesTitle
            }
          ]
        }
        if (f.seriesTitleLanguage) {
          tit['bf:mainTitle'][0]['@language'] = f.seriesTitleLanguage
        }
        series['dce:title'] = [ tit ]
      }
      if (f.seriesVolume) {
        series['bibo:volume'] = [ f.seriesVolume ]
      }
      if (f.seriesIssue) {
        series['bibo:issue'] = [ f.seriesIssue ]
      }
      if (f.seriesIssued) {
        series['dcterms:issued'] = [ f.seriesIssued ]
      }
      if (f.seriesIssn) {
        series['identifiers:issn'] = [ f.seriesIssn ]
      }
      if (f.seriesIdentifier) {
        series['skos:exactMatch'] = [ f.seriesIdentifier ]
      }
      h['rdau:P60193'] = [ series ]
    }
    return h
  },
  get_json_adaptation (type, title, subtitle, titleLanguage, role, name, firstname, lastname) {
    var h = {
      '@type': type
    }
    if (title) {
      let tit = {
        '@type': 'bf:Title',
        'bf:mainTitle': [
          {
            '@value': title
          }
        ]
      }
      if (titleLanguage) {
        tit['bf:mainTitle'][0]['@language'] = titleLanguage
      }
      if (subtitle) {
        tit['bf:subtitle'] = [
          {
            '@value': subtitle
          }
        ]
        if (titleLanguage) {
          tit['bf:subtitle'][0]['@language'] = titleLanguage
        }
      }
      h['dce:title'] = [ tit ]
    }
    if (firstname || lastname || name) {
      let r = {
        '@type': 'schema:Person'
      }
      if (firstname) {
        r['schema:givenName'] = [
          {
            '@value': firstname
          }
        ]
      }
      if (lastname) {
        r['schema:familyName'] = [
          {
            '@value': lastname
          }
        ]
      }
      if (name) {
        r['schema:name'] = [
          {
            '@value': name
          }
        ]
      }
      h[role] = [r]
    }
    return h
  },
  get_json_bf_publication (f) {
    var h = {
      '@type': 'bf:Publication'
    }
    let pa = {
      '@type': 'schema:Organization',
      'schema:name': []
    }
    if (f.publisherType === 'select') {
      pa['schema:name'] = f.publisherSelectedName
      pa['skos:exactMatch'] = [ f.publisherOrgUnit ]
    }
    if (f.publisherType === 'other') {
      pa['schema:name'] = [
        {
          '@value': f.publisherName
        }
      ]
    }
    if (
      (f.publisherType === 'select' && (f.publisherSelectedName || f.publisherOrgUnit)) ||
      (f.publisherType === 'other' && f.publisherName)
    ) {
      h['bf:agent'] = [ pa ]
    }
    if (f.publishingPlace) {
      let pp = {
        '@type': 'schema:Place',
        'skos:prefLabel': [
          {
            '@value': f.publishingPlace
          }
        ]
      }
      h['bf:place'] = [ pp ]
    }
    if (f.publishingDate) {
      h['bf:date'] = [ f.publishingDate ]
    }

    return h
  },
  get_json_study_plan (name, nameLanguage, notations) {
    var h = {
      '@type': 'aaiso:Programme'
    }
    if (name) {
      h['skos:prefLabel'] = [
        {
          '@value': name
        }
      ]
      if (nameLanguage) {
        h['skos:prefLabel'][0]['@language'] = nameLanguage
      }
    }
    if (notations) {
      h['skos:notation'] = notations
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
      if (nameLanguage) {
        h['skos:prefLabel'][0]['@language'] = nameLanguage
      }
    }
    if (identifiers) {
      if (identifiers.length > 0) {
        h['skos:exactMatch'] = identifiers
      }
    }
    return h
  },
  get_json_identifier (type, value) {
    return {
      '@type': type,
      '@value': value
    }
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
      if (s.type === 'accessrights') {
        // handled in PIForm
        continue
      }
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
    var i

    var jsonlds = {}

    for (i = 0; i < formData.sections.length; i++) {
      var s = formData.sections[i]
      var jsonldid
      if (s.type === 'accessrights') {
        // handled in PIForm
        continue
      }
      if (s.type === 'phaidra:Subject') {
        jsonldid = 'subject-' + i
        jsonlds[jsonldid] = {
          '@type': 'phaidra:Subject'
        }
        this.fields2json(jsonlds[jsonldid], s)
      } else {
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
        case 'rdam:P30004':
          if (f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_identifier(f.type, f.value))
          }
          break

        case 'dce:title':
          if (f.title) {
            this.push_object(jsonld, f.predicate, this.get_json_dce_title(f.type, f.title, f.subtitle, f.language))
          }
          break

        case 'bf:note':
        case 'bf:tableOfContents':
        case 'bf:scale':
          if (f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_object([{ '@value': f.value, '@language': f.language }], null, f.type))
          }
          break

        case 'dcterms:language':
          if (f.value) {
            this.push_literal(jsonld, f.predicate, f.value)
          }
          break

        case 'schema:subtitleLanguage':
          if (f.value) {
            this.push_literal(jsonld, f.predicate, f.value)
          }
          break

        case 'dcterms:type':
        case 'edm:hasType':
        case 'schema:genre':
        case 'oaire:version':
        case 'dcterms:accessRights':
        case 'rdau:P60059':
        case 'rdau:P60048':
          if (f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_object(f['skos:prefLabel'], null, 'skos:Concept', [f.value]))
          }
          break

        case 'rdax:P00009':
          if (f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_object(f['skos:prefLabel'], null, f.type, [f.value]))
          }
          break

        case 'bf:supplementaryContent':
        case 'bf:awards':
        case 'dcterms:audience':
          if (f.value) {
            if (f.component === 'p-select' && f.value) {
              this.push_object(jsonld, f.predicate, this.get_json_object(f['skos:prefLabel'], null, 'skos:Concept', [ f.value ]))
            } else {
              this.push_object(jsonld, f.predicate, this.get_json_object([{ '@value': f.value, '@language': f.language }], null, f.type))
            }
          }
          break

        case 'role':
          if (f.role && (f.firstname || f.lastname || f.name || f.organizationSelectedName || f.identifierText)) {
            this.push_object(jsonld, f.role, this.get_json_role(f))
          }
          break

        case 'edm:rights':
          if (f.value) {
            this.push_literal(jsonld, f.predicate, f.value)
          }
          break

        case 'dce:rights':
        case 'dcterms:temporal':
        case 'rdau:P60550':
        case 'bf:physicalLocation':
          if (f.value) {
            this.push_value(jsonld, f.predicate, this.get_json_valueobject(f.value, f.language))
          }
          break

        case 'dce:subject':
          if (f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_object([{ '@value': f.value, '@language': f.language }], null, 'skos:Concept'))
          }
          break

        case 'dcterms:subject':
          if ((f.type === 'skos:Concept') && f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_concept(f['skos:prefLabel'], f['rdfs:label'], 'skos:Concept', [f.value], f['skos:notation'] ? [f['skos:notation']] : null))
          }
          break

        case 'rdau:P60193':
          if (f.title || f.volume || f.issue || f.issued || f.issn || f.identifier) {
            this.push_object(jsonld, f.predicate, this.get_json_series(f.type, f.title, f.titleLanguage, f.volume, f.issue, f.issued, f.issn, f.identifier ? [f.identifier] : null))
          }
          break

        case 'rdau:P60101':
          if (f.title || f.volume || ((f.roles.length > 0) && (f.roles[0].firstname || f.roles[0].lastname || f.roles[0].name || f.roles[0].organizationSelectedName || f.roles[0].identifierText)) || f.seriesTitle || f.seriesVolume || f.seriesIssue || f.seriesIssued || f.seriesIssn) {
            this.push_object(jsonld, f.predicate, this.get_json_contained_in(f))
          }
          break

        case 'rdau:P60227':
          if (f.title || f.name || f.firstname || f.lastname) {
            this.push_object(jsonld, f.predicate, this.get_json_adaptation(f.type, f.title, f.subtitle, f.titleLanguage, f.role, f.name, f.firstname, f.lastname))
          }
          break

        case 'bf:provisionActivity':
          if (f.publisherName || f.publishingPlace || f.publishingDate || f.publisherOrgUnit) {
            this.push_object(jsonld, f.predicate, this.get_json_bf_publication(f))
          }
          break

        case 'citation':
          if (f.citation || f.identifier) {
            this.push_object(jsonld, f.type, this.get_json_object([{ '@value': f.citation, '@language': f.citationLanguage }], null, 'rdfs:Resource', [ f.identifier ]))
          }
          break

        case 'frapo:isOutputOf':
          if (f.type === 'aaiso:Programme') {
            // study plan
            if (f.name || f.notation) {
              this.push_object(jsonld, f.predicate, this.get_json_study_plan(f.name, f.nameLanguage, [f.notation]))
            }
          } else {
            // project
            if (f.type === 'foaf:Project') {
              if (f.name || f.identifier || f.description || f.homepage) {
                this.push_object(jsonld, f.predicate, this.get_json_project(f.name, f.nameLanguage, f.description, f.descriptionLanguage, f.identifier ? [f.identifier] : null, f.homepage, this.get_json_funder(f.funderName, f.funderNameLanguage, f.funderIdentifier ? [f.funderIdentifier] : null)))
              }
            }
          }
          break

        case 'frapo:hasFundingAgency':
          if (f.name || f.identifier) {
            this.push_object(jsonld, f.predicate, this.get_json_funder(f.name, f.nameLanguage, f.identifier ? [f.identifier] : null))
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

        case 'dce:format':
          if (f.component === 'p-select' && f.value) {
            this.push_object(jsonld, f.predicate, this.get_json_object(f['skos:prefLabel'], null, 'dce:format', [ f.value ]))
          } else {
            if (f.value) {
              this.push_object(jsonld, f.predicate, this.get_json_object([{ '@value': f.value, '@language': f.language }], null, 'dce:format'))
            }
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

        case 'schema:duration':
        case 'schema:pageStart':
        case 'schema:pageEnd':
        case 'phaidra:systemTag':
          if (f.value) {
            this.push_literal(jsonld, f.predicate, f.value)
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

        case 'schema:numberOfPages':
        case 'bf:soundCharacteristic':
          if (f.value) {
            this.push_literal(jsonld, f.predicate, f.value)
          }
          break

        case 'ebucore:filename':
          if (f.value) {
            this.push_literal(jsonld, f.predicate, f.value)
          }
          if (f.mimetype) {
            this.push_literal(jsonld, 'ebucore:hasMimeType', f.mimetype)
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
