//
// External dependencies
//
const Q = require('q')

//
// Internal dependencies
//
const BaseModelRDMS = require('./BaseModel.RDMS')


/******************************************
 *
 * Main
 *
 ******************************************/
class Main extends BaseModelRDMS {

  constructor() {
    super('EMPTY')
  }

  /**
   * Run a system healthcheck
   *
   * @return {promise}
   */
  doHealthcheck(mono = 'mono') {
    let that = this
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


//
// Export module
//
module.exports = new Main
