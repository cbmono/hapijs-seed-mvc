import { ToDo } from '../models/ToDo';
import { BaseController } from './base.controller';

//
// Controller for ToDo lists
//
export class ToDosController extends BaseController {

  /**
   * Constructor
   */
  constructor() {
    const notFoundMsg = 'ToDo List not found';

    /* istanbul ignore next */
    super(notFoundMsg);
    this.ToDo = new ToDo();
  }

  /**
   * Retrieve the list of all ToDo's
   */
  index(request, reply) {
    this.handleRequest(this.ToDo.findAll(), reply);
  }

  /**
   * Retrieve a single ToDo
   */
  view({ params: { id } }, reply) {
    this.handleRequest(this.ToDo.findById(id), reply);
  }

  /**
   * Create a new ToDo
   */
  create(request, reply) {
    const data = request.payload;

    this.handleRequest(this.ToDo.save(data), reply);
  }

  /**
   * Update an existing ToDo
   */
  update(request, reply) {
    const { id } = request.params;
    const data = request.payload;

    this.handleRequest(this.ToDo.update(id, data), reply);
  }

  /**
   * Delete a ToDo
   */
  remove({ params: { id } }, reply) {
    this.handleRequest(this.ToDo.del(id), reply);
  }
}
