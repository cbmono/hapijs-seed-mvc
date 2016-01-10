//
// External dependencies
//
const Boom = require('boom')

//
// Internal dependencies
//
const log = require('../logger')
const ToDo = require('../models/Todo')


/******************************************
 *
 * Controller for ToDo lists
 *
 ******************************************/
module.exports = new class TodoListsController {

  /**
   * Retrieve the list of all ToDo's
   */
  index(request, reply) {
    ToDo.findAll()
      .then(reply)
      .catch((err) => reply(Boom.wrap(err)))
  }

  /**
   * Retrieve a single ToDo
   */
  view(request, reply) {
    let id = request.params.id

    ToDo.findById(id)
      .then((response) => {
        if (response) {
          reply(response)
          return
        }

        reply(Boom.notFound(`ToDo id:${ id } not found`))
      })
      .catch((err) => reply(Boom.wrap(err)))
  }

  /**
   * Create a new ToDo
   */
  create(request, reply) {
    let data = request.payload

    ToDo.save(data)
      .then(reply)
      .catch((err) => reply(Boom.wrap(err)))
  }

  /**
   * Update an existing ToDo
   */
  update(request, reply) {
    let id = request.params.id
      , data = request.payload

    ToDo.update(id, data)
      .then(reply)
      .catch((err) => reply(Boom.wrap(err)))
  }

  /**
   * Delete a ToDo
   */
  remove(request, reply) {
    let id = request.params.id

    ToDo.del(id)
      .then(reply)
      .catch((err) => reply(Boom.wrap(err)))
  }
}
