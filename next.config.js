const withOffline = require('next-offline')

module.exports = {
  useFileSystemPublicRoutes: false,
  publicRuntimeConfig: {
    URL: process.env.URL || 'https://s3.eu-central-1.amazonaws.com/luftstatus/data.json',
    TOKEN: process.env.TOKEN || '<INSERT-YOUR-MAPBOX-TOKEN>'
  },
  ...withOffline()
}
