const moment = require('moment')

module.exports = ({ startDate, endDate }) => {
  const currentDate = moment(startDate)
  const allDays = {}

  while (currentDate.isSameOrBefore(endDate)) {
    const dayOfWeek = currentDate.day()

    if ( dayOfWeek > 0 && dayOfWeek < 6) {
      allDays[currentDate.format('YYYY-MM-DD')] = {
        atWork: 'N',
        counter: 0
      }
    }
    currentDate.add(1, 'day')
  }

  return Promise.resolve(allDays)
}