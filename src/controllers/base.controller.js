'use strict'

//
// External dependencies
//
const Boom = require('boom')

//
// Internal dependencies
//
const logger = require('../logger')


/******************************************
 *
 * Define a basic skeleton for all custom controllers
 *
 * This (abstract) class is meant to extend any custom controller.
 * It gives you access to the custom logging (Good) and
 * Boom (used to handle RESTful HTTP errors)
 *
 * @see: https://github.com/hapijs/good
 * @see: https://github.com/hapijs/boom
 *
 ******************************************/
 class BaseController {

  constructor() {
    this.log = logger
    this.Boom = Boom
  }
}


//
// Export module
//
module.exports = BaseController
