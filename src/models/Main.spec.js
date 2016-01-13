import * as Q  from 'q'
import { Main } from './Main'


//
// Tests
//
describe('Model: Main', () => {
  let model

  beforeEach(() => {
    model = new Main()
    spyOn(model.Knex, 'raw').and.returnValue(Q.when({}))
  })

  it('should be defined and inherit from BaseModelRDMS', () => {
    expect(model).not.toBe(undefined)
    expect(model.Knex).not.toBe(undefined)
  })

  it('should expose doHealthcheck()', () => {
    model.doHealthcheck()
    expect(model.Knex.raw).toHaveBeenCalled()
  })
})
