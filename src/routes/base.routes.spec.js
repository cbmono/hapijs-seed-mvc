import { BaseRoutes } from './base.routes';

//
// Tests
//
describe('Routes: Base', () => {
  let routes;
  let ExtendedRoutes;
  const endpoint = 'my-endpoint';
  const controller = new class MockedController {
    /* eslint-disable */
    index() {}
    view() {}
    create() {}
    update() {}
    remove() {}
    /* eslint-enable */
  }();

  beforeEach(() => {
    ExtendedRoutes = class ext extends BaseRoutes {};
    routes = new ExtendedRoutes(controller, endpoint);
  });

  it('should not instantiated directly', () => {
    const createBase = () => new BaseRoutes(controller, endpoint);
    expect(createBase).toThrow(Error('BaseRoutes is an abstract class and cannot be instantiated directly'));
  });

  it('should be defined', () => {
    expect(routes).not.toBe(undefined);
    expect(routes.joi).not.toBe(undefined);
    expect(routes.endpoint).toBe(endpoint);
    expect(routes.controller).not.toBe(undefined);
  });

  it('should throw on empty controller', () => {
    try {
      new ExtendedRoutes();
    }
    catch (exc) {
      expect(exc.name).toBe('Error');
      expect(exc.message).toBe('BaseRoute: controller is undefined');
    }
  });

  it('should throw on empty controller handler', () => {
    try {
      const emptyCtrl = new class TempController {}();

      routes = new ExtendedRoutes(emptyCtrl);
      routes.index();
    }
    catch (exc) {
      expect(exc.name).toBe('Error');
      expect(exc.message).toBe('BaseRoute: controller handler is undefined');
    }
  });

  it('should expose index()', () => {
    const options = routes.index();

    expect(options.method).toBe('GET');
    expect(options.path).toBe(routes.endpoint);
    expect(options.handler).not.toBe(undefined);
  });

  it('should expose view()', () => {
    const options = routes.view();

    expect(options.method).toBe('GET');
    expect(options.path).toBe(`${routes.endpoint}/{id}`);
    expect(options.handler).not.toBe(undefined);
    expect(options.config.validate.params.id).not.toBe(undefined);
  });

  it('should expose create()', () => {
    const options = routes.create();

    expect(options.method).toBe('POST');
    expect(options.path).toBe(routes.endpoint);
    expect(options.handler).not.toBe(undefined);
    expect(options.config.validate).not.toBe(undefined);
  });

  it('should expose update()', () => {
    const options = routes.update();

    expect(options.method).toBe('PUT');
    expect(options.path).toBe(`${routes.endpoint}/{id}`);
    expect(options.handler).not.toBe(undefined);
    expect(options.config.validate.params.id).not.toBe(undefined);
  });

  it('should expose remove()', () => {
    const options = routes.remove();

    expect(options.method).toBe('DELETE');
    expect(options.path).toBe(`${routes.endpoint}/{id}`);
    expect(options.handler).not.toBe(undefined);
    expect(options.config.validate.params.id).not.toBe(undefined);
  });
});
