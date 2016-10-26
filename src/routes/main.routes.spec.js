import { assertRoutes } from '../../tests/helpers';
import * as routes from './main.routes';

//
// Tests
//
describe('Routes: Main', () => {

  it('should expose GET /healthcheck', () => {
    const path = '/healthcheck';
    const method = 'GET';

    assertRoutes(routes.default, path, method);
  });

  it('should expose GET /{param*}', () => {
    const path = '/{param*}';
    const method = 'GET';
    const route = _.find(routes.default, { path, method });

    expect(route.path).toBe(path);
    expect(route.method).toBe(method);
    expect(route.handler.directory.path).toBe('./public');
  });
});
