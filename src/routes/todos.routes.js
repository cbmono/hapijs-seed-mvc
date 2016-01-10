//
// Internal dependencies
//
const BaseRoutes = require('./base.routes')
const controller = require('../controllers/todos.controller')


/******************************************
 *
 * Lists routes
 *
 ******************************************/
let routes = new class TodosRoutes extends BaseRoutes {

  /**
   * Constructor
   */
  constructor() {
    let endpointName = '/todos'
    super(controller, endpointName)
  }

  /**
   * Create a new ToDo
   *
   * @return {object}
   */
  create() {
    // Get route settings from parent
    let route = super.create()

    // Update end-point description (used in Documentation)
    route.config.description = 'Create a new ToDo'

    // Add validations for POST payload
    route.config.validate.payload = {
      todo_list_id: this.joi.number().integer().required()
        .description('Reference to ToDo list'),

      name: this.joi.string().required()
        .description('ToDo name')
    }

    return route
  }

  /**
   * Update an existing ToDo
   *
   * @return {object}
   */
  update() {
    // Get route settings from parent
    let route = super.update()

    // Update end-point description (used in Documentation)
    route.config.description = 'Update an existing ToDo'

    // Add validations for POST payload
    route.config.validate.payload = {
      name: this.joi.string().required()
        .description('ToDo name')
    }

    return route
  }
}


//
// Export public end-points
//
module.exports = [
  routes.index(),
  routes.view(),
  routes.create(),
  routes.update(),
  routes.remove()
]
