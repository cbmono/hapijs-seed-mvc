import { assertRoutes } from '../../tests/helpers'
import * as routes  from './main.routes'


//
// Tests
//
describe('Routes: Main', () => {

  it('should expose GET /healthcheck', () => {
    let path = '/healthcheck'
      , method = 'GET'

    assertRoutes(routes.default, path, method)
  })

  it('should expose GET /{param*}', () => {
    let path = '/{param*}'
      , method = 'GET'
      , route = _.findWhere(routes.default, { path: path, method: method })

    expect(route.path).toBe(path)
    expect(route.method).toBe(method)
    expect(route.config.handler.directory.path).toBe('./public')
  })
})
