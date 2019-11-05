export const vocabulary = {
  computed: {
    vocabularies: function () {
      return this.$store.state.vocabulary.vocabularies
    }
  },
  methods: {
    getLocalizedTermLabel: function (vocabulary, value) {
      if (vocabulary && value) {
        return this.$store.getters.getLocalizedTermLabel(vocabulary, value, this.$i18n.locale)
      }
    },
    getTerm: function (vocabulary, value) {
      if (vocabulary && value) {
        return this.$store.getters.getTerm(vocabulary, value)
      }
    },
    getTermProperty: function (vocabulary, id, property) {
      if (vocabulary && id && property) {
        return this.$store.getters.getTermProperty(vocabulary, id, property)
      }
    },
    autocompleteFilter: function (item, queryText) {
      const lab = item['skos:prefLabel'][this.$i18n.locale] ? item['skos:prefLabel'][this.$i18n.locale].toLowerCase() : item['skos:prefLabel']['eng'].toLowerCase()
      const query = queryText.toLowerCase()
      return lab.indexOf(query) > -1
    },
    getLocalizedValue: function (values) {
      for (let v of values) {
        if (v['@language'] === this.$i18n.locale) {
          return v['@value']
        }
      }
      for (let v of values) {
        if (v['@language'] === 'eng') {
          return v['@value']
        }
      }
      for (let v of values) {
        return v['@value']
      }
    },
    getLocalizedDefinition: function (vocabulary, value) {
      if (vocabulary && value) {
        let item = this.$store.getters.getTerm(vocabulary, value)
        return item['skos:definition'][this.$i18n.locale] ? item['skos:definition'][this.$i18n.locale] : item['skos:definition']['eng']
      }
    },
    getIDResolverURL: function (exactMatch) {
      let type = exactMatch['@type']
      let value = exactMatch['@value']
      switch (type) {
        case 'ids:doi':
          return 'https://doi.org/' + value
        case 'ids:handle':
          return 'https://hdl.handle.net/' + value
        case 'phaidra:acnumber':
          return 'https://ubdata.univie.ac.at/' + value
        case 'ids:urn':
          return 'https://resolver.obvsg.at/resolver?identifier=' + value
        case 'ids:orcid':
          return 'https://orcid.org/' + value
        case 'ids:gnd':
          return 'https://d-nb.info/gnd/' + value
        case 'ids:viaf':
          return 'https://viaf.org/viaf/' + value
        case 'ids:wikidata':
          return 'https://wikidata.org/wiki/' + value
      }
    }
  }
}
