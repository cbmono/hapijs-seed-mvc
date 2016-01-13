import { BaseController } from './base.controller'


//
// Tests
//
describe('Controller: Base', () => {
  let controller
    , notFoundMsg = 'Not Found'
    , foo = { reply: (res) => {}}

  beforeEach(() => {
    controller = new BaseController(notFoundMsg)

    spyOn(foo, 'reply')
    spyOn(controller.Boom, 'notFound')
  })

  it('should be defined', () => {
    expect(controller).not.toBe(undefined)
    expect(controller.Boom).not.toBe(undefined)
    expect(controller.notFoundMsg).toBe(notFoundMsg)
  })

  describe('replyOnResponse()', () => {
    it('should accept an array as response', () => {
      let response = [{ msg: 'hello' }]

      controller.replyOnResponse(response, foo.reply)
      expect(foo.reply).toHaveBeenCalledWith(response)
    })

    it('should accept a positive integer as response', () => {
      let response = 1

      controller.replyOnResponse(response, foo.reply)
      expect(foo.reply).toHaveBeenCalledWith(response)
    })

    it('should return Not Found', () => {
      let response = 'invalid response'

      controller.replyOnResponse(response, foo.reply)
      expect(foo.reply).toHaveBeenCalled()
      expect(controller.Boom.notFound).toHaveBeenCalledWith(notFoundMsg)
    })
  })
})
