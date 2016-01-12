//
// Internal dependencies
//
import { ToDoList } from '../models/ToDoList'
import { BaseController } from './base.controller'


/******************************************
 *
 * Controller for ToDo lists
 *
 ******************************************/
export class ToDoListsController extends BaseController {

  /**
   * Constructor
   */
  constructor() {
    super()
    this.ToDoList = new ToDoList()
  }

  /**
   * Retrieve the list of all ToDo lists
   */
  index(request, reply) {
    this.ToDoList.findAll()
      .then(reply)
      .catch((err) => reply(this.Boom.wrap(err)))
  }

  /**
   * Retrieve a single ToDo list
   */
  view(request, reply) {
    let id = request.params.id

    this.ToDoList.findById(id)
      .then((response) => {
        if ((Array.isArray(response) && response.length) || response > 0) {
          reply(response)
          return
        }

        reply(this.Boom.notFound(`ToDo List id:${ id } not found`))
      })
      .catch((err) => reply(this.Boom.wrap(err)))
  }

  /**
   * Retrieve a single ToDo list and all its ToDo's
   */
  viewAll(request, reply) {
    let id = request.params.id

    this.ToDoList.findByIdWithTodos(id)
      .then((response) => {
        if ((Array.isArray(response) && response.length) || response > 0) {
          reply(response)
          return
        }

        reply(this.Boom.notFound(`ToDo List id:${ id } not found`))
      })
      .catch((err) => reply(this.Boom.wrap(err)))
  }

  /**
   * Create a new ToDo list
   */
  create(request, reply) {
    let data = request.payload

    this.ToDoList.save(data)
      .then(reply)
      .catch((err) => reply(this.Boom.wrap(err)))
  }

  /**
   * Update an existing ToDo list
   */
  update(request, reply) {
    let id = request.params.id
      , data = request.payload

    this.ToDoList.update(id, data)
      .then((response) => {
        if ((Array.isArray(response) && response.length) || response > 0) {
          reply(response)
          return
        }

        reply(this.Boom.notFound(`ToDo List id:${ id } not found`))
      })
      .catch((err) => reply(this.Boom.wrap(err)))
  }

  /**
   * Delente a ToDo list
   */
  remove(request, reply) {
    let id = request.params.id

    this.ToDoList.del(id)
      .then((response) => {
        if ((Array.isArray(response) && response.length) || response > 0) {
          reply(response)
          return
        }

        reply(this.Boom.notFound(`ToDo List id:${ id } not found`))
      })
      .catch((err) => reply(this.Boom.wrap(err)))
  }
}
