<script>
// this class is a hack until Vuetify supports flat pagination
import VPagination from 'vuetify/es5/components/VPagination'

export default {
  name: 'p-pagination',
  extends: VPagination,
  methods: {
    genIcon: function genIcon (h, icon, disabled, fn) {
      return h('button', this.setBackgroundColor('', {
        staticClass: 'v-pagination__item v-btn--flat v-btn--text elevation-0',
        class: {
          'v-pagination__navigation--disabled': disabled
        },
        attrs: {
          type: 'button'
        },
        on: disabled ? {} : {
          click: fn
        }
      }), [icon.toString() === '$vuetify.icons.next' ? '>' : '<'])
    },
    genItem: function genItem (h, i) {
      var _this2 = this

      var color = i === this.value && (this.color || 'primary')
      return h('button', this.setBackgroundColor(color, {
        staticClass: 'v-pagination__item v-btn--flat v-btn--text elevation-0',
        class: {
          'v-pagination__item--active': i === this.value
        },
        attrs: {
          type: 'button'
        },
        on: {
          click: function click () {
            return _this2.$emit('input', i)
          }
        }
      }), [i.toString()])
    }
  }
}
</script>
