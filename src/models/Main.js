'use strict'

//
// External dependencies
//
const Q = require('q')

//
// Internal dependencies
//
const BaseModelRMDB = require('./BaseModel.RMDB')


/******************************************
 *
 * Main
 *
 ******************************************/
class Main extends BaseModelRMDB {

  constructor() {
    let tableName = 'EMPTY'
    super(tableName)
  }

  /**
   * Run a system healthcheck
   *
   * @return {promise}
   */
  doHealthcheck(mono = 'mono') {
    let deferred = Q.defer()
    let response = {
      ping: 'pong',
      environment: process.env.NODE_ENV,
      timestamp: Date.now()
    }

    // Check database
    this.Knex.raw('select 1+1 as result')
      .then(() => { // There is a valid connection in the pool
        response.uptime = process.uptime() + ' seconds'
        response.database = {
          healthy: true,
          dbname: this.Knex.client.databaseName
        }

        deferred.resolve(response)
      })
      .catch(() => {
        response.database = {
          healthy: false,
          dbname: this.Knex.client.databaseName
        }

        deferred.resolve(response)
      })

    return deferred.promise
  }
}


//
// Export module
//
module.exports = new Main
