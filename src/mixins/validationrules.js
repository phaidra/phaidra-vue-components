import moment from 'moment'

export const validationrules = {
  methods: {
    isValidDuration: function (durationString) {
      return moment.duration(durationString).isValid()
    },
    isValidDate: function (dateString) {
      // First check for the pattern
      var regexDate = /^(\d{4})(-\d{1,2})?(-\d{1,2})?$/

      if (!regexDate.test(dateString)) {
        return false
      }

      var m = dateString.match(regexDate)

      var year = parseInt(m[1], 10)

      if (m[2]) {
        var month = parseInt(m[2].substring(1), 10)
        // Check the ranges of month
        if (month) {
          if (month === 0 || month > 12) {
            return false
          }
        }
      }

      if (m[3]) {
        var day = parseInt(m[3].substring(1), 10)

        if (day) {
          var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]

          // Adjust for leap years
          if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
            monthLength[1] = 29
          }

          // Check the range of the day
          return day > 0 && day <= monthLength[month - 1]
        }
      }

      return true
    }
  },
  data () {
    return {
      validationrules: {
        required: value => !!value || 'Required.',
        date: value => {
          return typeof value === 'undefined' || value === '' || this.isValidDate(value) || 'Invalid date.'
        },
        duration: value => {
          return typeof value === 'undefined' || value === '' || this.isValidDuration(value) || 'Invalid duration.'
        }
      }
    }
  }
}
