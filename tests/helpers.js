//
// External dependencies
//
const _ = require('lodash')

//
// Helper methods for tests
//

/**
 * Helper method for routes
 *
 * @param  {object} routes
 * @param  {string} expectedPath
 * @param  {string} expectedMethod
 * @param  {boolean} validateParams [optioal]
 * @param  {boolean} validatePayload [optioal]
 */
export function assertRoutes( routes,
                              expectedPath,
                              expectedMethod,
                              validateParams = false,
                              validatePayload = false) {
  let route = _.findWhere(routes, { path: expectedPath, method: expectedMethod })

  expect(route.path).toBe(expectedPath)
  expect(route.method).toBe(expectedMethod)
  expect(typeof route.config.handler).toBe('function')

  if (validateParams) {
    expect(route.config.validate.params).not.toBe(undefined)
  }

  if (validatePayload) {
    expect(route.config.validate.payload).not.toBe(undefined)
  }
}
