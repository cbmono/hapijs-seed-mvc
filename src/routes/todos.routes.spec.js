import { assertRoutes } from '../../tests/helpers';
import * as routes from './todos.routes';

//
// Tests
//
describe('Routes: ToDo\'s', () => {

  it('should expose GET /todos', () => {
    const path = '/todos';
    const method = 'GET';

    assertRoutes(routes.default, path, method);
  });

  it('should expose GET /todos/{id}', () => {
    const path = '/todos/{id}';
    const method = 'GET';

    assertRoutes(routes.default, path, method, true);
  });

  it('should expose POST /todos', () => {
    const path = '/todos';
    const method = 'POST';

    assertRoutes(routes.default, path, method, false, true);
  });

  it('should expose PUT /todos/{id}', () => {
    const path = '/todos/{id}';
    const method = 'PUT';

    assertRoutes(routes.default, path, method, true, true);
  });

  it('should expose DELETE /todos/{1}', () => {
    const path = '/todos/{id}';
    const method = 'DELETE';

    assertRoutes(routes.default, path, method, true);
  });
});
