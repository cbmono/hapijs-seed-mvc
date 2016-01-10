//
// Internal dependencies
//
const BaseModelRDMS = require('./BaseModel.RDMS')


/******************************************
 *
 * ToDo lists
 *
 ******************************************/
module.exports = new class ToDo extends BaseModelRDMS {

  /**
   * Constructor
   */
  constructor() {
    let tableName = 'todos'
    super(tableName)
  }
}
