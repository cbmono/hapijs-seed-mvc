//
// External dependencies
//
const Q = require('q')

//
// Internal dependencies
//
import { ToDoList } from './ToDoList'

//
// Tests
//
describe('Model: ToDoList', () => {
  let model

  beforeEach(() => {
    model = new ToDoList()

    spyOn(model, 'findById').and.returnValue(Q.when([{}]))
    spyOn(model.ToDo, 'findBy').and.returnValue(Q.when({}))
  })

  it('should be defined and inherit from BaseModelRDMS', () => {
    expect(model).not.toBe(undefined)
    expect(model.Knex).not.toBe(undefined)
  })

  it('should have the correct DB table name', () => {
    expect(model.tableName).toBe('todo_lists')
  })

  it('should import the model ToDo', () => {
    expect(model.ToDo).not.toBe(undefined)
  })

  it('should expose findByIdWithTodos()', (done) => {
    let id = 1

    model.findByIdWithTodos(id).then(() => {
      expect(model.findById).toHaveBeenCalledWith(id)
      expect(model.ToDo.findBy).toHaveBeenCalledWith('todo_list_id', id)
      done()
    })
  })
})
