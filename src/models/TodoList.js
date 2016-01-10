//
// Internal dependencies
//
const BaseModelRDMS = require('./BaseModel.RDMS')


/******************************************
 *
 * ToDo lists
 *
 ******************************************/
module.exports = new class ToDoList extends BaseModelRDMS {

  /**
   * Constructor
   */
  constructor() {
    let tableName = 'todo_lists'
    super(tableName)
  }
}
