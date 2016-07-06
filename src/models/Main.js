import { BaseModelRDMS } from './BaseModel.RDMS';

//
// Main
//
export class Main extends BaseModelRDMS {

  /**
   * Constructor
   */
  constructor() {
    super('EMPTY');
  }
  /**
   * Run a system healthcheck
   *
   * @return {promise}
   */
  async doHealthcheck() {
    const { connectionSettings : { database : dbname } } = this.Knex.client;

    const response = {
      ping        : 'pong',
      environment : process.env.NODE_ENV,
      timestamp   : Date.now(),
      database    : {
        dbname,
        healthy : true,
      },
    };


    // Check database
    try {
      await this.Knex.raw('SELECT 1+1 AS result');
      response.uptime = `${process.uptime()} seconds`;
      return Promise.resolve(response);
    }
    catch (e) {
      response.database.healthy = false;
      return Promise.resolve(response);
    }
  }
}
