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
   *
   * @param {stirng} notFoundMsg [optional]
   */
  constructor(notFoundMsg = '') {
    this.Boom = Boom
    this.notFoundMsg = notFoundMsg

    // Initialise more shared code here ...
  }

  /**
   * Run reply() if response is not undefined.
   * Otherwise reply 404
   *
   * @param  {mixed} response
   * @param  {function} reply
   *         Hapi default callback
   */
  replyOnResonse(response, reply) {
    if ((Array.isArray(response) && response.length) || response > 0) {
      reply(response)
    }
    else {
      reply(this.Boom.notFound(this.notFoundMsg))
    }
  }

  // Extend with shared methods ...
}
