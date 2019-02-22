const moment = require('moment')

module.exports = (dates, minHours) => {
  Object.keys(dates).forEach((day) => {
    const dataForDay = dates[day]
    let diffInHours = 0
    if (dataForDay.startTime && dataForDay.endTime) {
      diffInHours = moment.duration(dataForDay.endTime.diff(dataForDay.startTime)).as('hours')
    }
    dataForDay.timeAtWork = diffInHours
    if (diffInHours >= minHours) {
      dataForDay.atWork = 'Y'
    }
  })
  return dates
}
