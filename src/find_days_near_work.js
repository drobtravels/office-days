const geolib = require('geolib')
const getLocationStream = require('./get_location_stream')
const moment = require('moment')

const getDateTime = data => moment(parseInt(data.timestampMs))

const isInDateRage = ({ time, startDate, endDate}) => {
  const isAWorkDay = (time) => {
    const dayOfWeek = time.day()
    return dayOfWeek > 0 && dayOfWeek < 6
  }

  return time.isBetween(startDate, endDate) && isAWorkDay(time)
}

const e7ToDecimal = coordinate => coordinate / 10000000

const isAtWorkLocation = ({ data, workCoordinates }) => {
  const distanceInMeters = 200
  const dataPointCoordinate = {
    latitude: e7ToDecimal(data.latitudeE7),
    longitude: e7ToDecimal(data.longitudeE7)
  }
  return workCoordinates.find((workCoordinate) => {
    return geolib.isPointInCircle(workCoordinate, dataPointCoordinate, distanceInMeters)
  })
}

module.exports = ({ dates, filePath, workCoordinates, startDate, endDate }) => {

  return new Promise((resolve, reject) => {
    const recordEntryAtDate = (time) => {
      const day = time.format('YYYY-MM-DD')
  
      const dataForDay = dates[day]
      if (!dataForDay.endTime) {
        dataForDay.endTime = time
        console.log('added ', day)
      }
      dataForDay.startTime = time
      dataForDay.counter = dataForDay.counter + 1
      
    }
  
    const processEntry = (data) => {
      const time = getDateTime(data)
      if (isInDateRage({ time, startDate, endDate}) && isAtWorkLocation({ data, workCoordinates })) {
        recordEntryAtDate(time)
      }
      return true
    }
  
    getLocationStream(filePath)
    .on('data', ({ value }) => processEntry(value))
    .on('end', () => resolve(dates))
    .on('error', reject)
  })
  
}