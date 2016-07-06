import { ToDoListsController } from '../controllers/todo_lists.controller';
import { BaseRoutes } from './base.routes';

//
// ToDo Lists routes
//
const routes = new class TodoListsRoutes extends BaseRoutes {

  /**
   * Constructor
   */
  constructor() {
    const endpointName = '/todo-lists';
    super(new ToDoListsController(), endpointName);
  }

  /**
   * Retrieve a ToDo list and all its ToDo's
   *
   * @return {object}
   */
  viewAll() {
    // Re-use default view()
    const route = super.view();

    // Overwrite attributes
    route.path += '/todos';
    route.config.description = 'Retrieve a ToDo list and all its ToDo\'s';
    route.handler = this.controller.viewAll.bind(this.controller);

    return route;
  }

  /**
   * Create a new ToDo list
   *
   * @return {object}
   */
  create() {
    // Get route settings from parent
    const route = super.create();

    // Update end-point description (used in Documentation)
    route.config.description = 'Create a new ToDo list';

    // Add validations for POST payload
    route.config.validate.payload = {
      name : this.joi.string().required().description('ToDo list name'),
    };

    return route;
  }

  /**
   * Update an existing ToDo list
   *
   * @return {object}
   */
  update() {
    // Get route settings from parent
    const route = super.update();

    // Update end-point description (used in Documentation)
    route.config.description = 'Update an existing ToDo list';

    // Add validations for POST payload
    route.config.validate.payload = {
      name : this.joi.string().description('ToDo list name'),
    };

    return route;
  }
};

//
// Export public end-points
//
export default [
  routes.index(),
  routes.view(),
  routes.viewAll(),
  routes.create(),
  routes.update(),
  routes.remove(),
];
