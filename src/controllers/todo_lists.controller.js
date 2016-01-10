//
// External dependencies
//
const Boom = require('boom')

//
// Internal dependencies
//
const log = require('../logger')
const ToDoList = require('../models/TodoList')


/******************************************
 *
 * Controller for ToDo lists
 *
 ******************************************/
module.exports = new class TodoListsController {

  /**
   * Retrieve the list of all ToDo lists
   */
  index(request, reply) {
    ToDoList.findAll()
      .then(reply)
      .catch((err) => reply(Boom.wrap(err)))
  }

  /**
   * Retrieve a single ToDo list
   */
  view(request, reply) {
    let id = request.params.id

    ToDoList.findById(id)
      .then((response) => {
        if (response) {
          reply(response)
          return
        }

        reply(Boom.notFound(`ToDo List id:${ id } not found`))
      })
      .catch((err) => reply(Boom.wrap(err)))
  }

  /**
   * Retrieve a single ToDo list and all its ToDo's
   */
  viewAll(request, reply) {
    let id = request.params.id

    ToDoList.findAndTodos(id)
      .then((response) => {
        log.debug(response)
        reply(response)
        // if (response) {
        //   reply(response)
        //   return
        // }
        //
        // reply(Boom.notFound(`ToDo List id:${ id } not found`))
      })
      .catch((err) => reply(Boom.wrap(err)))
  }

  /**
   * Create a new ToDo list
   */
  create(request, reply) {
    let data = request.payload

    ToDoList.save(data)
      .then(reply)
      .catch((err) => reply(Boom.wrap(err)))
  }

  /**
   * Update an existing ToDo list
   */
  update(request, reply) {
    let id = request.params.id
      , data = request.payload

    ToDoList.update(id, data)
      .then(reply)
      .catch((err) => reply(Boom.wrap(err)))
  }

  /**
   * Delente a ToDo list
   */
  remove(request, reply) {
    let id = request.params.id

    ToDoList.del(id)
      .then(reply)
      .catch((err) => reply(Boom.wrap(err)))
  }
}
