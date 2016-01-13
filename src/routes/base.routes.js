import * as joi  from 'joi'


/******************************************
 *
 * Define a basic CRUD skeleton for all custom routes
 *
 * This (abstract) class is meant to extend any custom route.
 * It gives you access to Joi, used for payload validations, and
 * follows the RESTful and CRUD conventions.
 *
 * Available CRUD end-points:
 *
 *    * index
 *    * view
 *    * create
 *    * update
 *    * remove (`delete` is a reserved word)
 *
 *  @see: https://github.com/hapijs/joi
 *
 ******************************************/
export class BaseRoutes {

  /**
   * Constructor
   *
   * @param {function} controller
   *        Callback method to handle the route
   * @param {string} endpoint [optional]
   *        End-point for the specific route, ie: /users/{user_id}/addresses/
   */
  constructor(controller, endpoint = '') {
    if (!controller) {
      throw new Error('BaseRoute: controller is undefined')
    }

    this.joi = joi
    this.endpoint = endpoint
    this.controller = controller
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
        handler: this.controller.index.bind(this.controller),
        description: 'List all entries',
        tags: [ 'public' ]
      }
    }
  }

  /**
   * Get an entry by ID
   *
   * @return {object}
   */
  view() {
    return {
      method: 'GET',
      path: this.endpoint + '/{id}',
      config: {
        handler: this.controller.view.bind(this.controller),
        description: 'Get an entry by ID',
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
        handler: this.controller.create.bind(this.controller),
        description: 'Add a new entry',
        tags: [ 'public' ],
        validate: {
          // Extend (or overwrite) in your own implementation
        }
      }
    }
  }

  /**
   * Update an existing entry
   *
   * @return {object}
   */
  update() {
    return {
      method: 'PUT',
      path: this.endpoint + '/{id}',
      config: {
        handler: this.controller.update.bind(this.controller),
        description: 'Update an existing entry',
        tags: [ 'public' ],
        validate: {
          // Extend (or overwrite) in your own implementation

          params: {
            id: this.joi.number().integer().required().description('ID, primary key')
          }
        }
      }
    }
  }

  /**
   * Delete an entry
   *
   * @return {object}
   */
  remove() {
    return {
      method: 'DELETE',
      path: this.endpoint + '/{id}',
      config: {
        handler: this.controller.remove.bind(this.controller),
        description: 'Delete an entry',
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
