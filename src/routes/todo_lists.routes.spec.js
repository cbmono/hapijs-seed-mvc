import { assertRoutes } from '../../tests/helpers';
import * as routes from './todo_lists.routes';

//
// Tests
//
describe('Routes: ToDo Lists', () => {

  it('should expose GET /todo-lists', () => {
    const path = '/todo-lists';
    const method = 'GET';

    assertRoutes(routes.default, path, method);
  });

  it('should expose GET /todo-lists/{id}', () => {
    const path = '/todo-lists/{id}';
    const method = 'GET';

    assertRoutes(routes.default, path, method, true);
  });

  it('should expose GET /todo-lists/{id}/todos', () => {
    const path = '/todo-lists/{id}/todos';
    const method = 'GET';

    assertRoutes(routes.default, path, method, true);
  });

  it('should expose POST /todo-lists', () => {
    const path = '/todo-lists';
    const method = 'POST';

    assertRoutes(routes.default, path, method, false, true);
  });

  it('should expose PUT /todo-lists/{id}', () => {
    const path = '/todo-lists/{id}';
    const method = 'PUT';

    assertRoutes(routes.default, path, method, true, true);
  });

  it('should expose DELETE /todo-lists/{1}', () => {
    const path = '/todo-lists/{id}';
    const method = 'DELETE';

    assertRoutes(routes.default, path, method, true);
  });
});
