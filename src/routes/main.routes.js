//
// Internal dependencies
//
const BaseRoutes = require('./base.routes')
const controller = require('../controllers/main.controller')


/******************************************
 *
 * Main (global) routes
 *
 ******************************************/
class MainRoutes extends BaseRoutes {

  constructor() {
    super(controller)
  }

  /**
   * Display the status of the App and DB connection
   *
   * @return {object}
   */
  healthcheck() {
    return {
      method: 'GET',
      path: '/healthcheck',
      config: {
        handler: this.controller.healthcheck,
        description: 'Display the status of the App and DB connection',
        tags: [ 'public' ]
      }
    }
  }

  /**
   * Serve static files from ./public
   *
   * @return {object}
   */
  staticFiles() {
    return {
      method: 'GET',
      path: '/{param*}',
      config: {
        handler: {
          directory: { path: './public' }
        },
        plugins: {
          lout: false
        },
        description: 'Serve static files from ./public'
      }
    }
  }
}


//
// Export module
//
let routes = new MainRoutes

module.exports = [
  routes.healthcheck(),
  routes.staticFiles()
]
