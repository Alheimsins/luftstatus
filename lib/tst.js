const data = require('./data.json')
const repackAirQualityData = require('./repack-air-quality-data')

const a = repackAirQualityData(data)
console.log(JSON.stringify(a, null, 2))
