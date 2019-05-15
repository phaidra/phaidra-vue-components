export const fieldproperties = {
  props: {
    multiplicable: {
      type: Boolean
    },
    ordered: {
      type: Boolean
    },
    removable: {
      type: Boolean
    }
  },
  computed: {
    actions: function () {
      var arr = []
      if (this.removable) {
        arr.push( { title: this.$t('Remove'), event: 'remove' } )
      }
      if (this.multiplicable) {
        arr.push( { title: this.$t('Duplicate'), event: 'add' } )
      }
      if (this.ordered) {
        arr.push( { title: this.$t('Move up'), event: 'up' } )
        arr.push( { title: this.$t('Move down'), event: 'down' } )
      }
      return arr
    }
  }
}