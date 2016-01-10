//
// Internal dependencies
//
const Main = require('../models/Main')


/******************************************
 *
 * Controller for 'main'
 *
 ******************************************/
module.exports = new class MainController {

  /**
   * Display the status of the application
   */
  healthcheck(request, reply) {
    Main.doHealthcheck()
      .then(reply)
      .catch(reply)
  }
}
