//
// Internal dependencies
//
import { MainController } from '../controllers/main.controller'
import { BaseRoutes } from './base.routes'


/******************************************
 *
 * Main (global) routes
 *
 ******************************************/
let routes = new class MainRoutes extends BaseRoutes {

  /**
   * Constructor
   */
  constructor() {
    super(new MainController())
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
        handler: this.controller.healthcheck.bind(this.controller),
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
// Export public end-points
//
export default [
  routes.healthcheck(),
  routes.staticFiles()
]
