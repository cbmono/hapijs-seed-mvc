//
// External dependencies
//
const Q = require('q')

//
// Internal dependencies
//
import { MainController } from './main.controller'

//
// Tests
//
describe('Controller: Main', () => {
  let controller

  beforeEach(() => {
    controller = new MainController()
    spyOn(controller.Main, 'doHealthcheck').and.returnValue(Q.when({}))
  })

  it('should be defined', () => {
    expect(controller).not.toBe(undefined)
  })

  it('should expose healthcheck()', () => {
    controller.healthcheck()
    expect(controller.Main.doHealthcheck).toHaveBeenCalled()
  })
})
