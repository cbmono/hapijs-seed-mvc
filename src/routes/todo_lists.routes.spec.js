//
// Internal dependencies
//
import { assertRoutes } from '../../tests/helpers'
import * as routes  from './todo_lists.routes'

//
// Tests
//
describe(`Routes: ToDo Lists`, () => {

  it('should expose GET /todo-lists', () => {
    let path = '/todo-lists'
      , method = 'GET'

    assertRoutes(routes.default, path, method)
  })

  it('should expose GET /todo-lists/{id}', () => {
    let path = '/todo-lists/{id}'
      , method = 'GET'

    assertRoutes(routes.default, path, method, true)
  })

  it('should expose GET /todo-lists/{id}/todos', () => {
    let path = '/todo-lists/{id}/todos'
      , method = 'GET'

    assertRoutes(routes.default, path, method, true)
  })

  it('should expose POST /todo-lists', () => {
    let path = '/todo-lists'
      , method = 'POST'

    assertRoutes(routes.default, path, method, false, true)
  })

  it('should expose PUT /todo-lists/{id}', () => {
    let path = '/todo-lists/{id}'
      , method = 'PUT'

    assertRoutes(routes.default, path, method, true, true)
  })

  it('should expose DELETE /todo-lists/{1}', () => {
    let path = '/todo-lists/{id}'
      , method = 'DELETE'

    assertRoutes(routes.default, path, method, true)
  })
})
