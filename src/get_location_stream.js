const fs = require('fs')

const { chain } = require('stream-chain')
const { parser } = require('stream-json')
const { streamArray } = require('stream-json/streamers/StreamArray')
const Pick = require('stream-json/filters/Pick')

module.exports = (filePath) => {
  const pipeline = chain([
    fs.createReadStream(filePath),
    Pick.withParser({ filter: 'locations' }),
    streamArray()
  ])

  console.log('starting pipeline')
  return pipeline
}
