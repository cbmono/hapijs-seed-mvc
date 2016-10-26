import Boom from 'boom';

/** ****************************************
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
    if (new.target === BaseController) {
      throw Error('BaseController is an abstract class and cannot be instantiated directly');
    }

    this.notFoundMsg = notFoundMsg;
    this.Boom = Boom;

    // Initialise more shared code here ...
  }

  /**
   * Run reply() if response is not undefined.
   * Otherwise reply 404
   *
   * @param  {Function call} Knex call
   * @param  {Function} hapi's reply
   *         Hapi default callback
   */
  async handleRequest(func, reply) {
    try {
      const response = await func;

      if ((Array.isArray(response) && response.length) || response > 0) {
        reply(response);
      }
      else {
        throw Error('Not Found');
      }
    }
    catch (err) {
      reply(this.Boom.notFound(this.notFoundMsg));
    }
  }

  // Extend with shared methods ...
}
