import _ from 'lodash';
import { default as log } from '../libs/logger';


//
// Helper methods/plugins for tests
//

// Global dependencies (available across all tests)
GLOBAL._ = _;
GLOBAL.log = log;

/**
 * Helper assert method for routes
 *
 * @param {object} routes
 * @param {string} expectedPath
 * @param {string} expectedMethod
 * @param {boolean} validateParams [optioal]
 * @param {boolean} validatePayload [optioal]
 */
export function assertRoutes(routes,
                             expectedPath,
                             expectedMethod,
                             validateParams = false,
                             validatePayload = false) {

  const route = _.find(routes, { path : expectedPath, method : expectedMethod });

  expect(route.path).toBe(expectedPath);
  expect(route.method).toBe(expectedMethod);
  expect(typeof route.handler).toBe('function');

  if (validateParams) {
    expect(route.config.validate.params).not.toBe(undefined);
  }

  if (validatePayload) {
    expect(route.config.validate.payload).not.toBe(undefined);
  }
}
