//
// External dependencies
//
const Q = require('q')

//
// Internal dependencies
//
import { Main } from './Main'

//
// Tests
//
describe('Model: Main', () => {
  let model

  beforeEach(() => {
    model = new Main()
  })

  it('should be defined', () => {
    expect(model).not.toBe(undefined)
  })

  it('should be extended by BaseModelRDMS', () => {
    expect(model.log).not.toBe(undefined)
    expect(model.Knex).not.toBe(undefined)
    expect(model.tableName).not.toBe(undefined)
    expect(model.setTimestamps).not.toBe(undefined)
  })

  it('should expose doHealthcheck()', () => {
    spyOn(model.Knex, 'raw').and.returnValue(Q.when({}))
    model.doHealthcheck()

    expect(model.Knex.raw).toHaveBeenCalled()
  })
})
