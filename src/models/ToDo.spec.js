import * as Q  from 'q'
import { ToDo } from './ToDo'


//
// Tests
//
describe('Model: ToDo', () => {
  let model

  beforeEach(() => {
    model = new ToDo()
  })

  it('should be defined and inherit from BaseModelRDMS', () => {
    expect(model).not.toBe(undefined)
    expect(model.Knex).not.toBe(undefined)
  })

  it('should have the correct DB table name', () => {
    expect(model.tableName).toBe('todos')
  })
})
