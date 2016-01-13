import * as Q  from 'q'
import { ToDoListsController } from './todo_lists.controller'


//
// Tests
//
describe('Controller: ToDo Lists', () => {
  let controller

  beforeEach(() => {
    controller = new ToDoListsController()

    spyOn(controller.ToDoList, 'findAll').and.returnValue(Q.when({}))
    spyOn(controller.ToDoList, 'findById').and.returnValue(Q.when({}))
    spyOn(controller.ToDoList, 'findByIdWithTodos').and.returnValue(Q.when({}))
    spyOn(controller.ToDoList, 'save').and.returnValue(Q.when({}))
    spyOn(controller.ToDoList, 'update').and.returnValue(Q.when({}))
    spyOn(controller.ToDoList, 'del').and.returnValue(Q.when({}))
  })

  it('should be defined and inherit from BaseController', () => {
    expect(controller).not.toBe(undefined)
    expect(controller.Boom).not.toBe(undefined)
  })

  it('should expose index()', () => {
    controller.index()
    expect(controller.ToDoList.findAll).toHaveBeenCalled()
  })

  it('should expose view()', () => {
    let id = 1
      , request = { params: { id: id }}

    controller.view(request)
    expect(controller.ToDoList.findById).toHaveBeenCalledWith(id)
  })

  it('should expose viewAll()', () => {
    let id = 1
      , request = { params: { id: id }}

    controller.viewAll(request)
    expect(controller.ToDoList.findByIdWithTodos).toHaveBeenCalledWith(id)
  })

  it('should expose create()', () => {
    let payload = { name: 'New ToDo List' }
      , request = { payload: payload }

    controller.create(request)
    expect(controller.ToDoList.save).toHaveBeenCalledWith(payload)
  })

  it('should expose update()', () => {
    let id = 1
      , payload = { name: 'Updated ToDo List' }
      , request = {
          params: { id: id },
          payload: payload
        }

    controller.update(request)
    expect(controller.ToDoList.update).toHaveBeenCalledWith(id, payload)
  })

  it('should expose remove()', () => {
    let id = 1
      , request = { params: { id: id }}

    controller.remove(request)
    expect(controller.ToDoList.del).toHaveBeenCalledWith(id)
  })
})
