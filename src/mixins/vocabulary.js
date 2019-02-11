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
    }
  }
}