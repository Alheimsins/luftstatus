const withOffline = require('next-offline')
const withCSS = require('@zeit/next-css')

module.exports = {
  useFileSystemPublicRoutes: false,
  publicRuntimeConfig: {
    URL: process.env.URL || 'https://api.luftstatus.no/data',
    URL_STATIONS: process.env.URL_STATIONS || 'https://api.luftstatus.no/stations',
    URL_AREAS: process.env.URL_AREAS || 'https://api.luftstatus.no/areas',
    TOKEN: process.env.TOKEN || '<INSERT-YOUR-MAPBOX-TOKEN>'
  },
  ...withCSS(withOffline())
}
