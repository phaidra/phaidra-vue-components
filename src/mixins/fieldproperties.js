export const fieldproperties = {
  props: {
    multiplicable: {
      type: Boolean
    },
    multiplicableCleared: {
      type: Boolean,
      default: false
    },
    ordered: {
      type: Boolean
    },
    removable: {
      type: Boolean
    },
    addOnly: {
      type: Boolean
    },
    removeOnly: {
      type: Boolean
    },
    inputStyle: {
      type: String,
      default: 'filled'
    },
    backgroundColor: {
      type: String,
      default: undefined
    },
    hidden: {
      type: Boolean,
      default: false
    },
    configurable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showMenuModel: false,
      menux: 0,
      menuy: 0
    }
  },
  computed: {
    actions: function () {
      var arr = []
      if (this.configurable) {
        arr.push({title: this.$t('Configure'), event: 'configure'})
      }
      if (this.addOnly && this.multiplicable) {
        arr.push({ title: this.$t('Duplicate'), event: 'add' })
      } else {
        if (this.removeOnly && this.removable) {
          arr.push({ title: this.$t('Remove'), event: 'remove' })
        } else {
          if (this.removable) {
            arr.push({ title: this.$t('Remove'), event: 'remove' })
          }
          if (this.multiplicable) {
            arr.push({ title: this.$t('Duplicate'), event: 'add' })
          }
          if (this.multiplicableCleared) {
            arr.push({ title: this.$t('Add'), event: 'add-clear' })
          }
          if (this.ordered) {
            arr.push({ title: this.$t('Move up'), event: 'up' })
            arr.push({ title: this.$t('Move down'), event: 'down' })
          }
        }
      }
      return arr
    }
  },
  methods: {
    showMenu (e) {
      e.preventDefault()
      this.showMenuModel = false
      this.menux = e.clientX
      this.menuy = e.clientY
      this.$nextTick(() => {
        this.showMenuModel = true
      })
    }
  }
}
