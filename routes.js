const routes = module.exports = require('next-routes')()

routes
  .add('index', '/')
  .add('sone', '/sone/:id')
  .add('stasjon', '/stasjon/:id')
  .add('info')
  .add('kart')
  .add('kontakt')
  .add('varsel')
