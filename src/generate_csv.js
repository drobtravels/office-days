const createCsvWriter = require('csv-writer').createObjectCsvWriter

module.exports = (datesAtWork) => {
  console.log('starting to write csv')

  const csvWriter = createCsvWriter({
    path: 'days_at_work.csv',
    header: [
      { id: 'day', title: 'Day' },
      { id: 'atWork', title: 'At Work?' },
      { id: 'timeAtWork', title: 'Time at Work' },
      { id: 'startTime', title: 'Start Time' },
      { id: 'endTime', title: 'End Time' },
      { id: 'counter', title: 'Number of Observations' }
    ]
  })

  return csvWriter.writeRecords(datesAtWork)
  .then(() => console.log('done writing csv'))
}