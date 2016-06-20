import { MainController } from '../controllers/main.controller'
import { BaseRoutes } from './base.routes'


//
// Main (global) routes
//
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
      handler: this.controller.healthcheck.bind(this.controller),
      config: {
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
      handler: {
        directory: { path: './public' }
      },
      config: {
        plugins: { lout: false },
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
