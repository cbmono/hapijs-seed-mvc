import * as joi from 'joi';

const validateControllerHandler = Symbol('validateControllerHandler');

/** ****************************************
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
      throw new Error('BaseRoute: controller is undefined');
    }
    if (new.target === BaseRoutes) {
      throw Error('BaseRoutes is an abstract class and cannot be instantiated directly');
    }

    this.joi = joi;
    this.endpoint = endpoint;
    this.controller = controller;
  }

  /**
   * List all entries
   *
   * @return {object}
   */
  index() {
    this[validateControllerHandler]('index');

    return {
      method: 'GET',
      path: this.endpoint,
      handler: this.controller.index.bind(this.controller),
      config: {
        description: 'List all entries',
        tags: ['public']
      }
    };
  }

  /**
   * Get an entry by ID
   *
   * @return {object}
   */
  view() {
    this[validateControllerHandler]('view');

    return {
      method: 'GET',
      path: `${this.endpoint}/{id}`,
      handler: this.controller.view.bind(this.controller),
      config: {
        description: 'Get an entry by ID',
        tags: ['public'],
        validate: {
          params: {
            id: this.joi.number().integer().required().description('ID, primary key')
          }
        }
      }
    };
  }

  /**
   * Create a new entry
   *
   * @return {object}
   */
  create() {
    this[validateControllerHandler]('create');

    return {
      method: 'POST',
      path: this.endpoint,
      handler: this.controller.create.bind(this.controller),
      config: {
        description: 'Add a new entry',
        tags: ['public'],
        validate: {
          // Extend (or overwrite) in your own implementation
        }
      }
    };
  }

  /**
   * Update an existing entry
   *
   * @return {object}
   */
  update() {
    this[validateControllerHandler]('update');

    return {
      method: 'PUT',
      path: `${this.endpoint}/{id}`,
      handler: this.controller.update.bind(this.controller),
      config: {
        description: 'Update an existing entry',
        tags: ['public'],
        validate: {
          // Extend (or overwrite) in your own implementation

          params: {
            id: this.joi.number().integer().required().description('ID, primary key')
          }
        }
      }
    };
  }

  /**
   * Delete an entry
   *
   * @return {object}
   */
  remove() {
    this[validateControllerHandler]('remove');

    return {
      method: 'DELETE',
      path: `${this.endpoint}/{id}`,
      handler: this.controller.remove.bind(this.controller),
      config: {
        description: 'Delete an entry',
        tags: ['public'],
        validate: {
          params: {
            id: this.joi.number().integer().required().description('ID, primary key')
          }
        }
      }
    };
  }

  /**
   * Check whether a controller handler is defined
   *
   * @param  {string} handler
   * @throw {Error}
   *        In case controller handler is not a Function
   */
  [validateControllerHandler](handler) {
    if (typeof this.controller[handler] !== 'function') {
      throw new Error('BaseRoute: controller handler is undefined');
    }
  }
}
