export const vocabulary = {
  computed: {
    vocabularies: function () {
      return this.$store.state.vocabulary.vocabularies
    }
  },
  methods: {
    getLocalizedTermLabel: function (vocabulary, value) {
      return this.$store.getters.getLocalizedTermLabel(vocabulary, value, this.$i18n.locale)
    },
    getTerm: function (vocabulary, value) {
      return this.$store.getters.getTerm(vocabulary, value)
    }
  }
}