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
      if (this.multiplicable) {
        arr.push( { title: 'Duplicate', event: 'add' } )
        arr.push( { title: 'Remove', event: 'remove' } )
      }
      if (this.ordered) {
        arr.push( { title: 'Move up', event: 'up' } )
        arr.push( { title: 'Move down', event: 'down' } )
      }
      return arr
    }
  }
}