const withOffline = require('next-offline')

module.exports = {
  useFileSystemPublicRoutes: false,
  publicRuntimeConfig: {
    URL: process.env.URL || 'https://s3.eu-central-1.amazonaws.com/luftstatus/data.json',
    URL_AREAS: process.env.URL_AREAS || 'https://s3.eu-central-1.amazonaws.com/luftstatus/areas.json',
    TOKEN: process.env.TOKEN || '<INSERT-YOUR-MAPBOX-TOKEN>'
  },
  ...withOffline()
}
