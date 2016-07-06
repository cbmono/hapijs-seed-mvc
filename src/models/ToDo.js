import { BaseModelRDMS } from './BaseModel.RDMS';


//
// ToDo's
//
export class ToDo extends BaseModelRDMS {

  /**
   * Constructor
   */
  constructor() {
    const tableName = 'todos';
    super(tableName);
  }
}
