'use strict'

//
// Internal dependencies
//
// Main = require('../models/Main')
const BaseController = require('./base.controller')


/******************************************
 *
 * Controller for 'main'
 *
 ******************************************/
class MainController extends BaseController {

  constructor() {
    super()
    // @Main = new Main
  }

  /**
   * Display the status of the application
   */
  healthcheck(request, reply) {
    reply('healthcheck!')

    // @Main.doHealthcheck()
    //   .then((response) -> reply(response))
    //   .catch((errorMessage) -> reply(errorMessage))
  }
}



//
// Export module
//
let main = new MainController

module.exports = {
  healthcheck: main.healthcheck
}
