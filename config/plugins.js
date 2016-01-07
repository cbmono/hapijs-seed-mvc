'use strict'

module.exports = {
  //
  // Options for good plugin (logging process)
  //
  good: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        ops: '*',
        request: '*',
        response: '*',
        log: '*',
        error: '*'
      }
    },
    {
      reporter: require('good-file'),
      events: {
        ops: '*',
        request: '*',
        log: '*',
        error: '*'
      },
      config: {
        path: 'logs/',
        prefix: 'my-hapi-api'     // @changeme
      }
    }]
  },

  //
  // Display server routes on startup
  //
  blipp: {},

  //
  // Options for lout plugin (Doc generation)
  //
  lout: { endpoint: '/docs' },
  inert: {},
  vision: {}
}
