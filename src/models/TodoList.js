//
// Internal dependencies
//
const BaseModelRDMS = require('./BaseModel.RDMS')
const ToDo = require('./ToDo')


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

  /**
   * Find a specific ToDo list and all its ToDo's
   *
   * @param {integer} id
   * @return {promise}
   */
  findAndTodos(id) {
    return this.findById(id)
      .then((response) => ToDo.findBy('todo_list_id', id)
        .then((todos) => {
          response.todos = todos
          return response
        })
      )
  }
}
