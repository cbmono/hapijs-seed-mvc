'use strict'

//
// Internal dependencies
//
const BaseController = require('./base.controller')
const Main = require('../models/Main')


/******************************************
 *
 * Controller for 'main'
 *
 ******************************************/
class MainController extends BaseController {

  /**
   * Display the status of the application
   */
  healthcheck(request, reply) {
    Main.doHealthcheck()
      .then(reply)
      .catch(reply)
  }
}



//
// Export module
//
module.exports = new MainController
