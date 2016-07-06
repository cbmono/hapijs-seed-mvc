import { ToDoList } from '../models/ToDoList';
import { BaseController } from './base.controller';

//
// Controller for ToDo lists
//
export class ToDoListsController extends BaseController {

  /**
   * Constructor
   */
  constructor() {
    const notFoundMsg = 'ToDo List not found';

    super(notFoundMsg);
    this.ToDoList = new ToDoList();
  }

  /**
   * Retrieve the list of all ToDo lists
   */
  index(request, reply) {
    this.handleRequest(this.ToDoList.findAll(), reply);
  }

  /**
   * Retrieve a single ToDo list
   */
  view({ params : { id } }, reply) {
    this.handleRequest(this.ToDoList.findById(id), reply);
  }

  /**
   * Retrieve a single ToDo list and all its ToDo's
   */
  viewAll({ params : { id } }, reply) {
    this.handleRequest(this.ToDoList.findByIdWithToDos(id), reply);
  }

  /**
   * Create a new ToDo list
   */
  create({ payload : data }, reply) {
    this.handleRequest(this.ToDoList.save(data), reply);
  }

  /**
   * Update an existing ToDo list
   */
  update(request, reply) {
    const id = request.params.id;
    const data = request.payload;

    this.handleRequest(this.ToDoList.update(id, data), reply);
  }

  /**
   * Delete a ToDo list
   */
  remove({ params : { id } }, reply) {
    this.handleRequest(this.ToDoList.del(id), reply);
  }
}
