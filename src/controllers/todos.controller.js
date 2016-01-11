//
// Internal dependencies
//
import { ToDo } from '../models/ToDo'
import { BaseController } from './base.controller'


/******************************************
 *
 * Controller for ToDo lists
 *
 ******************************************/
export class ToDosController extends BaseController {

  /**
   * Constructor
   */
  constructor() {
    super()
    this.ToDo = new ToDo()
  }

  /**
   * Retrieve the list of all ToDo's
   */
  index(request, reply) {
    this.ToDo.findAll()
      .then(reply)
      .catch((err) => reply(this.Boom.wrap(err)))
  }

  /**
   * Retrieve a single ToDo
   */
  view(request, reply) {
    let id = request.params.id

    this.ToDo.findById(id)
      .then((response) => {
        if (response) {
          reply(response)
          return
        }

        reply(this.Boom.notFound(`ToDo id:${ id } not found`))
      })
      .catch((err) => reply(this.Boom.wrap(err)))
  }

  /**
   * Create a new ToDo
   */
  create(request, reply) {
    let data = request.payload

    this.ToDo.save(data)
      .then(reply)
      .catch((err) => reply(this.Boom.wrap(err)))
  }

  /**
   * Update an existing ToDo
   */
  update(request, reply) {
    let id = request.params.id
      , data = request.payload

    this.ToDo.update(id, data)
      .then(reply)
      .catch((err) => reply(this.Boom.wrap(err)))
  }

  /**
   * Delete a ToDo
   */
  remove(request, reply) {
    let id = request.params.id

    this.ToDo.del(id)
      .then(reply)
      .catch((err) => reply(this.Boom.wrap(err)))
  }
}
