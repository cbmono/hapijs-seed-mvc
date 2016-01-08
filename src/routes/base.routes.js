//
// External dependencies
//
const joi = require('joi')


/******************************************
 *
 * Define basic CRUD skeleton for all custom routes
 *
 * This (abstract) class is meant to extend any custom routes.
 * It gives you access to Joi, used for payload validations.
 * Follows RESTful and CRUD conventions:
 *
 *    * index
 *    * view
 *    * create
 *    * update
 *    * remove (delete is a reserved word)
 *
 *  @see: https://github.com/hapijs/joi
 *
 ******************************************/
class BaseRoutes {

  /**
   * Constructor
   *
   * @param {function} controller
   *        Callback method to handle the route
   * @param {string} endpoint [optional]
   *        End-point for the specific route, ie: /users/{user_id}/addresses/
   */
  constructor(controller, endpoint = '') {
    this.joi = joi
    this.endpoint = endpoint
    this.controller = controller

    if (!controller) {
      throw new Error('Route: controller undefined')
    }
  }

  /**
   * List all entries
   *
   * @return {object}
   */
  index() {
    return {
      method: 'GET',
      path: this.endpoint,
      config: {
        handler: this.controller.index,
        description: 'List all entries',
        tags: [ 'public' ]
      }
    }
  }

  /**
   * Get one entry by ID
   *
   * @return {object}
   */
  view() {
    return {
      method: 'GET',
      path: this.endpoint + '/{id}',
      config: {
        handler: this.controller.view,
        description: 'Get one entry by ID',
        tags: [ 'public' ],
        validate: {
          params: {
            id: this.joi.number().integer().required().description('ID, primary key')
          }
        }
      }
    }
  }

  /**
   * Create a new entry
   *
   * @return {object}
   */
  create() {
    return {
      method: 'POST',
      path: this.endpoint,
      config: {
        handler: this.controller.create,
        description: 'Add a new entry',
        tags: [ 'public' ],
        validate: {
          payload: {
            // Extend
          }
        }
      }
    }
  }

  /**
   * Update an existing entry by passing the ID
   *
   * @return {object}
   */
  update() {
    return {
      method: 'PUT',
      path: this.endpoint + '/{id}',
      config: {
        handler: this.controller.update,
        description: 'Update an existing entry by passing the ID',
        tags: [ 'public' ],
        validate: {
          params: {
            id: this.joi.number().integer().required().description('ID, primary key')
          },
          payload: {
            // Extend
          }
        }
      }
    }
  }

  /**
   * Delete a entry by passing the ID
   *
   * @return {object}
   */
  remove() {
    return {
      method: 'DELETE',
      path: this.endpoint + '/{id}',
      config: {
        handler: this.controller.remove,
        description: 'Delete a entry by passing the ID',
        tags: [ 'public' ],
        validate: {
          params: {
            id: this.joi.number().integer().required().description('ID, primary key')
          }
        }
      }
    }
  }
}


//
// Export module
//
module.exports = BaseRoutes
