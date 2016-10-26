import { Main } from '../models/Main';

//
// Controller for 'main'
//
export class MainController {

  /**
   * Constructor
   */
  constructor() {
    this.Main = new Main();
  }

  /**
   * Display the status of the application
   */
  healthcheck(request, reply) {
    this.Main.doHealthcheck()
      .then(reply)
      .catch(reply);
  }
}
