//
// Internal dependencies
//
import { assertRoutes } from '../../tests/helpers'
import * as routes  from './todos.routes'

//
// Tests
//
describe(`Routes: ToDo's`, () => {

  it('should expose GET /todos', () => {
    let path = '/todos'
      , method = 'GET'

    assertRoutes(routes.default, path, method)
  })

  it('should expose GET /todos/{id}', () => {
    let path = '/todos/{id}'
      , method = 'GET'

    assertRoutes(routes.default, path, method, true)
  })

  it('should expose POST /todos', () => {
    let path = '/todos'
      , method = 'POST'

    assertRoutes(routes.default, path, method, false, true)
  })

  it('should expose PUT /todos/{id}', () => {
    let path = '/todos/{id}'
      , method = 'PUT'

    assertRoutes(routes.default, path, method, true, true)
  })

  it('should expose DELETE /todos/{1}', () => {
    let path = '/todos/{id}'
      , method = 'DELETE'

    assertRoutes(routes.default, path, method, true)
  })
})
