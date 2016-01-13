import { BaseRoutes } from './base.routes'


//
// Tests
//
describe(`Routes: Base`, () => {
  let routes
    , endpoint = 'my-endpoint'
    , controller = new class MockedController {
      index() {}
      view() {}
      create() {}
      update() {}
      remove() {}
    }

  beforeEach(() => {
    routes = new BaseRoutes(controller, endpoint)
  })

  it('should be defined', () => {
    expect(routes).not.toBe(undefined)
    expect(routes.joi).not.toBe(undefined)
    expect(routes.endpoint).toBe(endpoint)
    expect(routes.controller).not.toBe(undefined)
  })

  it('should throw on empty controller', () => {
    try {
      new BaseRoutes()
    }
    catch (exc) {
      expect(exc.name).toBe('Error')
      expect(exc.message).toBe('BaseRoute: controller is undefined')
    }
  })

  it('should expose index()', () => {
    let options = routes.index()

    expect(options.method).toBe('GET')
    expect(options.path).toBe(routes.endpoint)
    expect(options.config.handler).not.toBe(undefined)
  })

  it('should expose view()', () => {
    let options = routes.view()

    expect(options.method).toBe('GET')
    expect(options.path).toBe(routes.endpoint + '/{id}')
    expect(options.config.handler).not.toBe(undefined)
    expect(options.config.validate.params.id).not.toBe(undefined)
  })

  it('should expose create()', () => {
    let options = routes.create()

    expect(options.method).toBe('POST')
    expect(options.path).toBe(routes.endpoint)
    expect(options.config.handler).not.toBe(undefined)
    expect(options.config.validate).not.toBe(undefined)
  })

  it('should expose update()', () => {
    let options = routes.update()

    expect(options.method).toBe('PUT')
    expect(options.path).toBe(routes.endpoint + '/{id}')
    expect(options.config.handler).not.toBe(undefined)
    expect(options.config.validate.params.id).not.toBe(undefined)
  })

  it('should expose remove()', () => {
    let options = routes.remove()

    expect(options.method).toBe('DELETE')
    expect(options.path).toBe(routes.endpoint + '/{id}')
    expect(options.config.handler).not.toBe(undefined)
    expect(options.config.validate.params.id).not.toBe(undefined)
  })
})
