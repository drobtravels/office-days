const addTimesNearWork = require('./src/find_days_near_work')
const addDaysAtWork = require('./src/filter_by_hours')
const generateCSV = require('./src/generate_csv')
const moment = require('moment')
const getAllDaysInRange = require('./src/get_all_days_in_range')

const filePath = './location_history.json'
const startDate = moment('2017-01-01')
const endDate = moment('2017-12-31')
// enter your coordinates here 
const workCoordinates = [
  { latitude: 39.9523789, longitude: -75.1657883 },
]


const flattenToList = (dataByDate) => {
  return Object.keys(dataByDate).reduce((list, day) => {
    return list.concat([Object.assign({ day }, dataByDate[day])])
  }, [])
}

const run = () => {
  return getAllDaysInRange({ startDate, endDate })
  .then(dates => addTimesNearWork({ dates, filePath, workCoordinates, startDate, endDate }))
  .then(dates => addDaysAtWork(dates, 4))
  .then(flattenToList)
  .then(datesAtWork => generateCSV(datesAtWork))
  .catch((err) => {
    console.error(err)
  })
}

run()
