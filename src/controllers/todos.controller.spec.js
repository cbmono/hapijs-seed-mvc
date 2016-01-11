//
// External dependencies
//
const Q = require('q')

//
// Internal dependencies
//
import { ToDosController } from './todos.controller'

//
// Tests
//
describe(`Controller: ToDo's`, () => {
  let controller

  beforeEach(() => {
    controller = new ToDosController()

    spyOn(controller.ToDo, 'findAll').and.returnValue(Q.when({}))
    spyOn(controller.ToDo, 'findById').and.returnValue(Q.when({}))
    spyOn(controller.ToDo, 'save').and.returnValue(Q.when({}))
    spyOn(controller.ToDo, 'update').and.returnValue(Q.when({}))
    spyOn(controller.ToDo, 'del').and.returnValue(Q.when({}))
  })

  it('should be defined and inherit from BaseController', () => {
    expect(controller).not.toBe(undefined)
    expect(controller.Boom).not.toBe(undefined)
  })

  it('should expose index()', () => {
    controller.index()
    expect(controller.ToDo.findAll).toHaveBeenCalled()
  })

  it('should expose view()', () => {
    let id = 1
      , request = { params: { id: id }}

    controller.view(request)
    expect(controller.ToDo.findById).toHaveBeenCalledWith(id)
  })

  it('should expose create()', () => {
    let payload = { name: 'New ToDo' }
      , request = { payload: payload }

    controller.create(request)
    expect(controller.ToDo.save).toHaveBeenCalledWith(payload)
  })

  it('should expose update()', () => {
    let id = 1
      , payload = { name: 'Updated ToDo' }
      , request = {
          params: { id: id },
          payload: payload
        }

    controller.update(request)
    expect(controller.ToDo.update).toHaveBeenCalledWith(id, payload)
  })

  it('should expose remove()', () => {
    let id = 1
      , request = { params: { id: id }}

    controller.remove(request)
    expect(controller.ToDo.del).toHaveBeenCalledWith(id)
  })
})
