export const fieldproperties = {
  props: {
    multiplicable: {
      type: Boolean
    },
    ordered: {
      type: Boolean
    }
  },
  computed: {
    actions: function () {
      var arr = []
      if (this.multiplicable || this.removable) {
        arr.push( { title: $t('Remove'), event: 'remove' } )
      }
      if (this.multiplicable) {
        arr.push( { title: $t('Duplicate'), event: 'add' } )
      }
      if (this.ordered) {
        arr.push( { title: $t('Move up'), event: 'up' } )
        arr.push( { title: $t('Move down'), event: 'down' } )
      }
      return arr
    }
  }
}