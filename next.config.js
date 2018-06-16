const withOffline = require('next-offline')
const withCSS = require('@zeit/next-css')

module.exports = {
  useFileSystemPublicRoutes: false,
  publicRuntimeConfig: {
    URL: process.env.URL || 'https://s3.eu-central-1.amazonaws.com/luftstatus/data.json',
    URL_STATIONS: process.env.URL_STATIONS || 'https://s3.eu-central-1.amazonaws.com/luftstatus/stations.json',
    URL_AREAS: process.env.URL_AREAS || 'https://s3.eu-central-1.amazonaws.com/luftstatus/areas.json',
    TOKEN: process.env.TOKEN || '<INSERT-YOUR-MAPBOX-TOKEN>'
  },
  ...withCSS(withOffline())
}
