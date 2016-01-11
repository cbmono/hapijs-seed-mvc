//
// External dependencies
//
const Q = require('q')

//
// Internal dependencies
//
import { BaseModelRDMS } from './BaseModel.RDMS'


/******************************************
 *
 * Main
 *
 ******************************************/
export class Main extends BaseModelRDMS {

  /**
   * Constructor
   */
  constructor() {
    super('EMPTY')
  }

  /**
   * Run a system healthcheck
   *
   * @return {promise}
   */
  doHealthcheck() {
    let deferred = Q.defer()
    let response = {
      ping: 'pong',
      environment: process.env.NODE_ENV,
      timestamp: Date.now()
    }

    // Check database
    this.Knex.raw('SELECT 1+1 AS result')
      .then(() => {
        // There is a valid connection in the pool
        response.uptime = process.uptime() + ' seconds'
        response.database = {
          healthy: true,
          dbname: this.Knex.client.connectionSettings.database
        }

        deferred.resolve(response)
      })
      .catch(() => {
        response.database = {
          healthy: false,
          dbname: this.Knex.client.connectionSettings.database
        }

        deferred.resolve(response)
      })

    return deferred.promise
  }
}
