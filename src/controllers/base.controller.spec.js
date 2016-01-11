//
// Internal dependencies
//
import { BaseController } from './base.controller'

//
// Tests
//
describe('Controller: Base', () => {
  let controller

  beforeEach(() => {
    controller = new BaseController()
  })

  it('should be defined', () => {
    expect(controller).not.toBe(undefined)
    expect(controller.Boom).not.toBe(undefined)
  })
})
