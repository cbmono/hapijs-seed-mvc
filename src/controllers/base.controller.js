//
// External dependencies
//
const Boom = require('boom')


/******************************************
 *
 * Define a basic skeleton for all custom controllers.
 *
 * Extend your controller with this class if want to have shared
 * methods across all your contollers or if you want to initialise
 * code across your controllers (via the `constructor()`)
 *
 ******************************************/
 export class BaseController {

  /**
   * Constructor
   */
  constructor() {
    this.Boom = Boom

    // Initialise more shared code here ...
  }

  // Extend with shared methods ...
}
